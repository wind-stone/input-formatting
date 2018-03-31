# 代码示例

```html
<input type="tel" class="input-before-format">
```

```js
let inputBeforeFormat = new InputFormatting({
  input: '.input-before-format',
  format: '***-****-****',
  delimiters: ['-'],
  beforeFormat(value) {
    if (value[0] === '0') {
      return '1234'
    }
  }
})
```
