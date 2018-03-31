# 代码示例

## 选择符

```html
<input type="tel" class="input-selector">
```

```js
let phoneInputSelector = new InputFormatting({
  input: '.input-selector',
  format: '123-4561-7890',
  delimiters: ['-']
})
```


## DOM

```html
<input type="tel" class="input-dom">
```

```js
const inputDOM = document.querySelector('.input-dom')
let phoneInputDOM = new InputFormatting({
  input: inputDOM,
  format: '123 4561 7890',
  delimiters: [' ']
})
```