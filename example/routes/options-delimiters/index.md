# 代码示例

## delimiters 数组仅有单个元素

```html
<input type="tel" class="input-delimiters-single">
```

```js
let inputDelimitersSingle = new InputFormatting({
  input: '.input-delimiters-single',
  format: '342425-1990-1004-055X',
  delimiters: ['-']
})
```


## delimiters 数组有多个元素

```html
<input type="tel" class="input-delimiters-multi">
```

```js
let inputDelimitersMulti = new InputFormatting({
  input: '.input-delimiters-multi',
  format: '342425-1990/10/04-055X',
  delimiters: ['-', '/']
})
```