<template>
  <page
    class="methods-reset"
    title="实例方法：$reset()"
    desc="method-reset">
    <div slot="desc">
      <p>实例方法 $reset()，重新设置格式化的条件。</p>
    </div>
    <div slot="content">
      <section class="example-section">
        <h2><button @click="reset">点击此标题，重新设置格式化条件</button></h2>
        <input type="tel" class="input-reset">
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
    this.resetInput = new InputFormatting({
      input: '.input-reset',
      format: '***-****-****',
      delimiters: ['-']
    })
  },
  methods: {
    reset() {
      this.resetInput.$reset({
        input: '.input-reset',
        format: '***~****~****',
        delimiters: ['~']
      })
    }
  }
}
</script>


