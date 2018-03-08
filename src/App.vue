<template>
  <div id="app">
    <section>
      <h2>input 为选择符</h2>
      <input ref="input1" type="tel" id="phone1">
    </section>
    <section>
      <h2>input 为 dom</h2>
      <input ref="input2" type="tel" id="phone2">
    </section>
    <section>
      <h2>delimiters 为多个元素</h2>
      <input ref="input3" type="tel" id="phone3">
    </section>
    <section>
      <h2>实例化时，options.initialValue 存在</h2>
      <input ref="inputInitialValue" type="tel" id="input-initial-value">
    </section>
    <section>
      <h2>实例化时，options.initialValue 不存在，但是 dom 的 value 存在</h2>
      <input ref="inputDomValue" value="13345678901" type="tel" id="input-dom-value">
    </section>
    <section>
      <h2>options.beforeFormat 存在（首位不能为 0）/ options.afterFormat</h2>
      <input ref="inputBeforeFormat" type="tel" id="input-before-format">
    </section>
    <section>
      <h2>实例方法：$stop()<button @click="stop">Stop</button></h2>
      <input ref="destroyInput" type="tel" id="stop-input">
    </section>
    <section>
      <h2>实例方法：$reset()<button @click="reset">Reset</button></h2>
      <input ref="resetInput" type="tel" id="reset-input">
    </section>
    <section>
      <h2>静态方法：format()</h2>
      <input ref="inputStaticFormat" type="tel" id="input-static-format">
    </section>
  </div>
</template>

<script>
import InputFormatting from './input-formatting'

export default {
  name: 'App',
  data() {
    return {
      resetInput: null
    }
  },
  mounted () {
    // input 为类
    let phoneInput1 = new InputFormatting({
      input: '#phone1',
      format: '123-4561-7890',
      delimiters: ['-']
    })
    console.log(phoneInput1)

    // input 为 dom
    let phoneInput2 = new InputFormatting({
      input: this.$refs.input2,
      format: '123-4561-7890',
      delimiters: ['-']
    })
    console.log(phoneInput2)

    // delimiters 为多个元素
    let phoneInput3 = new InputFormatting({
      input: this.$refs.input3,
      format: '342425-1990/10/04-055X',
      delimiters: ['-', '/']
    })
    console.log(phoneInput3)

    // options.initialValue 存在
    let inputInitialValue = new InputFormatting({
      input: this.$refs.inputInitialValue,
      initialValue: '13345678901',
      format: '***-****-****',
      delimiters: ['-']
    })
    console.log(inputInitialValue)

    // 实例化时，options.initialValue 不存在，但是 dom 的 value 存在
    let inputDomValue = new InputFormatting({
      input: this.$refs.inputDomValue,
      format: '***-****-****',
      delimiters: ['-']
    })
    console.log(inputDomValue)

    // options.beforeFormat 存在（首位不能为 0）/ options.afterFormat
    let inputBeforeFormat = new InputFormatting({
      input: this.$refs.inputBeforeFormat,
      format: '***-****-****',
      delimiters: ['-'],
      beforeFormat(value) {
        if (value[0] === '0') {
          console.log('第一个输入不能为0')
          this.$input.value = ''
          return false
        }
      },
      afterFormat(value) {
        console.log('格式化之后的值（afterFormat 回调的参数）：', value)
        console.log('格式化之后的值（this.$input.value）', this.$input.value)
      }
    })
    console.log(inputBeforeFormat)

    // $stop()
    this.destroyInput = new InputFormatting({
      input: this.$refs.destroyInput,
      format: '***-****-****',
      delimiters: ['-']
    })

    // $reset()
    this.resetInput = new InputFormatting({
      input: this.$refs.resetInput,
      format: '***-****-****',
      delimiters: ['-']
    })

    // format()
    this.$refs.inputStaticFormat.value = InputFormatting.format({
      initialValue: '13345678901234',
      format: '***-****-****',
      delimiters: ['-']
    })
  },
  methods: {
    stop() {
      this.destroyInput.$stop()
    },
    reset() {
      this.resetInput.$reset({
        input: this.$refs.resetInput,
        format: '***~****~****',
        delimiters: ['~']
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}
section {
  margin-top: 50px
}
section > h2 {
  margin: 0
}
section > input {
  border: 1px solid #ccc
}
button {
  background-color: red
}
</style>
