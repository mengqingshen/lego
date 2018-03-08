import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import 'material-design-icons/iconfont/material-icons.css'

import App from './views/app'

// ui 组件库
Vue.use(VueMaterial)

new Vue({
  el: '#app',
  render: h => h(App)
})
