<template>
  <page
    class="options-input"
    title="options.input 配置"
    desc="options-input">
    <div slot="desc">
      <p>options.input，必须参数，要进行格式化的 input 输入框，可以传递两种类型的值：CSS 选择符、DOM 元素。</p>
      <p>如果传递的是 CSS 选择符，插件内部会使用 document.querySelector 获取 DOM 元素。</p>
    </div>
    <div slot="content">
      <section class="example-section">
        <h2>选择符</h2>
        <input type="tel" class="input-selector">
      </section>
      <section class="example-section">
        <h2>DOM 元素</h2>
        <input type="tel" class="input-dom">
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
    // input 为选择器
    let phoneInputSelector = new InputFormatting({
      input: '.input-selector',
      format: '123-4561-7890',
      delimiters: ['-']
    })

    // input 为 dom
    const inputDOM = document.querySelector('.input-dom')
    let phoneInputDOM = new InputFormatting({
      input: inputDOM,
      format: '123 4561 7890',
      delimiters: [' ']
    })
  }
}
</script>
