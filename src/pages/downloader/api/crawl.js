import * as VARIABLES from '../store/variables'
import Crawler from '../../../api/downloader'
import * as storage from '../../../api/chrome-storage'

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
    return storage.getItem(VARIABLES.SELECTORS_COLLECTED)
  },

  /**
   * 持久化收藏的 css 选择器数据
   *
   * @param {Array} selectorCollected 收藏的 css 选择器数据
   */
  saveSelectorsCollected (selectorsCollected) {
    storage.setItem(VARIABLES.SELECTORS_COLLECTED, selectorsCollected)
  },

  /**
   * 获取使用过的 css 选择器数据
   *
   * @returns{Array}
   */
  getSelectorsHistory () {
    return storage.getItem(VARIABLES.SELECTORS_HISTORY)
  },

  /**
   * 持久化 css 选择器历史数据
   *
   * @param{Array} selectorsHistory
   */
  saveSelectorsHistory (selectorsHistory) {
    storage.setItem(VARIABLES.SELECTORS_HISTORY, selectorsHistory)
  }
}
