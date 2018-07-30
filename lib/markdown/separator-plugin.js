module.exports = md => {
  md.renderer.rules.hr = () => {
    return '=== slide ==='
  }
}
