import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import crawl from './modules/app'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  strict: debug,
  actions,
  getters,
  modules: {
    crawl
  }
})
