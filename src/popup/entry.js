import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './views/app.vue'

import '../assets/logo.png'
import '../assets/way.png'

import '../lib/style/reset.css'
import '../lib/style/zxx.lib.css'
import '../assets/iconfont/iconfont.css'

Vue.use(ElementUI)

new Vue({
  el: '#app',
  render: h => h(App)
})
