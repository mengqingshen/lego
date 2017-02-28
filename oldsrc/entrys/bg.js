import Vue from 'vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import bg from '../views/bg.vue'

Vue.use(ElementUI)

new Vue({
  el: '#app',
  render: h => h(bg)
})
