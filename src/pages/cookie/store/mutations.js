/**
 * Created by mengqingshen on 2018/02/22.
 */

import * as types from './mutation-types'

export default {
  [types.SYNC_DELETE_CHEATER] (state, { fromSite, toSite }) {
    console.log(fromSite, toSite)
    const cheaterList = state.map.find(({ url }) => url === fromSite).cheaterList
    const index = cheaterList.find(({ origin }) => origin === toSite)
    cheaterList.splice(index, 1)
  },
  [types.SYNC_DELETE_ORIGIN] (state, fromSite) {
    const index = state.map.findIndex(({ url }) => url === fromSite)
    state.map.splice(index, 1)
  },
  [types.SYNC_COOKIE] (state, { fromSite, toSite, name }) {
    let cookies = state.map.find(({ url }) => url === fromSite).cheaterList.find(({ origin }) => origin === toSite).cookies
    if (name !== undefined) {
      cookies = [cookies.find(cookie => cookie.name === name)]
    }
    console.log('SYNC_COOKIE', cookies, fromSite, toSite, name)
    cookies.forEach(cookie => {
      cookie.status = 1
    })
  },
  [types.SET_TITLE] (state, title) {
    state.title = title
  },
  [types.SET_AVATAR] (state, avatar) {
    state.avatar = avatar
  },
  [types.SYNC_CLEAR] (state) {
    state.map = []
  },
  [types.SYNC_ADD_CHEATER] (state, payload) {
    const { selectedUrl, cheater } = payload
    const origin = state.map.find((item) => item.url === selectedUrl)
    if (origin) {
      if (origin.cheaterList.find(({ origin }) => origin === cheater.origin)) return
      origin.cheaterList.push(cheater)
    }
  },
  [types.SET_URL] (state, payload) {
    state.url = payload.url
  },
  [types.SET_ROLE] (state, payload) {
    state.role = payload.role
  },
  [types.SET_MAP] (state, payload) {
    state.map = payload.map
  },
  [types.SYNC_ADD_ORIGIN] (state, payload) {
    console.log(state, payload)
    if (state.map.find((item) => item.url === payload.url)) return
    state.map.push(payload)
    console.log(state.map.length, state.map[0])
  }
}
