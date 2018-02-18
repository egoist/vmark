const vmark = require('../')

test('main', () => {
  const markdown = `
---
components:
  counter: ./counter.vue
---
# hello

<counter :start="0" />
`.trim()

  expect(vmark(markdown)).toMatchSnapshot()
})
