import Vue from 'vue'
import App from './views/app.vue'
import store from './store'

import '../assets/way.png'
import '../lib/style/reset.css'
import '../lib/style/zxx.lib.css'
import '../assets/iconfont/iconfont.css'

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
