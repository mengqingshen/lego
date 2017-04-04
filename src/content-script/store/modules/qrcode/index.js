/**
 * Created by mengqingshen on 2017/4/2.
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {},
  strict: debug
})
