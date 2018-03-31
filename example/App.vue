<template>
  <div id="app">
    <header class="input-formatting-header">
      <h1>input-formatting 使用说明</h1>
    </header>
    <div class="input-formatting-content">
      <ul class="input-formatting-list safe-area-pb">
        <li :key="component.path" class="input-formatting-item" v-for="component in components">
          <router-link class="link" :to="component.path">{{component.text}}
          </router-link>
        </li>
      </ul>
    </div>
    <transition name="move">
      <router-view class="input-formatting-view"></router-view>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import 'highlight.js/styles/github.css'
  export default {
    data() {
      return {
        components: [
          {
            path: '/options-input',
            text: 'options.input 配置'
          },
          {
            path: '/options-format',
            text: 'options.format 配置'
          },
          {
            path: '/options-delimiters',
            text: 'options.delimiters 配置'
          },
          {
            path: '/options-initial-value',
            text: 'options.initialValue 配置'
          },
          {
            path: '/options-before-format',
            text: 'options.beforeFormat() 配置'
          },
          {
            path: '/options-after-format',
            text: 'options.afterFormat() 配置'
          },
          {
            path: '/methods-stop',
            text: '实例方法：$stop() 配置'
          },
          {
            path: '/methods-reset',
            text: '实例方法：$reset() 配置'
          },
          {
            path: '/methods-format',
            text: '静态方法：format() 配置'
          }
        ]
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import 'common/css/reset.styl'
  // @import 'normalize.css/normalize.css'
  .input-formatting-header
    height: 44px
    line-height: 44px
    text-align: center
    background-color: #f7f7f7
    box-shadow: 0 1px 6px #ccc
    -webkit-backface-visibility: hidden
    backface-visibility: hidden
    h1
      font-size: 18px
      font-weight: 500
  .input-formatting-content
    .input-formatting-list
      padding-left: 10px
      .input-formatting-item
        position: relative
        height: 40px
        line-height: 40px
        border-bottom: 1px solid #ccc
        .link
          display: block
          position: relative
          width: 100%
          color: #333
          text-decoration: none
          outline: 0
        &:after
          position: absolute
          content: ''
          top:0
          right: 0
          width: 9px
          height: 9px
          border: 1px solid rgb(204, 204, 204)
          border-width: 1px 1px 0 0
          transform: translate(-20px, 22px) translate(10px, 0) rotate(45deg) translate(-10px, 0)
  .input-formatting-view
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    background-color: #efeff4
    transition: all 0.3s
    transform: translate3d(0, 0, 0)
    &.move-enter-active, &.move-leave-active
      transform: translate3d(100%, 0, 0)
  .desc
    p
      margin: 15px 0
      text-indent: 2em
  .example-section
    margin-bottom: 30px
    h2
      font-size: 14px
      line-height: 30px
    input
      padding: 5px 5px
      border: 1px solid #ccc
    pre
      overflow: hidden
      code
        display: block
        width: 100%
        overflow-x: auto

</style>
