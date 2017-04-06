import * as VARIABLES from '../store/variables'
import Crawler from '../../../api/downloader'
export {
  getStringModeOfRegExp
} from '../../../api/utils.js'
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
    if (!temp) {
      return null
    }

    try {
      selectorCollected = JSON.parse(temp)
    }
    catch (err) {
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
    if (!temp) {
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
