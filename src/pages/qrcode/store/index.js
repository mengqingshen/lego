/**
 * Created by mengqingshen on 2017/4/1.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  actions,
  getters,
  strict: debug
})
