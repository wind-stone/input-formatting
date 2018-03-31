<template>
  <page
    class="options-initial-value"
    title="options.initialValue 配置"
    desc="options-initial-value">
    <div slot="desc">
      <p>options.initialValue，可选参数，输入的初始值，若存在，则会格式化并作为 input 输入框的 value 值</p>
      <p>需要注意的是，如果 options.initialValue，但是 input 输入框标签的 value 特性存在，也会被格式化并作为 input 输入框的 value 值</p>
    </div>
    <div slot="content">
      <section class="example-section">
        <h2>实例化时，options.initialValue 存在</h2>
        <input type="tel" class="input-initial-value">
      </section>
      <section class="example-section">
        <h2>实例化时，仅 dom 的 value 存在</h2>
        <input type="tel" value="15123456789" class="input-dom-value">
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
    // options.initialValue 存在
    let inputInitialValue = new InputFormatting({
      input: '.input-initial-value',
      format: '***-****-****',
      delimiters: ['-'],
      initialValue: '15123456789'
    })

    // 实例化时，options.initialValue 不存在，但是 dom 的 value 存在
    let inputDomValue = new InputFormatting({
      input: '.input-dom-value',
      format: '***-****-****',
      delimiters: ['-']
    })
  }
}
</script>