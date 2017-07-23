/**
  * 格式化输入
  * @param {HTMLInputElement} input 输入框dom节点
  * @param {Object} options
  *           {String} formatString    最终产生的格式，形如：
  *                                      '*** **** ****' （手机号，空格分隔）
  *                                      '***-****-****' （手机号，- 连线分隔）
  *                                      '***.***.***-**'（巴西 CPF）
  *           {RegExp} separatorReg    匹配分隔符的正则表达式，形如：
  *                                        /\s+/g    （手机号，空格分隔）
  *                                        /-/g      （手机号，- 连线分隔）
  *                                        /[.-]/g   （巴西 CPF）
  *           {Function} beforeFormat  格式化输入之前的钩子函数，接收 输入值（去除了分隔符）为参数，钩子函数返回
  *                                    true 则继续进行格式化，返回 false 则终止格式化
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
    const beforeFormat = options.beforeFormat   // 钩子函数

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
      const isAdd = lastInputLength < inputLength                         // 是否是添加字符
      const valueArray = input.value.replace(separatorReg, '').split('')  // 去除后的数字数组
      let selectionStart = input.selectionStart                           // 输入后的光标位置

      /**
       * 判断是否是有兼容性问题的 Android
       *
       * 问题描述：某些低版本 Android 上，input 事件里获取的 selectionStart 是输入之前的 selectionStart
       */
      if (isBadAndroid === undefined) {
        isBadAndroid = inputLength !== selectionStart
      }

      // 将有兼容性问题的 Android 处理成正常情况
      if (isAdd && isBadAndroid) {
        selectionStart++
      }

      // 处理 beforeFormat 钩子函数
      if (beforeFormat && typeof beforeFormat === 'function') {
        const originValue = valueArray.join('')
        const result = beforeFormat.call(this, originValue)

        // beforeFormat 函数返回 false，直接返回
        if (result === false) {
          return
        }
      }

      separatorIndexArray.forEach((separatorObject) => {
        if (valueArray.length <= separatorObject.index) {
          return
        }

        // 处理光标位置
        if (isAdd) {
          // 添加字符，且在是在分隔符的位置上添加，则光标后移一位（因为要插入分隔符）
          if (selectionStart === separatorObject.index + 1) {
            selectionStart++
          }
        } else {
          // 删除字符，且删除的是分隔符，则将分隔符前的数字一并删除，光标位置前移一位
          if (selectionStart === separatorObject.index) {
            valueArray.splice(separatorObject.index - 1, 1)
            selectionStart--
          }
        }

        // 添加 分隔符
        if (separatorObject.index < valueArray.length) {
          valueArray.splice(separatorObject.index, 0, separatorObject.value)
        }
      })

      input.value = valueArray.join('')
      lastInputLength = valueArray.length

      // 增加字符 && 在中间区域输入(非末尾输入)
      if (isAdd && selectionStart < input.value.length) {
        separatorIndexArray.some((separatorObject) => {
          if (separatorObject.index === selectionStart) {
            selectionStart++
            return true
          }
        })
      }

      if (isBadAndroid) {
        // 异步处理，有兼容性问题的 Android
        setTimeout(function () {
          input.setSelectionRange(selectionStart, selectionStart)
        }, 0)
      } else {
        input.setSelectionRange(selectionStart, selectionStart)
      }
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
