/**
 * Created by mengqingshen on 2018/02/05.
 */
import _ from 'lodash'
import {
  SET_MAP,
  SYNC_ADD_ORIGIN,
  SET_URL,
  SYNC_ADD_CHEATER,
  SYNC_CLEAR,
  SET_AVATAR,
  SET_TITLE,
  SYNC_COOKIE,
  SYNC_DELETE_ORIGIN,
  SYNC_DELETE_CHEATER
} from './mutation-types'

import {
  getItem
} from '../../../api/chrome-storage'

import {
  getAllCookie,
  setCookie
} from '../../../api/chrome-cookie'

import extension from '../../../api/chrome-extension'

import {
  getBase64Image
} from '../../../api/utils'
import config from '../config'

const {
  storageNameSpace,
  defaultAvatar
} = config

export default {
  deleteCheater ({ commit }, { fromSite, toSite }) {
    commit(SYNC_DELETE_CHEATER, { fromSite, toSite })
  },
  deleteOrigin ({ commit }, fromSite) {
    commit(SYNC_DELETE_ORIGIN, fromSite)
  },
  clear ({ commit }) {
    commit(SYNC_CLEAR)
  },

  /**
   * 新增模拟者
   */
  async addCheater ({ commit }, { selectedUrl, cheater }) {
    commit({
      type: SYNC_ADD_CHEATER,
      selectedUrl,
      cheater
    })
  },

  /**
   * 同步 cookie: origin -> cheater
   */
  syncCookie ({ commit, state }, { fromSite, toSite, name }) {
    console.log(state, fromSite, toSite)
    const cheater = state.map.find(({ url }) => url === fromSite).cheaterList.find(({ origin }) => origin === toSite)
    let cookies = cheater.cookies
    if (name !== undefined) {
      console.log('syncCookie', fromSite, toSite, name)
      cookies = [cookies.find(cookie => cookie.name === name)]
    }

    return Promise.all(cookies.map(cookie => setCookie({
      url: toSite,
      name: cookie.name,
      value: cookie.value,
      httpOnly: true,
      path: '/'
    }))).then(() => {
      commit({
        type: SYNC_COOKIE,
        fromSite,
        toSite,
        name
      })
    })
  },

  /**
   * 初始化全局状态
   * 1. 当前 tab 地址的 domain
   * 2. 模拟者和非模拟者名单
   */
  init ({ commit, dispatch }, payload) {
    return Promise.all(
      [
        extension.emitToCurrentTab('get-href').then((href) => {
          if (!href) return
          commit({
            type: SET_URL,
            url: href
          })
          return href
        }),
        getItem(storageNameSpace).then((data) => {
          // 更新下 cookie 同步状态, 并设置到 store 中
          const map = _.cloneDeep(data[storageNameSpace])
          return Promise.all(map.map((originItem) => getAllCookie({ url: originItem.url }).then(cookies => {
            return Promise.all(originItem.cheaterList.map(cheater => getAllCookie({ url: cheater.origin }).then(cheaterCookies => {
              cheater.cookies.forEach(cookie => {
                const originCookie = cookies.find(({ name }) => name === cookie.name)
                const cheaterCookie = cheaterCookies.find(({ name }) => name === cookie.name)
                Object.assign(cookie, originCookie)
                console.log('比较', originCookie.value, cheaterCookie.value)
                if (!originCookie || !cheaterCookie) {
                  cookie.status = 0 // 源站点没有对应的 cookie, 或者模拟者本身还没有对应被模拟者的 cookie
                }
                else if (originCookie.value === cheaterCookie.value) {
                  cookie.status = 1 // 和源站点对应的 cookie 一致
                }
                else {
                  cookie.status = 2 // 和源站点对应的 cookie 不一致
                }
              })
            })))
          }))).then(() => {
            commit({
              type: SET_MAP,
              map
            })
            return map
          })
        }),
        dispatch('getBase64ImageOfShortcut').then((base64Image = defaultAvatar) => {
          commit(SET_AVATAR, base64Image)
          return base64Image
        }),
        extension.emitToCurrentTab('get-title').then((title) => {
          if (!title) return
          commit(SET_TITLE, title)
          return title
        })
      ])
  },

  /**
   * 获取当前 tab 的 shortcut icon 的 base64 字符串
   */
  async getBase64ImageOfShortcut ({ commit }) {
    const uri = await extension.emitToCurrentTab('get-shortcut-icon')
    const base64Image = await getBase64Image(uri)
    return base64Image
  },

  /**
   * 新增被模拟者
   */
  addNewOrigin ({ commit }, payload) {
    commit(SYNC_ADD_ORIGIN, payload)
  }
}
