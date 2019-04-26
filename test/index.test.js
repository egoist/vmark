const vmark = require('../')

function snapshot(title, text, options) {
  test(title, () => {
    expect(vmark(text.trim(), options)).toMatchSnapshot()
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

snapshot('wrap html', `
# hello
`, {
  wrapHTML: html => `<foo>${html}</foo>`
})
