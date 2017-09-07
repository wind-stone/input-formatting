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
export { formatter } from './utils'

export default class InputFormatting {
  constructor(input, options) {
    if (input.constructor !== String) {
      this.initData(input, options)
      this.addInputHandler()
      if (input.value) {
        this.formatOnly()
      }
    }
  }

  /**
   * 初始化数据
   */
  initData(input, options) {
    this.options = options
    this.input = input

    const formatString = options.formatString   // 格式化字符串
    const separatorReg = options.separatorReg   // 清除分隔符的正则
    const formatArray = formatString.split('')  // 将格式化字符串分割成格式化数组
    const separatorIndexArray = this.separatorIndexArray = []  // 存放格式化字符串里分隔符的下标

    input.maxLength = formatString.length       // 设置输入框的最大长度

    formatArray.forEach((item, index) => {
      if (separatorReg.test(item)) {
        separatorIndexArray.push({
          index: index,
          value: item
        })
      }
    })
  }

  /**
   * 仅格式化，不考虑光标移动
   */
  formatOnly() {
    const input = this.input
    const separatorReg = this.options.separatorReg                      // 清除分隔符的正则
    const valueArray = input.value.replace(separatorReg, '').split('')  // 去除分隔符后的数字数组

    this.formattedValue = formatter(valueArray, this.separatorIndexArray)

    // 异步设值，解决 vuejs 里 v-model 绑定问题
    setTimeout(() => {
      input.value = this.formattedValue
      this.lastInputLength = input.value.length
    })
  }

  /**
   * 添加 input 处理函数
   */
  addInputHandler() {
    const options = this.options
    const input = this.input
    const separatorReg = options.separatorReg   // 清除分隔符的正则
    const beforeFormat = options.beforeFormat   // 钩子函数
    this.lastInputLength = 0                    // 上次输入的长度，包含分隔符
    this.lastSelectionStart = 0                 // 上次的鼠标位置
    let isBadAndroid                            // 有兼容性的 Android

    /**
     * 输入处理
     */
    this.inputHandler = () => {
      const inputLength = input.value.length
      const isAdd = this.lastInputLength < inputLength                         // 是否是添加字符
      const valueArray = input.value.replace(separatorReg, '').split('')  // 去除分隔符后的数字数组
      const separatorIndexArray = this.separatorIndexArray
      let selectionStart = input.selectionStart                           // 输入后的光标位置

      /**
       * 判断是否是有兼容性问题的 Android，并将有兼容性问题的 Android 处理成正常情况
       *
       * 问题描述：某些低版本 Android 上，input 事件里获取的 selectionStart 是输入之前的 selectionStart
       */
      if (isBadAndroid === undefined) {
        if (isAdd) {
          // 判定是否有兼容性问题的 Android 的两种方式：
          // 1、根据第一个输入判断：inputLength === 1 && selectionStart === 1
          // 2、根据某次输入判断：lastSelectionStart === selectionStart
          // 这两种方式不能覆盖所有的情况，但基本上满足绝大多数情况了
          if (inputLength === 1 && selectionStart === 0 || this.lastSelectionStart === selectionStart) {
            isBadAndroid = true
          } else {
            isBadAndroid = false
          }
        }
      }

      // 增加字符时，将 badAndroid 处理成正常情况
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

      // 如果增加超过两位，可认为是复制，仅进行格式化操作
      if (inputLength - this.lastInputLength > 1) {
        this.formatOnly()
        const maxlength = +input.getAttribute('maxlength')
        return setTimeout(() => {
          input.setSelectionRange(maxlength, maxlength)
        })
      }

      // 处理输入格式化及光标位置
      separatorIndexArray.forEach((separatorObject) => {
        if (valueArray.length <= separatorObject.index) {
          return
        }

        // 处理光标位置
        if (isAdd) {
          // 添加字符，且是在分隔符的位置上添加，则光标后移一位（因为要插入分隔符）
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

      input.value = this.formattedValue = valueArray.join('')
      this.lastInputLength = valueArray.length

      // 增加字符 && 在中间区域输入(非末尾输入)
      if (isAdd && selectionStart < input.value.length) {
        separatorIndexArray.some((separatorObject) => {
          if (separatorObject.index === selectionStart) {
            selectionStart++
            return true
          }
        })
      }
      this.lastSelectionStart = selectionStart
      setTimeout(function () {
        input.setSelectionRange(selectionStart, selectionStart)
      })
    }
    input.addEventListener('input', this.inputHandler, false)
  }

  /**
   * 移除 inputHandler
   */
  removeInputHandler() {
    this.inputHandler && this.input.removeEventListener('input', this.inputHandler)
  }

  /**
   * 重置 inputHandler
   */
  resetInputHandler(options) {
    this.input.value = this.formattedValue = ''
    this.initData(this.input, options)
    this.removeInputHandler()
    this.addInputHandler()
  }
}
