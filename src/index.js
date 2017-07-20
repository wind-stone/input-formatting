/**
  * 格式化输入
  * @param {HTMLInputElement} input 输入框dom节点
  * @param {Object} options
  *           {String} formatString  最终产生的格式，形如：
  *                                  '*** **** ****' （手机号，空格分隔）
  *                                  '***-****-****' （手机号，- 连线分隔）
  *                                  '***.***.***-**'（巴西 CPF）
  *           {RegExp} separatorReg  匹配分隔符的正则表达式，形如：
  *                                        /\s+/g    （手机号，空格分隔）
  *                                        /-/g      （手机号，- 连线分隔）
  *                                        /[.-]/g   （巴西 CPF）
  *           {Function} hook        格式化输入之前的钩子函数，接收 输入值（去除了分隔符）为参数，钩子函数返回
  *                                  true 则继续进行格式化，返回 false 则终止格式化
  */
export default class InputFormatting {
  constructor(input, options) {
    this.input = input
    this.options = options
    this.addInputHandler()
  }

  addInputHandler() {
    const options = this.options
    const input = this.input

    const formatString = options.formatString   // 格式化字符串
    const separatorReg = options.separatorReg   // 清除分隔符的正则
    const hook = options.hook                   // 钩子函数

    const separatorIndexArray = []              // 存放格式化字符串里分隔符的下标
    const formatArray = formatString.split('')  // 将格式化字符串分割成格式化数组
    let lastInputLength = 0                     // 上次输入的长度，包含分隔符
    let isBadAndroid                            // 有兼容性的 Android 机器

    input.maxLength = formatString.length       // 设置输入框的最大长度

    formatArray.forEach(function (item, index) {
      if (separatorReg.test(item)) {
        separatorIndexArray.push({
          index: index,
          value: item
        })
      }
    })

    this.inputHandler = () => {
      const inputLength = input.value.length
      const isDeleted = lastInputLength > inputLength                     // 是否是删除文字
      const valueArray = input.value.replace(separatorReg, '').split('')  // 去除后的数字数组
      let selectionStart = input.selectionStart                           // 输入后的光标位置

      // 判断是否是有兼容性问题的 Android
      if (isBadAndroid === undefined) {
        isBadAndroid = inputLength !== selectionStart
      }

      // 处理 hook 函数
      if (hook && typeof hook === 'function') {
        const originValue = valueArray.join('')
        const result = hook.call(this, originValue)

        // hook 函数返回 false，直接返回
        if (result === false) {
          return
        }
      }

      separatorIndexArray.forEach(function (separatorObject, index) {
        if (inputLength <= separatorObject.index) {
          return
        }
        // 处理光标位置
        if (isDeleted) {
          // 如果是删除字符，且删除的是分隔符，则将分隔符前的数字一并删除，光标位置前移一位
          if (selectionStart === separatorObject.index) {
            valueArray.splice(separatorObject.index - 1, 1)
            selectionStart--
          }
        } else {
          // 如果是添加数字，且数字添加后要添加分隔符进行分隔，则（添加分隔符后）光标位置后移一位
          let newIndex = separatorObject.index

          // 此处 Android 有兼容性问题，将无问题的 Android 和 iOS 统一处理成有兼容问题的 Android 形式，再统一处理
          if (!isBadAndroid) {
            newIndex++
          }
          if (selectionStart === newIndex) {
            selectionStart++
          }
        }

        // 添加 分隔符
        if (separatorObject.index < valueArray.length) {
          valueArray.splice(separatorObject.index, 0, separatorObject.value)
        }
      })

      input.value = valueArray.join('')
      lastInputLength = valueArray.length

      // 有兼容性的Android && 增加字符
      if (isBadAndroid && !isDeleted) {
        selectionStart++
      }

      // 异步处理，解决 Android 兼容问题
      setTimeout(function () {
        input.setSelectionRange(selectionStart, selectionStart)
      }, 0)
    }

    input.addEventListener('input', this.inputHandler, false)
  }

  removeInputHandler() {
    this.inputHandler && this.input.removeEventListener('input', this.inputHandler)
  }

  resetInputHandler(options) {
    this.options = options
    this.input.value = ''
    this.removeInputHandler()
    this.addInputHandler()
  }
}
