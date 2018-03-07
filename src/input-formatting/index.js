import { getValueArray, format, error } from './util'

export default class InputFormatting {
  /**
    * 格式化输入
    * @param { Object } options
    *   { HTMLInputElement } input 输入框 dom 节点
    *   { String } formatString    最终产生的格式，形如：'***-****-****'（手机号，- 连线分隔）
    *   { Array } delimiters       分隔符数组，如 ['-', '.']
    *   { String } initValue       初始要格式化的字符串，如 12345678910
    *   { Function } beforeFormat  格式化输入之前的钩子函数，接收输入值（去除了分隔符）为参数，钩子函数返回
    *                              true 则继续进行格式化，返回 false 则终止格式化
    */
  constructor(options) {
    this._init(options)
  }

  _init(options) {
    let input = options.input
    if (typeof input === 'string') {
      input = document.querySelector(input)
    }
    if (!(input instanceof HTMLInputElement)) {
      return error(`input is not a HTMLInputElement element`)
    }
    this._initData(input, options)
    this._addInputHandler()
    const initValue = options.initValue || input.value
    if (initValue) {
      this._formatOnly(initValue)
    }
  }

  _initData(input, options) {
    this.$input = input
    this._options = options
    this._lastInputLength = 0 // 上次输入的长度，包含分隔符
    this._lastSelectionStart = 0 // 上次的光标位置
    this._delimiterArray = []
    this._inputHandler = null

    input.setAttribute('maxLength', options.formatString.length)

    const delimiters = options.delimiters
    options.formatString.split('').forEach((delimiter, index) => {
      if (delimiters.indexOf(delimiter) > -1) {
        this._delimiterArray.push({
          index,
          value: delimiter
        })
      }
    })
  }

  /**
   * 仅格式化，不考虑光标移动
   */
  _formatOnly(value) {
    const input = this.$input
    const valueArray = getValueArray(value, this._options.delimiters)

    this.$value = format(valueArray, this._delimiterArray)

    // 异步设值，解决 vuejs 里 v-model 绑定问题
    setTimeout(() => {
      input.value = this.$value
      this._lastInputLength = input.value.length
    })
  }

  _addInputHandler() {
    const input = this.$input
    const delimiters = this._options.delimiters
    const beforeFormat = this._options.beforeFormat
    let isBadAndroid // 有兼容性的 Android

    this._inputHandler = () => {
      const inputLength = input.value.length
      const isAdd = this._lastInputLength < inputLength // 是否是添加字符
      const valueArray = getValueArray(input.value, delimiters)
      const delimiterArray = this._delimiterArray
      let selectionStart = input.selectionStart // 输入后的光标位置

      /**
       * 判断是否是有兼容性问题的 Android，并将有兼容性问题的 Android 处理成正常情况
       *
       * 问题描述：某些低版本 Android 上，input 事件里获取的 selectionStart 是输入之前的 selectionStart
       */
      if (isBadAndroid === undefined) {
        if (isAdd) {
          // 判定是否有兼容性问题的 Android 的两种方式：
          // 1、根据第一个输入判断：inputLength === 1 && selectionStart === 0
          // 2、根据某次输入判断：lastSelectionStart === selectionStart
          // 这两种方式不能覆盖所有的情况，但基本上满足绝大多数情况了
          if ((inputLength === 1 && selectionStart === 0) || (this._lastSelectionStart === selectionStart)) {
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

      // 如果增加超过两位，可认为是复制，仅进行格式化操作，并将光标移动到最后
      if (inputLength - this._lastInputLength > 1) {
        this._formatOnly()
        const maxlength = +input.getAttribute('maxlength')
        return setTimeout(() => {
          input.setSelectionRange(maxlength, maxlength)
        })
      }

      // 处理输入格式化及光标位置
      delimiterArray.forEach(delimiter => {
        if (valueArray.length <= delimiter.index) {
          return
        }

        // 处理光标位置
        if (isAdd) {
          // 添加字符，且是在分隔符的位置上添加，则光标后移一位（因为要插入分隔符）
          if (selectionStart === delimiter.index + 1) {
            selectionStart++
          }
        } else {
          // 删除字符，且删除的是分隔符，则将分隔符前的数字一并删除，光标位置前移一位
          if (selectionStart === delimiter.index) {
            valueArray.splice(delimiter.index - 1, 1)
            selectionStart--
          }
        }

        // 添加 分隔符
        if (delimiter.index < valueArray.length) {
          valueArray.splice(delimiter.index, 0, delimiter.value)
        }
      })

      input.value = this.$value = valueArray.join('')
      this._lastInputLength = valueArray.length

      // 增加字符 && 在中间区域输入(非末尾输入)
      if (isAdd && selectionStart < input.value.length) {
        delimiterArray.some(delimiter => {
          if (delimiter.index === selectionStart) {
            // 如果光标在分隔符前一位，则将光标移到分隔符后面
            selectionStart++
            return true
          }
        })
      }
      this._lastSelectionStart = selectionStart
      setTimeout(function () {
        input.setSelectionRange(selectionStart, selectionStart)
      })
    }
    input.addEventListener('input', this._inputHandler, false)
  }

  _removeInputHandler() {
    this._inputHandler && this.$input.removeEventListener('input', this._inputHandler)
  }

  $destroy() {
    this._removeInputHandler()
    this.$input.removeAttribute('maxLength')
    this.$input.value = ''
    this.$input = null
    this.$value = ''
    this._options = null
    this._delimiterArray = null
    this._inputHandler = null
  }

  $reset(options) {
    this.$destroy()
    options.input = options.input || this.$input
    this._init(options)
  }
}
