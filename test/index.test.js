const vmark = require('../')

function snapshot(title, text) {
  test(title, () => {
    expect(vmark(text.trim())).toMatchSnapshot()
  })
}

snapshot('basic', `
---
components:
  counter: ./counter.vue
---
# hello

<counter :start="0" />
`)

snapshot('data', `
---
data:
  foo: 1
---
{{ foo }}
`)

snapshot('styles', `
---
styles:
  - ./foo.css
---
`)

snapshot('staticRenderFns', `
<div>hi</div>
`)
