import { UIValuePair } from '../src'

describe('schema helpers', () => {
  it('placeholder test', () => {
    const users = [{ id: 2, name: 'Jose', picture: 'cool_url', email: 'duh' }]
    const uiValues: UIValuePair[] = users.map(user => ({
      value: { foo: user.id },
      label: user.name,
      img: user.picture,
      meta: user.email
    }))
    expect(uiValues.length).toBe(1)
  })
})
