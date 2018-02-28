/**
 * Created by mengqingshen on 2018/02/05.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import storageSync from '../plugins/storage-sync'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    map: [],
    role: null, // origin 被模拟者，cheater 模拟者, null 不在名单中
    url: null,
    title: ''
  },
  plugins: [storageSync],
  actions,
  getters,
  mutations,
  strict: debug
})
