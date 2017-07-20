# input-formatting

移动端格式化输入，如将手机号格式化为"185-6666-8888"，可将光标移动到任何地方进行删除、输入操作。


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

[https://github.com/wind-stone/input-formatting/blob/master/dist/input-formatting.js](https://github.com/wind-stone/input-formatting/blob/master/dist/input-formatting.js)

```html
<script src="/path/to/input-formatting.js"></script>
```


## 使用

```html
<input type="tel" id="phone" placeholder="phone">
```

```js
const phone = document.querySelector('#phone')
const phoneInput = new InputFormatting(phone, {
  formatString: '***-****-****',
  separatorReg: /-/g,  // 注意，此处一定要加全局匹配修饰符 g
  beforeFormat: function (originValue) {
    console.log('inputValue: ', originValue)
    // 示例：输入的第一个字符不能为 0
    if (originValue === '0') {
      // 这里的 this 是指向 InputFormatting 的实例
      this.input.value = ''

      // 返回 false，将停止继续格式化输入
      return false
    }
  }
})
```

### 参数说明

```js
new InputFormatting(dom, options)
```

- dom: {HTMLInputElement} 必需，input 输入框 dom 节点
- options: {Object} 参数对象，必需，key 如下表格所示

参数 | 必需 | 类型 | 说明
---|---|---|---
formatString | 是 | String | 最终要格式化成的形式，* 代表一个正常的输入字符，其他字符为分隔符，如手机号的格式为：\*\*\*-\*\*\*\*-\*\*\*\*
separatorReg | 是 | RegExp | 匹配分隔符的正则表达式，比如 /-/g 匹配上述手机号里的 '-'，需要注意的是，一定要添加全局匹配修饰符 g，原因是这个正则对象将用于两处：1、识别单个字符是否是分隔符；2、匹配整个输入中的所有分隔符并去除分隔符
beforeFormat | 否 | Function | 钩子函数，在进行输入格式化之前调用。钩子函数接收一个参数 originValue，该参数是去除分隔符后的原始输入。钩子函数的返回值决定是否继续进行格式化。如果返回 false，停止格式化操作；否则，继续格式化输入。beforeFormat 钩子里的 this 对象指向创建出来的 InputFormatting 的实例对象


## 属性

### input
new InputFormatting() 时传入的 HTMLInputElement 对象

## 方法

#### removeInputHandler()

移除事件监听函数，不再对输入进行格式化


#### resetInputHandler(options)

```js
phoneInput.resetInputHandler({
  formatString: '***-****-****',
  separatorReg: /-/g
})
```
重新设置要格式化成的字符串
