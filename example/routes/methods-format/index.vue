
<template>
  <page
    class="methods-format"
    title="实例方法：format()"
    desc="method-format">
    <div slot="desc">
      <p>静态方法 format()，不考虑光标的移动，仅返回给定输入格式化后的。</p>
      <p>如果给定输入过长，会自动截断。</p>
    </div>
    <div slot="content">
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
    let value = InputFormatting.format({
      initialValue: '13345678901234',
      format: '***-****-****',
      delimiters: ['-']
    })
    console.log(`调用静态方法 format 后的值：${value}`)
  }
}
</script>
