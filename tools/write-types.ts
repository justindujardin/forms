if (process.argv.length !== 5) {
    throw new Error('requires exactly three args')
}
const { compileFromFile } = require('json-schema-to-typescript')
const fs = require('fs')
try {
    const jsonFile = process.argv[2]
    const typescriptFile = process.argv[3]
    const prettierRC = JSON.parse(fs.readFileSync(process.argv[4], 'utf-8'))
    compileFromFile(jsonFile, { style: prettierRC }).then(function(ts: any) {
        fs.writeFileSync(typescriptFile, ts)
    })
} catch (error) {
    console.error(error)
}
