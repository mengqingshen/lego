/* eslint-disable no-unused-vars */
/**
 * Created by mengqingshen on 2017/4/6.
 */

/**
 * 通过 key 获取 storage 中相应的 value
 * @param {string} key 键名
 */
export const getItem = (key) => new Promise((resolve, reject) => {
  if (!chrome.storage) {
    return resolve()
  }
  chrome.storage.sync.get(key, resolve)
}).then((result) => {
  console.log('chrome.storage.sync.get', key)
  console.table(result)
  return result
})

/**
 * 设置值到 storage 中
 * @param {string} key
 * @param {*} value
 */
export const setItem = (key, value) => new Promise((resolve, reject) => {
  if (!chrome.storage) {
    return resolve()
  }
  chrome.storage.sync.set({ [key]: value }, resolve)
}).then((result) => {
  console.log('chrome.storage.sync.set', key, value)
  console.table(result)
  return result
})
