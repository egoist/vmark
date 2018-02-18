module.exports = function toFunction(code, name = '') {
  return `function ${name}(){${code}}`
}
