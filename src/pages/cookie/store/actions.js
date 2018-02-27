/**
 * Created by mengqingshen on 2018/02/05.
 */
import _ from 'lodash'
import {
  SET_MAP,
  ADD_ORIGIN,
  SET_URL
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

const { storageNameSpace } = config

export default {
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
  init ({ commit }, payload) {
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
                originItem.cheaterList.forEach(cheater => {
                  cheater.cookies.forEach(domainCookies => {
                    domainCookies.forEach((domainCookie) => {
                      getAllCookie({ domain: domainCookie.domain }).then(originCookies => {
                        domainCookies.cookies.forEach((cookie) => {
                          const originCookie = originCookies.find(({ name, value }) => name === cookie.name)
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
                })
              })
              commit({
                type: SET_MAP,
                map
              })
              resolve(map)
            }
          })
        })
      ])
  },

  /**
   * 获取当前 tab 的 shortcut icon 的 base64 字符串
   */
  async getBase64ImageOfShortcut ({ commit }, payload) {
    const uri = await extension.emitToCurrentTab('get-shortcut-icon')
    const base64Image = await getBase64Image(uri)
    return base64Image
  },

  /**
   * 新增被模拟者
   */
  addNewOrigin ({ commit }, payload) {
    commit(ADD_ORIGIN, payload)
  }
}
