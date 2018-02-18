
# vmark

[![NPM version](https://img.shields.io/npm/v/vmark.svg?style=flat)](https://npmjs.com/package/vmark) [![NPM downloads](https://img.shields.io/npm/dm/vmark.svg?style=flat)](https://npmjs.com/package/vmark) [![CircleCI](https://circleci.com/gh/egoist/vmark/tree/master.svg?style=shield)](https://circleci.com/gh/egoist/vmark/tree/master)  [![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=flat)](https://github.com/egoist/donate) [![chat](https://img.shields.io/badge/chat-on%20discord-7289DA.svg?style=flat)](https://chat.egoist.moe)

## Install

```bash
yarn add vmark
```

## Usage

In:

```markdown
---
component:
  counter: ./components/counter.vue
---
# Show off some counter

<counter :start="0" />
```

Out:

```js
import counter from './components/counter.vue'

export default {
  render: function render() {
    return h('div', {staticClass: 'vmark'}, [
      h('h1', {attrs: {id: '..'}}, ['Show off some counter']),
      h('counter', {attrs: {count: 0}})  
    ])
  },
  components: {
    counter: counter
  }
}
```

Code:

```js
const { component, attributes } = vmark(input)

// component: generated component string
// attributes: parsed front-matter
```

The front-matter part is optional, it's only used to specify required components in vmark.

## API

### vmark(input, [options])

#### input

Type: `string`<br>
Required: `true`

Input markdown string.

#### options

##### options.wrap

Type: `function`<br>
Default: `template => '<div class="vmark">' + template + '</div>'`

Wrap template in a div, since Vue doesn't allow multiple root nodes.

##### options.prettier

Type: `boolean`<br>
Default: `true`

Prettier output.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## Author

**vmark** © [egoist](https://github.com/egoist), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by egoist with help from contributors ([list](https://github.com/egoist/vmark/contributors)).

> [github.com/egoist](https://github.com/egoist) · GitHub [@egoist](https://github.com/egoist) · Twitter [@_egoistlily](https://twitter.com/_egoistlily)
