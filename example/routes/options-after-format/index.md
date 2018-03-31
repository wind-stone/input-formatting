# 代码示例

```html
<input type="tel" class="input-after-format">
```

```js
let optionsBeforeFormat = new InputFormatting({
  input: '.input-after-format',
  format: '***-****-****',
  delimiters: ['-'],
  afterFormat(value) {
    console.log(`格式化之后的值：${value}`)
  }
})
```
