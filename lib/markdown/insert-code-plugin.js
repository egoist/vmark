module.exports = md => {
  const RE = /\s*{([^}]+)}/

  const parseOptions = str => {
    if (!RE.test(str)) {
      return {}
    }
    const [, options] = RE.exec(str)
    const fn = new Function(`return {${options}}`) // eslint-disable-line no-new-func
    return fn()
  }

  const { fence } = md.renderer.rules
  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    const info = parseOptions(token.info)
    if (!info.insert) {
      return self.renderToken(token)
    }
    const res = fence(tokens, idx, options, env, self)
    if (info.insert === 'above') {
      return `${token.content}${res}`
    }
    if (info.insert === 'below') {
      return `${res}${token.content}`
    }
    return res
  }
}
