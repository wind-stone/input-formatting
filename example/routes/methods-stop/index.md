# 代码示例

```html
<input type="tel" class="input-dom">
```

```js
let inputStop = new InputFormatting({
  input: '.input-stop',
  format: '***-****-****',
  delimiters: ['-']
})

inputStop.$stop()
```