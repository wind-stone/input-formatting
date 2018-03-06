<template>
  <div id="app">
    <input ref="input" type="tel" id="phone" placeholder="phone">
  </div>
</template>

<script>
import InputFormatting from './input-formatting'
export default {
  name: 'App',
  mounted () {
    let phoneInput = new InputFormatting('#phone', {
      formatString: '123-4561-7890',
      delimiters: ['-'],
      beforeFormat: function (originValue) {
        if (originValue === '0') {
          this.input.value = ''
          return false
        }
      }
    })
    console.log(phoneInput)
    // setTimeout(function () {
    //   phoneInput.remove()
    // }, 10000)
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
