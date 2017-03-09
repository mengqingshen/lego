import * as VARIABLES from '../store/variables'

/**
 * 一个简单的爬虫
 */
class Crawler {
  /**
   * 获取页面中的图片的 URL
   * 
   * @param{string} CSSSelector css 选择器
   * @returns{array} 找到的所有图片的 URL 组成的数组
   */
  getImgUrlsByCSSSelector (cssSelector) {
    const imgDoms = $(cssSelector)
    if(imgDoms) {
      return Array.from(imgDoms).map(function(img) {
        return [
          img.src,
          {
            w: img.naturalWidth,
            h: img.naturalHeight,
            checked: true,
            downloaded: false
          }
        ]
      })
    }
    return []
  }

  /**
   * 批量下载图片到本地
   * 
   * @param{array} imgSrcs 需要下载的图片链接
   */
  downloadImgBySrc(imgSrcs) {
    const a = $('<a download>')
    return new Promise((resolve, reject) => {
      imgSrcs.forEach(src => {
        a.attr('href', src).click()
      })
      resolve();
    })
  }
}

export const crawler = new Crawler()
export default {
  /**
   * 获取所有网站推荐的 css 选择器
   * 
   * @returns {Array} 所有网站推荐的 css 选择器
   */
  getSelectorsRecommanded () {
    return VARIABLES._selectorsRecommanded
  },

  /**
   * 获取所有收藏的 css 选择器
   */
  getSelectorsCollected () {
    let selectorCollected
    const temp = localStorage.getItem(VARIABLES.SELECTORS_COLLECTED)
    if(!temp) {
      return null
    }

    try {
      selectorCollected = JSON.parse(temp)
    } catch (err) {
      console.error(err)
    }
    return selectorCollected
  },

  /**
   * 持久化收藏的 css 选择器数据
   * 
   * @param {Array} selectorCollected 收藏的 css 选择器数据
   */
  saveSelectorsCollected (selectorsCollected) {
    localStorage.setItem(VARIABLES.SELECTORS_COLLECTED, JSON.stringify(selectorsCollected))
  },

  /**
   * 获取使用过的 css 选择器数据
   * 
   * @returns{Array}
   */
  getSelectorsHistory () {
    let selectorsHistory
    const temp = localStorage.getItem(VARIABLES.SELECTORS_HISTORY)
    if(!temp){
      return null
    }
    try {
      selectorsHistory = JSON.parse(temp)
    }
    catch (err) {
      console.error(err)
    }
    return selectorsHistory
  },

  /**
   * 持久化 css 选择器历史数据
   * 
   * @param{Array} selectorsHistory
   */
  saveSelectorsHistory (selectorsHistory) {
    localStorage.setItem(VARIABLES.SELECTORS_HISTORY, JSON.stringify(selectorsHistory))
  }
}