const Markdown = require('markdown-it')

module.exports = options => {
  const md = new Markdown(Object.assign({}, options, {
    html: true
  }))

  md.block.ruler.at('html_block', require('./html_block'))
  md.inline.ruler.at('html_inline', require('./html_inline'))

  md.use(require('./extract-plugin'))
  md.use(require('./separator-plugin'))

  return md
}
