// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'

import OptionsInput from './routes/options-input'
import OptionsFormat from './routes/options-format'
import OptionsInitialValue from './routes/options-initial-value'
import OptionsDelimiters from './routes/options-delimiters'
import OptionsBeforeFormat from './routes/options-before-format'
import OptionsAfterFormat from './routes/options-after-format'
import MethodsStop from './routes/methods-stop'
import MethodsReset from './routes/methods-reset'
import MethodsFormat from './routes/methods-format'

Vue.use(VueRouter)

const routes = [
  {
    path: '/options-input',
    component: OptionsInput
  },
  {
    path: '/options-format',
    component: OptionsFormat
  },
  {
    path: '/options-initial-value',
    component: OptionsInitialValue
  },
  {
    path: '/options-delimiters',
    component: OptionsDelimiters
  },
  {
    path: '/options-before-format',
    component: OptionsBeforeFormat
  },
  {
    path: '/options-after-format',
    component: OptionsAfterFormat
  },
  {
    path: '/methods-stop',
    component: MethodsStop
  },
  {
    path: '/methods-reset',
    component: MethodsReset
  },
  {
    path: '/methods-format',
    component: MethodsFormat
  }
]

const router = new VueRouter({
  routes
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
