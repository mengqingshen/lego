/**
 * Created by mengqingshen on 2016/12/14.
 */
import 'babel-polyfill'
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './views/app.vue'
import store from './store'

import '../../content-css/seanway.scss'
import '../../assets/iconfont/iconfont.css'
import '../../common/style/common.scss'

Vue.use(ElementUI)

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
