const Markdown = require('saber-markdown') // A fork of markdown-it

module.exports = (options, extend) => {
  const md = new Markdown(Object.assign({}, options, {
    html: true
  }))

  md.use(require('./extract-plugin'))

  if (typeof extend === 'function') {
    extend(md)
  }

  // Load this plugin at the end in case other plugins change `md.rules.fence`
  md.use(require('./insert-code-plugin'))

  return md
}
