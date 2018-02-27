/* eslint-disable no-unused-vars */
/**
 * Created by mengqingshen on 2017/4/1.
 */
import {
  isObject,
  isFunction
} from './utils.js'

function insertScriptToCurrentTab (file) {
  return new Promise((resolve, reject) => {
    if (!_checkTabAPI()) {
      return resolve()
    }
    chrome.tabs.executeScript(null, { file }, () => {
      resolve()
    })
  })
}

function insertCSS (file) {
  return new Promise((resolve, reject) => {
    if (!_checkTabAPI()) {
      return resolve()
    }
    chrome.tabs.insertCSS(null, { file }, () => {
      resolve()
    })
  })
}

/**
 * 发送消息到扩展本身（背景页、popup）
 * @param {string} command 消息主题
 * @param {*} data 消息内容
 * @return {promise}
 */
function emitToExtension (command, data) {
  return new Promise(resolve => {
    _checkExtensionAPI() && chrome.extension.sendRequest(null, { command, data }, resolve)
  })
}

/**
 * 发送信息到浏览器窗口当前的 tab
 * @param {string} command 消息主题
 * @param {*} data 消息内容
 * @return {promise}
 */
function emitToCurrentTab (command, data) {
  return new Promise(resolve => {
    if (!_checkTabAPI()) {
      return resolve()
    }
    return getCurrentTab().then(({ id }) => {
      return emitToTab(id, command, data)
    }).then(resolve)
  })
}

/**
 * 发送信息到浏览器窗口指定的 tab
 * @param {number} tabId
 * @param {string} command 消息主题
 * @param {*} data 消息内容
 * @return {promise}
 */
function emitToTab (tabId, command, data) {
  return new Promise((resolve, reject) => {
    if (!_checkTabAPI()) {
      return resolve()
    }
    chrome.tabs.sendRequest(tabId, { command, data: data || {} }, resolve)
  })
}

/**
 * 获取当前的选项卡
 * @return{promise}
 */
function getCurrentTab () {
  return new Promise((resolve, reject) => {
    if (!_checkTabAPI()) {
      return resolve()
    }
    chrome.tabs.getSelected(null, resolve)
  })
}

/**
 * 获取或战中页面的链接
 * @param {string} path
 */
function generateURL (path) {
  if (_checkExtensionAPI()) {
    return chrome.extension.getURL(path)
  }
}

/**
 * 注册事件
 * @param {object} listeners 事件和回调的配置信息
 */
function on (listeners, monitor) {
  if (!isObject(listeners) || listeners === null) {
    return false
  }
  _checkExtensionAPI() && chrome.extension.onRequest.addListener((request, sender, sendResponse) => {
    console.log(monitor, request)
    const command = request.command
    const data = request.data
    let listener = null
    if (command in listeners) {
      listener = listeners[command]
      Promise.resolve(listener(data)).then(sendResponse)
    }
  })
}

function _checkExtensionAPI () {
  return typeof chrome.extension === 'object'
}
function _checkTabAPI () {
  return typeof chrome.tabs === 'object'
}

function _err (errMsg) {
  throw new Error('')
}

export default {
  emitToExtension,
  emitToCurrentTab,
  emitToTab,
  insertCSS,
  insertScriptToCurrentTab,
  getCurrentTab,
  generateURL,
  on
}
