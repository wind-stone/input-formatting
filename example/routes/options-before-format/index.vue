<template>
  <page
    class="options-before-format"
    title="options.beforeFormat 配置"
    desc="options-before-format">
    <div slot="desc">
      <p>options.beforeFormat，可选参数，会在格式化输入字符串之前调用（input 事件之内），参数为格式化之前的输入字符串。如果该函数有返回值，返回值将代替用户手动输入的值作为最新的输入值进行格式化（注意，如果是这种情况，输入光标会移到最后）。</p>
      <p>一般情况下，不推荐在 beforeFormat 钩子里返回新值。</p>
    </div>
    <div slot="content">
      <section class="example-section">
        <h2>options.beforeFormat 存在</h2>
        <input type="tel" class="input-before-format">
      </section>
      <markdown></markdown>
    </div>
  </page>
</template>

<script>
import InputFormatting from 'src/input-formatting'
import Markdown from './index.md'
import Page from 'components/page'

export default {
  components: {
    Page,
    Markdown
  },
  mounted () {
    let inputBeforeFormat = new InputFormatting({
      input: '.input-before-format',
      format: '***-****-****',
      delimiters: ['-'],
      beforeFormat(value) {
        if (value[0] === '0') {
          return '1234'
        }
      }
    })
  }
}
</script>
