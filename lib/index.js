const getMarkdown = require('./markdown')

module.exports = (input, options = {}) => {
  const env = {}
  const template = getMarkdown(options.markdown).render(input, env)

  const component = `<template>
  <div class="vmark">${template}</div>
</template>

${env.hoistedTags ? env.hoistedTags.join('\n\n') : ''}`

  return component
}
