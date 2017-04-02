/**
 * Created by mengqingshen on 2017/4/1.
 */
import "babel-polyfill"
import Vue from 'vue'
import store from './store'
import Index from './index.vue'

import '../../lib/style/reset.css'
import '../../lib/style/zxx.lib.css'
import '../../assets/iconfont/iconfont.css'

new Vue({
	el: '#app',
	store,
	render: h => h(Index)
})