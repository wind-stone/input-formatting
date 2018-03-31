# 代码示例

## options.initialValue 存在

```html
<input type="tel" class="input-initial-value">
```

```js
let inputInitialValue = new InputFormatting({
  input: '.input-initial-value',
  format: '***-****-****',
  delimiters: ['-'],
  initialValue: '15123456789'
})
```


## dom 的 value 存在

```html
<input type="tel" value="15123456789" class="input-dom-value">
```

```js
let inputDomValue = new InputFormatting({
  input: '.input-dom-value',
  format: '***-****-****',
  delimiters: ['-']
})
```