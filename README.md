# Postcss-relaxed-unit 🍮

[postcss]: https://github.com/postcss/postcss
[ci-img]: https://travis-ci.org/youncccat/postcss-relaxed-unit.svg
[ci]: https://travis-ci.org/youncccat/postcss-relaxed-unit

English doc | [中文文档](https://github.com/youncccat/postcss-relaxed-unit/blob/master/doc/readme-zh.md)

Postcss-relaxed-unit is a postcss plugin for unit tranformation and make write css easier with custom unit.

You can define a rule to determine the mapping relationship between custom unit and target unit, and you can use some operators to calculate the target value (like `add`, `sub`, `mul`, `div`, `unit`), so you can write style relaxed without care about calculate unit.

## Motivation

Sometimes, we need to care about calculating the style values, for example, `px` to `rem`， `rem` to `vw` , `px` to whatever that mobile side need and we don't need many plugins. so, `postcss-relaxed-unit` can help you forget that, you just need define a rule that describes the custom unit to target unit mapping! that's all! :tada:

## Precision overflow 👌

You don't have to care about precision overflow, because `postcss-relaxed-unit` wraps `bignumber.js`.

## Install

`postcss-relaxed-unit` is publish to `npm`，so you can install it using `npm` or `yarn`

```
npm i postcss-relaxed-unit -D
```

or

```
yarn add postcss-relaxed-unit -D
```

because `postcss-relaxed-unit` is depends on [PostCSS], you need to install postcss.

## Usage

You only need to define rule to get start~

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

### Multiple rules

You can define more rules :)

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

In `Nuxt.js`, you need to define the config in `nuxt.config.js`

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

## Options

- `rules {[custom unit name]: 'operators'}` custom unit to target unit mapping container

- `add Operator` target value plus `+`

- `sub Operator` target value subtraction `-`

- `mul Operator` target value multiplication `*`

- `div Operator` target value divition `/`

- `unit Operator` unit of output

custom unit will output does not change missing `unit` Operator, `e.g.`

```json
{
  "postcss-relaxed-unit": {
    "rules": { "rx": "add(10).sub(2)" }
  }
}
```

**origin style**

```css
.hello-relaxed-unit {
  width: 10rx;
}
```

**output style**

```css
.hello-relaxed-unit {
  width: 8rx;
}
```

The signature of operator function like

```typescript
type OperatorFunction = (arg: number | string) => string;
```

so, if you call the operator function like `add(aas)` , it will compile passing, the `aas` wiil be convert to `0`.

```javascript
{"rx": "add(aas).unit(px)"} => {"rx": "add(0).unit(px)"}
```

## Example

run `yarn example` or `npm run example` if you want to see the results of `postcss-relaxed-unit` working.⚙️

## LICENSE

MIT.
