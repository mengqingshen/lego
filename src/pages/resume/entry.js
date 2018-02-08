/**
 * 2017.04.15 by mengqingshen
 */
import Vue from 'vue'
import iView from 'iview'
import VueRouter from 'vue-router'
import Routers from './router'
import Util from './libs/util'
import App from './app.vue'
import 'iview/dist/styles/iview.css'

Vue.use(VueRouter)
Vue.use(iView)

// 路由配置
const RouterConfig = {
  mode: 'hash',
  routes: Routers
}

console.log(RouterConfig)
const router = new VueRouter(RouterConfig)

router.beforeEach((to, from, next) => {
  console.log(to)
  iView.LoadingBar.start()
  Util.title(to.meta.title)
  next()
})

router.afterEach((to, from, next) => {
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
