/**
 * Created by mengqingshen on 2018/02/05
*/

import 'babel-polyfill'
import Vue from 'vue'
import VueRouter from 'vue-router'

import store from './store'
import Index from './index.vue'

import '../../lib/style/reset.css'
import '../../lib/style/zxx.lib.css'
import '../../assets/iconfont/iconfont.css'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import 'material-design-icons/iconfont/material-icons.css'

import CheaterSteps from './views/cheater-steps'
import ChooseRole from './views/choose-role'
import OriginSteps from './views/origin-steps'
import Origin from './views/origin'
import Cheater from './views/cheater'

Vue.config.debug = true

// ui 组件库
Vue.use(VueMaterial)

// 路由
Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/cheater',
      name: 'cheater',
      component: Cheater,
      meta: {
        pageTitle: '模仿者'
      }
    },
    {
      path: '/origin',
      name: 'origin',
      component: Origin,
      meta: {
        pageTitle: '被模仿者'
      }
    },
    {
      path: '/cheater-steps',
      name: 'cheater-steps',
      component: CheaterSteps,
      meta: {
        pageTitle: '新增模仿者流程'
      }
    },
    {
      path: '/origin-steps',
      name: 'origin-steps',
      component: OriginSteps,
      meta: {
        pageTitle: '新增被模仿者流程'
      }
    },
    {
      path: '/choose-role',
      name: 'choose-role',
      component: ChooseRole,
      meta: {
        pageTitle: '选择角色'
      }
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  next()
})

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(Index)
})
