const fs = require('fs')
const path = require('path')
const semanticRelease = require('semantic-release')
const { WritableStreamBuffer } = require('stream-buffers')

const pkgPaths = [
  path.resolve(path.join(__dirname, '../package.json')),
  path.resolve(path.join(__dirname, '../libraries/typescript/package.json'))
]
const pyPaths = [path.resolve(path.join(__dirname, '../libraries/python/setup.py'))]

const pkgs = [
  {
    name: pkgPaths[0],
    data: require(pkgPaths[0])
  },
  {
    name: path.resolve(pkgPaths[1]),
    data: require(pkgPaths[1])
  }
]
const stdoutBuffer = new WritableStreamBuffer()
const stderrBuffer = new WritableStreamBuffer()

function getBuildVersion() {
  return semanticRelease(
    {
      // Core options
      dryRun: true,
      branch: 'master',
      repositoryUrl: 'https://github.com/justindujardin/forms.git'
    },
    {
      cwd: './',
      stdout: stdoutBuffer,
      stderr: stderrBuffer
    }
  ).then((result: any) => {
    if (result) {
      const { nextRelease } = result
      return nextRelease.version
    }
    return pkgs[0].data.version
  })
}

getBuildVersion()
  .then((version: any) => {
    pkgs.forEach((pkg: any) => {
      pkg.data.version = version
      console.log(`Setting version to ${version} in ${pkg.name}`)
      fs.writeFileSync(pkg.name, JSON.stringify(pkg.data, null, 2), 'utf8')
    })

    console.log('--- UPDATING build version in python modules to : ' + version)
    pyPaths.forEach((filePath: string) => {
      if (!fs.existsSync(filePath)) {
        console.error('setup.py for python is missing!')
        process.exit(1)
      }
      const contents = fs.readFileSync(filePath, 'utf8')
      const regexp = new RegExp(/(VERSION\s?=\s?["\'])\d+\.\d+(?:\.\d+)?(["\'])/)
      const match = contents.match(regexp)
      if (!match || match.length !== 3) {
        console.error('VERSION="1.x.x" string in setup.py was not found.')
      }
      const replaceVersion = `${match[1]}${version}${match[2]}`
      const newContents = contents.replace(regexp, replaceVersion)
      fs.writeFileSync(filePath, newContents, 'utf8')
    })
  })
  .catch((e: any) => {
    console.log(e)
    console.log('--- SKIPPING update of build versions because no release is required')
  })
