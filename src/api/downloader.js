/* eslint-disable no-unused-vars */
/**
 * 一个简单的爬虫
 */
export default class Crawler {
  delay () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, 200)
    })
  }

  /**
   * 批量下载图片到本地
   * @param{array} imgSrcs 需要下载的图片信息
   */
  async downloadImgBySrc (checkedImgs) {
    for (let i = 0, len = checkedImgs.length; i < len; i++) {
      await this.downloadSingleImg(checkedImgs[i])
    }
  }

  downloadSingleImg (imgInfo) {
    return new Promise((resolve, reject) => {
      const a = document.createElement('a')
      a.setAttribute('download', '')
      a.onclick = () => {
        this.delay().then(data => {
          resolve()
        })
      }
      this.getHref(imgInfo.uri).then(href => {
        a.setAttribute('href', href)
        a.setAttribute('download', imgInfo.picName)
        const evObj = document.createEvent('MouseEvents')
        evObj.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, true, false, 0, null)
        a.dispatchEvent(evObj)
      })
    })
  }

  getHref (uri) {
    return new Promise((resolve, reject) => {
      if (/^blob/.test(uri)) {
        this.loadImageToBlob(uri).then((blob) => {
          resolve(window.URL.createObjectURL(blob))
        })
      }
      else {
        const match = uri.match(/(https?)/)
        if (match && match.length === 2) {
          resolve(match[1] + uri.split(match[1]).pop())
        }
        else {
          resolve(uri)
        }
      }
    })
  }

  /**
   * 获取页面中的图片的 URL
   * @param{string} CSSSelector css 选择器
   * @returns{array} 找到的所有图片的 URL 组成的数组
   */
  getImgUrlsByCSSSelector (cssSelector) {
    const imgDoms = $(cssSelector + ':not(#lego-window img)')
    if (imgDoms) {
      return Array.from(imgDoms).filter(img => !!img.src).map(function (img) {
        return [
          img.src,
          {
            w: img.naturalWidth,
            h: img.naturalHeight,
            checked: true,
            downloaded: false,
            longdesc: img.getAttribute('longdesc') || null,
            hide: false
          }
        ]
      })
    }
    return []
  }

  loadImageToBlob (uri) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest()
      xhr.open('get', uri, true)
      xhr.responseType = 'blob'
      xhr.onload = function () {
        resolve(this.response)
      }
      xhr.send()
    })
  }

  /**
   * 获取爬去的图片的名字
   * @param {string} uri 图片资源地址
   * @param {string} longdesc 图片资源描述（仅针对印象笔记）
   */
  generateNameOfPic (uri, longdesc) {
    if (longdesc) {
      longdesc = longdesc.replace('./', '')
    }
    return longdesc || uri.split('/').pop().split('?')[0]
  }
}
