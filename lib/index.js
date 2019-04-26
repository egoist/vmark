const getMarkdown = require('./markdown')

const defaultWrapHTML = html => `<div class="vmark">${html}</div>`

module.exports = (input, options = {}) => {
  const env = {}
  const html = getMarkdown(options.markdown, options.extend).render(input, env)
  const wrapHTML = options.wrapHTML || defaultWrapHTML

  const component = `<template>
  ${wrapHTML(html)}
</template>

${env.hoistedTags ? env.hoistedTags.join('\n\n') : ''}`

  return component
}
