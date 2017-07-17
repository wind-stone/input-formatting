# input-formatting

移动端格式化输入，如将手机号格式化为"185 6666 8888"，可将光标移动到任何地方进行删除、输入操作。

## 立即使用

```html
<input type="tel" id="phone" placeholder="phone">
```

```js
const phone = document.querySelector('#phone')
const phoneInput = new InputFormatting(phone, {
  formatString: '*** **** ****',
  separatorReg: /\s/g
})
```

input-formatting 引入方式
```js
// 本地使用
import InputFormatting from './input-formatting'

// 通过 npm 引入
import InputFormatting from 'input-formatting'
```


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
