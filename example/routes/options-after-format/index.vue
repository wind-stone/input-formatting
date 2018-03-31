<template>
  <page
    class="options-after-format"
    title="options.afterFormat 配置"
    desc="options-after-format">
    <div slot="desc">
      <p>options.afterFormat，可选参数，会在格式化输入字符串之后调用，参数为格式化之后的字符串。</p>
    </div>
    <div slot="content">
      <section class="example-section">
        <h2>options.afterFormat</h2>
        <input type="tel" class="input-after-format">
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
    let optionsBeforeFormat = new InputFormatting({
      input: '.input-after-format',
      format: '***-****-****',
      delimiters: ['-'],
      afterFormat(value) {
        console.log(`格式化之后的值：${value}`)
      }
    })
  }
}
</script>
