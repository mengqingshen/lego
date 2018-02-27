/**
 * 将字面量模式的正则文本，转换为字符串模式的
 * 即，将其中的 \ 替换为 \\，因为 \ 在字符串中也有转译功能
 * @param {string} literalStr 字面量模式的正则文本
 * @return {string} 字符串模式的正则
 */

import extension from './chrome-extension'

function fireResize (size) {
  extension.emitToCurrentTab('resize', { size })
}
function getStringModeOfRegExp (literalStr) {
  return literalStr.replace('\\', '\\\\')
}

function isObject (it) {
  return Object.prototype.toString.call(it) === '[object Object]'
}

function isFunction (it) {
  return Object.prototype.toString.call(it) === '[object Function]'
}

function isArray (it) {
  return Object.prototype.toString.call(it) === '[object Array]'
}

/**
 * 通过图片地址获取图片的 base64
 * @param {String} uri  图片地址
 * @param {*} imageType 图片类型
 */
function getBase64Image (uri, imageType = 'png') {
  return new Promise((resolve, reject) => {
    console.log('getBase64', uri)
    const img = new Image()
    img.crossOrigin = ''
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      var ext = uri.substring(uri.lastIndexOf('.') + 1).toLowerCase() || imageType
      resolve(canvas.toDataURL(`image/${ext}`))
    }
    img.onerror = reject
    img.src = uri
  })
}

export {
  getStringModeOfRegExp,
  isObject,
  isFunction,
  isArray,
  fireResize,
  getBase64Image
}
