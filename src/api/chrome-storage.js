/* eslint-disable no-unused-vars */
/**
 * Created by mengqingshen on 2017/4/6.
 */

/**
 * 通过 key 获取 storage 中相应的 value
 * @param {string} key 键名
 */
export const getItem = (key) => new Promise(resolve => {
  chrome.storage.sync.get(key)
})

/**
 * 设置值到 storage 中
 * @param {string} key
 * @param {*} value
 */
export const setItem = (key, value) => new Promise(resolve => {
  chrome.storage.sync.set({ [key]: value }, resolve)
})
