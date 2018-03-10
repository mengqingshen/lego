import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import 'material-design-icons/iconfont/material-icons.css'

import App from './views/app.vue'
import store from './store'
import draggable from '../common/components/draggable'

import '../assets/way.png'
import '../lib/style/reset.css'
import '../lib/style/zxx.lib.css'
import '../assets/iconfont/iconfont.css'

// ui 组件库
Vue.use(VueMaterial)
Vue.component('draggable', draggable)

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
