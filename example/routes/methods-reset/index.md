# 代码示例

## 选择符

```html
<input type="tel" class="input-reset">
```

```js
let resetInput = new InputFormatting({
  input: '.input-reset',
  format: '***-****-****',
  delimiters: ['-']
})

resetInput.$reset({
  input: '.input-reset',
  format: '***~****~****',
  delimiters: ['~']
})
```
