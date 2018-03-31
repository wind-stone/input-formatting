<template>
  <page
    class="methods-stop"
    title="实例方法：$stop()"
    desc="method-stop">
    <div slot="desc">
      <p>实例方法 $stop()，停止对输入进行格式化，解除一切限制（比如输入长度、事件监听等）</p>
      <p>如果传递的是 CSS 选择符，插件内部会使用 document.querySelector 获取 DOM 元素。</p>
    </div>
    <div slot="content">
      <section class="example-section">
        <h2><button @click="stop">点击此标题，停止格式化</button></h2>
        <input type="tel" class="input-stop">
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
      input: null
    }
  },
  components: {
    Page,
    Markdown
  },
  mounted () {
    this.input = new InputFormatting({
      input: '.input-stop',
      format: '***-****-****',
      delimiters: ['-']
    })
  },
  methods: {
    stop() {
      this.input.$stop()
    }
  }
}
</script>

