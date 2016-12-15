/**
 * Created by tonyearth on 2016/12/14.
 */
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import ImgSpider from '../views/ImgSpider.vue'

Vue.use(ElementUI)

new Vue({
    el: '#app',
    render: h => h(ImgSpider)
})
