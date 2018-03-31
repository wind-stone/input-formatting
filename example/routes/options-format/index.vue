<template>
  <page
    class="options-format"
    title="options.format 配置"
    desc="options-format">
    <div slot="desc">
      <p>options.format，必传参数，表示最终期望的格式化后的格式，字符串内字符分为两类：分隔符、非分隔符。</p>
      <p>针对分隔符，需要在 options.delimiters 里列出，没列出的均视为非分隔符。</p>
    </div>
    <div slot="content">
      <section class="example-section">
        <h2>选择符</h2>
        <input type="tel" class="input-format">
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
  data() {
    return {
      resetInput: null
    }
  },
  components: {
    Page,
    Markdown
  },
  mounted () {
    let inputFormat = new InputFormatting({
      input: '.input-format',
      format: '123-4561~7890',
      delimiters: ['-', '~']
    })
  }
}
</script>
