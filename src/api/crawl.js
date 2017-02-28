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
	getImgUrlsByCSSSelector (CSSSelector) {
		$(CSSSelector).each(function(index, item) {
			console.log(item)
		})
	}
}

export default {
	Crawler,
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
		const selectorsCollectedArr = selectorsCollected
		localStorage.setItem(VARIABLES.SELECTORS_COLLECTED, JSON.stringify(selectorsCollectedArr))
	},

	/**
	 * 获取使用过的 css 选择器数据
	 * 
	 * @returns{Array}
	 */
	getSelectorsHistory () {
		let selectorHistory
		const temp = localStorage.getItem(VARIABLES.SELECTORS_HISTORY)
		if(!temp){
			return null
		}
		try {
			selectorHistory = JSON.parse(temp)
		}
		catch (err) {
			console.error(err)
		}
		return selectorHistory
	},

	/**
	 * 持久化 css 选择器历史数据
	 * 
	 * @param{Array} selectorsHistory
	 */
	saveSelectorsHistory (selectorsHistory) {
		const selectorsCollectedArr = selectorsHistory
		localStorage.setItem(VARIABLES.SELECTORS_HISTORY, JSON.stringify(selectorsHistoryArr))
	}
}