# Postcss-relaxed-unit 🍮

[postcss]: https://github.com/postcss/postcss
[ci-img]: https://travis-ci.org/youncccat/postcss-relaxed-unit.svg
[ci]: https://travis-ci.org/youncccat/postcss-relaxed-unit

[English doc](https://github.com/youncccat/postcss-relaxed-unit/blob/master/README.md) | 中文文档

Postcss-relaxed-unit 是一个能够转换 css 单位的 postcss 插件，自定义单位下写 css 变的很简单。

你可以定义一个自定义单位和目标单位之间的一个映射关系，还可以使用 `add`, `sub`, `mul`, `div`, `unit` 这样的运算符来计算目标单位，你可以不用去关心计算单位的事情，这一切都让写样式变的非常简单。

## 动机

有些时候，我们需要去关心计算样式的值，就像 `px` 到 `rem` 的转换，`rem` 到 `vm` 的转换，在移动端，我们经常会去计算 `px` 到 xxx 的转换（比如 UI 的设计稿是 px，但是你需要自己计算成 rem），`postcss-relaxed-unit` 可以帮助你更容易的计算，你只需要定义一个描述自定义单位到目标单位的映射规则，这就是你需要做的全部的事情了，其他都由 `Postcss-relaxed-unit` 帮你做了:tada:。

## 精度溢出 👌

你不用关心精度溢出的问题，因为 `postcss-relaxed-unit` 封装了 `bignumber.js`。

## 安装

`postcss-relaxed-unit` 发布在 `npm` 上，所以你可以使用 `yarn` 或者 `npm` 来安装它

```
npm i postcss-relaxed-unit -D
```

或者

```
yarn add postcss-relaxed-unit -D
```

because `postcss-relaxed-unit` is depends on [PostCSS], you need to install postcss.

因为 `postcss-relaxed-unit` 依赖于[PostCSS], 你必须要安装 postcss

## 使用方法

你只需要定义一个规则就可以开始啦！～

**postcss.config.js**

```javascript
const RelaxedUnit = require("postcss-relaxed-unit");

module.exports = {
  plugins: [
    RelaxedUnit({
      rules: { rx: "add(1).sub(2).mul(3).div(9).unit(rem)" }
    })
  ]
};
```

### 多个规则

你可以定义更多的规则到你的应用

```javascript
const RelaxedUnit = require("postcss-relaxed-unit");

module.exports = {
  plugins: [
    RelaxedUnit({
      rules: {
        rx: "add(1).sub(2).mul(3).div(9).unit(rem)",
        ex: "div(100).unit(rem)"
      }
    })
  ]
};
```

### Nuxt

如果你用 `Nuxt.js` ，你需要在 `nuxt.config.js` 里添加一些配置

**nuxt.config.js**

```js
module.exports = {
 	build: {
    extractCSS: true,
    postcss: {
      plugins: {
        'postcss-relaxed-unit': {
          rules: { rx: 'div(100).unit(rem)' },
        },
    },
  },
}
```

## 配置参数

- `rules {[custom unit name]: 'operators'}` 规则的容器，所有的规则都写在这里

- `add Operator` 目标值的加运算

- `sub Operator` 目标值的减运算`

- `mul Operator` 目标值的乘运算`

- `div Operator` 目标值的除以运算`

- `unit Operator` 输出的最终单位

如果没有 `unit` 操作函数，那么单位将按原单位输出，例如：

```json
{
  "postcss-relaxed-unit": {
    "rules": { "rx": "add(10).sub(2)" }
  }
}
```

**原来的样式**

```css
.hello-relaxed-unit {
  width: 10rx;
}
```

**现在的样式**

```css
.hello-relaxed-unit {
  width: 18rx;
}
```

操作参数的签名就像这样：

```typescript
type OperatorFunction = (arg: number | string) => string;
```

so, if you call the operator function like `add(aas)` , it will compile passing, the `aas` wiil be convert to `0`.

如果你这样调用 add 函数 `add(aas)`, 它会编译通过，这个 `aas` 会转化为 0

```javascript
{"rx": "add(aas).unit(px)"} => {"rx": "add(0).unit(px)"}
```

## 示例

如果你想看 `postcss-relaxed-unit` 的运行结果，运行 `yarn example` 或者 `npm run example`⚙️

## LICENSE

MIT.
