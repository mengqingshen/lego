/**
 * Created by mengqingshen on 2018/02/22.
 */

import * as types from './mutation-types'

export default {
  [types.SET_URL] (state, payload) {
    state.url = payload.url
  },
  [types.SET_ROLE] (state, payload) {
    state.role = payload.role
  },
  [types.SET_MAP] (state, payload) {
    state.map = payload.map
  },
  [types.ADD_ORIGIN] (state, payload) {
    console.log('ADD_ORIGIN', state, payload)
    if (state.map.find((item) => item.origin === payload.origin)) return
    state.map.push(payload)
  }
}
