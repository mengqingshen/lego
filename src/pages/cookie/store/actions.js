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
  SET_TITLE
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
  syncCookie ({ commit }, fromSiteDomain, toSiteUrl, oldCookies) {
    return getAllCookie({
      domain: fromSiteDomain
    }).then((cookies) => {
      const tasks = []
      oldCookies.map(({ name }) => {
        const originCookie = cookies.find((cookie) => cookie.name === name)
        if (originCookie) {
          tasks.push(setCookie({
            url: toSiteUrl,
            name,
            value: originCookie,
            httpOnly: true,
            path: '/'
          }))
        }
      })
      return Promise.all(tasks)
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
          return new Promise((resolve, reject) => {
            if (data && Object.keys(data).length > 0) {
              const map = _.cloneDeep(data[storageNameSpace])
              map.forEach((originItem) => {
                getAllCookie({ url: originItem.url }).then(cookies => {
                  originItem.cheaterList.forEach(cheater => {
                    cheater.cookies.forEach(cookie => {
                      const originCookie = cookies.find(({ name, value }) => name === cookie.name)
                      if (!originCookie) {
                        cookie.status = 0 // 源站点没有对应的 cookie
                      }
                      else if (originCookie.value === cookie.value) {
                        cookie.status = 1 // 和源站点对应的 cookie 一致
                      }
                      else {
                        cookie.status = 2 // 和源站点对应的 cookie 不一致
                      }
                    })
                  })
                })
              })
              commit({
                type: SET_MAP,
                map
              })
              resolve(map)
            }
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
    console.log('base64', base64Image)
    return base64Image
  },

  /**
   * 新增被模拟者
   */
  addNewOrigin ({ commit }, payload) {
    commit(SYNC_ADD_ORIGIN, payload)
  }
}
