const compiler = require('vue-template-compiler')
const stripWith = require('vue-template-es2015-compiler')
const marked = require('marked3')
const prettier = require('prettier')
const frontMatter = require('./frontMatter')
const toFunction = require('./toFunction')

const defaultWrap = child => `<div class="vmark">${child}</div>`

module.exports = function (
  input,
  { wrap = defaultWrap, prettier: usePrettier = true } = {}
) {
  if (typeof input !== 'string') {
    throw new TypeError('Expected input to be string')
  }

  const { body, attributes } = frontMatter(input)
  const compiled = compiler.compile(wrap(marked(body)))

  if (compiled.errors && compiled.errors.length > 0) {
    throw new Error(
      `\n  Error compiling markdown:\n${input}\n` +
        compiled.errors.map(e => `  - ${e}`).join('\n') +
        '\n'
    )
  }

  const renderFn = stripWith(toFunction(compiled.render, 'render'))

  let components = ''
  let componentImports = ''
  let staticRenderFns = ''
  let data = ''
  let styleImports = ''
  if (attributes.components) {
    components = `,\n  components:{${Object.keys(attributes.components)
      .map(name => `\n${name}:${name}`)
      .join('\n,')}}`
    componentImports = Object.keys(attributes.components)
      .map(
        name =>
          `import ${name} from ${JSON.stringify(attributes.components[name])}`
      )
      .join('\n') + '\n'
  }
  if (compiled.staticRenderFns.length > 0) {
    staticRenderFns = `,\n  staticRenderFns:${compiled.staticRenderFns
      .map(fn => toFunction(fn))
      .join(',')}`
  }
  if (attributes.data) {
    data = `\n  data: function data() { return ${JSON.stringify(attributes.data, null, 2)} },`
  }
  if (attributes.styles) {
    styleImports = attributes.styles
      .map(style => `import '${style}'`)
      .join('\n') + '\n'
  }

  let component = `${styleImports}${componentImports}
  export default {${data}
    render: ${renderFn}${staticRenderFns}${components}
  }
      `.trim()

  if (usePrettier) {
    component = prettier.format(component, {
      semi: false,
      singleQuote: true
    })
  }

  return {
    component,
    attributes
  }
}
