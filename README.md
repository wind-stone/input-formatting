# input-formatting

移动端格式化输入，如将手机号格式化为"185-6666-8888"。最为关键的是，可将光标移动到任何位置进行删除、输入操作，用户体验好。

## 演示

![演示 gif](https://github.com/wind-stone/input-formatting/blob/master/example/img/input-formatting.gif?raw=true)

## 安装

### NPM

```shell
npm install input-formatting -S
```

```js
// ES 2015
import InputFormatting from 'input-formatting'

// 或者
var InputFormatting = require('input-formatting')
```

### 直接下载

[https://unpkg.com/input-formatting@1.1.0/dist/input-formatting.js](https://unpkg.com/input-formatting@1.1.0/dist/input-formatting.js)

```html
<script src="/path/to/input-formatting.js"></script>
```


## 使用

```html
<input type="tel" id="phone" placeholder="phone">
```

```js
const phone = document.querySelector('#phone')
const phoneInput = new InputFormatting({
  input: phone,
  format: '***-****-****',
  delimiters: ['-'],
  beforeFormat: function (originValue) {
    if (originValue[0] === '0') {
      return '1234'
    }
  }
  afterFormat: function (value) {
    console.log('格式化之后的值为：', value)
  }
})
```

### 参数说明

具体配置详情，请参考[使用说明](https://wind-stone.github.io/input-formatting)

```js
new InputFormatting(options)
```

- options: {Object} 参数对象，必需，key 如下表格所示

参数 | 必需 | 类型 | 说明
--- | --- | --- | ---
`input` | 是 | `String`/`HTMLInputElement` | input 输入框的选择器/dom节点
`format` | 是 | `String` | 最终要格式化成的形式，由分隔符和正常字符组成，如手机号的格式为：`***-****-****`（这里`-`代表分隔符，`*`代表正常输入的字符）
`delimiters` | 是 | `Array` | 分隔符数组，如上述的手机号，这里的值为`['-']`
`initialValue` | 否 | `String` | 初始时要格式化的值，如果该值为空，会使用输入框 dom 的 value 属性
`beforeFormat` | 否 | `Function` | 格式化之前的钩子函数，在进行输入格式化之前调用。该函数接收一个参数 `originValue`，该参数是去除分隔符后的字符串。钩子函数如果有返回值，返回值将代替用户手动输入的值作为最新的输入值进行格式化（注意，如果是这种情况，输入光标会移到最后），`beforeFormat`钩子里的`this`对象指向创建出来的`InputFormatting`的实例对象
`afterFormat` | 否 | `Function` | 格式化之后的钩子函数，在格式化之后调用。该函数接收一个参数`value`，该参数是格式化之后包含分隔符的字符串。


### 实例属性

#### `$input`

`new InputFormatting(options)`时传入的`HTMLInputElement`对象


### 实例方法

#### `$stop()`

停止对输入进行格式化


#### `$reset(options)`

```js
phoneInput.$reset({
  input: phoneInput.$input
  format: '***~****~****',
  delimiters: ['~']
})
```
重新设置`options`


### 静态方法

#### `InputFormatting.format`

不考虑光标的情况，给定输入，返回格式化后的值

```js
let value = InputFormatting.format({
  initialValue: '12345678901'
  format: '***-****-****',
  delimiters: ['-']
})
```
