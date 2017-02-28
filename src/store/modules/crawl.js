import crawl from '../../api/crawl'
import * as types from '../mutation-types'

// initial state
const state = {
	currentPanel: 'panelSearch',
	selectorsHistory: crawl.getSelectorsHistory() || [],
	selectorsCollection: crawl.getSelectorsCollected() || [],
	selectorsRecommanded: crawl.getSelectorsRecommanded() || [],
	imgUrls: []
}

// getters
const getters = {
	currentPanel: state => state.currentPanel,
	selectorsHistory: state => {
		return state.selectorsHistory.map(selector => {
			return JSON.parse(selector)
		}).reverse()
	},
	selectorsCollection: state => state.selectorsCollection,
	selectorsRecommanded: state => state.selectorsRecommanded
}

// actions
const actions = {
	/**
	 * 爬取图片
	 */
	triggerCrawl ({ commit }, cssSelector) {
		commit(types.SWITCH_PANEL, 'panelResult')
		chrome.extension.sendRequest({
			command: 'fireCrawl',
			cssSelector
		})
	},
	gotoCollectionPanel ({ commit }) {
		commit(types.SWITCH_PANEL, 'panelCollection')
	},
	/**
	 * 收藏或取消收藏
	 * 
	 * @param{object} selector css选择器数据
	 */
	starOrNot({ commit }, selector) {
		if (selector.isCollected) {
			commit(types.REMOVE_FROM_COLLECTION, selector)
		}
		else {
			commit(types.ADD_TO_COLLECTION, selector)
		}
	}
}

// mutations
const mutations = {
	[types.SWITCH_PANEL] (state, panelName) {
		commit(types.SWITCH_PANEL, panelName)
	},

	// 收藏
	[types.ADD_TO_COLLECTION] (state, { hostname, cssSelector }) {
		let temp;
		const collectionsMap = new Map(state.selectorsCollection)
		if(collectionsMap.has(hostname)) {
			temp = new Set(collectionsMap.get(hostname))
		}
		else {
			temp = new Set();
		}
		temp.add(cssSelector)
		collectionsMap.set(hostname, Array.from(temp))

		state.selectorsCollection = Array.from(collectionsMap)
	},

	// 取消收藏
	[types.REMOVE_FROM_COLLECTION] (state, { hostname, cssSelector }) {
		const collectionsMap = new Map(state.selectorsCollection)
		const temp = new Set(collectionsMap.get(hostname))
		temp.delete(cssSelector)
		collectionsMap.set(hostname, Array.from(temp))

		state.selectorsCollection = Array.from(collectionsMap)
	},

	// 添加到历史记录
	[types.ADD_TO_HISTORY_LIST] (state, { hostname, cssSelector }) {
		const tempStr = JSON.stringify({ hostname, cssSelector })
		const historySet = new Set(state.selectorsHistory)

		// 确保历史最新添加的一条历史记录在末尾
		historySet.delete(tempStr)
		historySet.add(tempStr)

		state.selectorsHistory = Array.from(historySet)
	},

	// 从历史记录删除一条
	[types.REMOVE_FROM_HISTORY] (state, { hostname, cssSelector} ) {
		const tempStr = JSON.stringify({ hostname, cssSelector })
		const historySet = new Set(state.selectorsHistory)
		historySet.delete(tempStr)
		
		state.selectorsHistory = Array.from(historySet)
	},

	// 选中某个图片
	[types.SELECT_IMG] (state, imgSrc) {
		const imgUrlsMap = new Map(state.imgUrls)
		if(imgUrlsMap.has(imgSrc)) {
			imgUrlsMap.set(imgSrc, true)
			state.imgUrls = Array.from(imgUrlsMap)
		}
	},

	// 取消某个图片
	[types.UNSELECT_IMG] (state, imgSrc) {
		const imgUrlsMap = new Map(state.imgUrls)
		if(imgUrlsMap.has(imgSrc)) {
			imgUrlsMap.set(imgSrc, false)
			state.imgUrls = Array.from(imgUrlsMap)
		}
	},

	// 添加一组图片
	[types.ADD_IMGS] (state, imgSrcs)
	{
		const imgUrlsMap = new Map(state.imgUrls)
		
		// 默认选中
		imgSrcs.forEach(imgSrc => {
			imgUrlsMap.set(imgSrc, false)
		})
		state.imgUrls = Array.from(imgUrlsMap)
	},

	// 清除一组图片
	[types.REMOVE_IMGS] (state, imgSrcs) {
		const imgUrlsMap = new Map(state.imgUrls)
		
		// 默认选中
		imgSrcs.forEach(imgSrc => {
			imgUrlsMap.delete(imgSrc)
		})
		state.imgUrls = Array.from(imgUrlsMap)
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}