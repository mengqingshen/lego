/**
 * Created by tonyearth on 2017/4/1.
 */
import "babel-polyfill"
import Vue from 'vue'
import store from './store'
import Index from './index.vue'

new Vue({
	el: '#app',
	store,
	render: h => h(Index)
})