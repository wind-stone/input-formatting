<template>
  <page
    class="options-delimiters"
    title="options.delimiters 配置"
    desc="options-delimiters">
    <div slot="desc">
      <p>options.delimiters，必传参数，字符串类型的数组，每个元素都是分隔符，在 options.format 里出现的所有的分隔符都要在此列出；如果没列出将视为非分隔符。</p>
      <p>options.delimiters 数组内可以有 1 个或多个元素。</p>
    </div>
    <div slot="content">
      <section class="example-section">
        <h2>delimiters 数组仅有单个元素</h2>
        <input type="tel" class="input-delimiters-single">
      </section>
      <section class="example-section">
        <h2>delimiters 数组有多个元素</h2>
        <input type="tel" class="input-delimiters-multi">
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
  name: 'options-delimiters',
  components: {
    Page,
    Markdown
  },
  mounted () {
    let inputDelimitersSingle = new InputFormatting({
      input: '.input-delimiters-single',
      format: '342425-1990-1004-055X',
      delimiters: ['-']
    })

    let inputDelimitersMulti = new InputFormatting({
      input: '.input-delimiters-multi',
      format: '342425-1990/10/04-055X',
      delimiters: ['-', '/']
    })
  }
}
</script>
