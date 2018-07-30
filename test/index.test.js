const vmark = require('../')

function snapshot(title, text) {
  test(title, () => {
    expect(vmark(text.trim())).toMatchSnapshot()
  })
}

snapshot('basic', `
# hello

<counter :start="0" />
`)

snapshot('with tags', `
<div class="foo">{{ foo }}</div>

<style scoped>
.foo {
  color: red;
}
</style>
`)
