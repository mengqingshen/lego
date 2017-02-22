/**
 * Created by tonyearth on 2016/12/14.
 */
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import WindowForCrawl from '../views/windowForCrawl.vue'
import store from './store'

Vue.use(ElementUI)

new Vue({
    el: '#app',
    store,
    render: h => h(WindowForCrawl)
})
