import crawl, {
  crawler
} from '../../api/crawl'
import * as types from '../mutation-types'

/**
 * initial state
 */ 
const state = {
  isExpanded: false,
  activeTabName: 'collected', // recommand, collected
  lastPanel: 'collection',
  currentPanel: 'search', // search, collection, download
  selectorsHistory: crawl.getSelectorsHistory() || [],
  selectorsCollection: crawl.getSelectorsCollected() || [],
  selectorsRecommanded: crawl.getSelectorsRecommanded() || [],
  imgs: [
    ['http://tu.zmzjstu.com/ftp/2017/0206/b_eeb77cea52c6472865f623a26865c185.jg', { w: 100, h: 61, checked: true, downloaded: false}],
    ['http://tu.zmzjstu.com/ftp/2017/0302/s_8bb968c1fc3937e4b33b0b70fa90b779.jg', { w: 100, h: 46, checked: true, downloaded: false}],
    ['http://tu.zmzjstu.com/ftp/2017/0302/s_daa4b2a8467bea662b446f4e9f961d74.jpg', { w: 100, h: 61, checked: true, downloaded: false}],
    ['http://tu.zmzjstu.com/ftp/2017/0303/s_357a3b63cce671824f21585d4c69519a.jpg', { w: 100, h: 66, checked: true, downloaded: false}],
    ['http://tu.zmzjstu.com/ftp/2017/0302/s_e57cc049cd712ffb82a703cbc1c0bd92.jpg', { w: 100, h: 50, checked: true, downloaded: false}],
    ['http://tu.zmzjstu.com/ftp/2017/0302/s_8bb968c1fc3937e4b33b0b70fa90b779.jpg', { w: 100, h: 46, checked: true, downloaded: false}]
  ],
  imgWidth: 220
}

/**
 * getters
 */ 
const getters = {
  /* 是否展开 */
  isExpanded: state => state.isExpanded,

  /* 是否选中了全部 */
  checkAll: state => state.imgs.length === state.imgs.filter(([key, value]) => value.checked).length,

  /* 是否选择了部分图片 */
  isIndeterminate: (state, getters) => {
    const checkedCount = state.imgs.filter(([key, value]) => value.checked).length
    const allCount = state.imgs.length
    return checkedCount > 0 && checkedCount < allCount
  },
  selectorsHistory: state => state.selectorsHistory,
  currentPanel: state => state.currentPanel,
  selectorsCollection: state => state.selectorsCollection,
  selectorsRecommanded: state => state.selectorsRecommanded
}

/** 
 * actions
 */
const actions = {
  /* 进入列表面板 */
  handHisClicked({ commit, state }, e) {
    commit(types.SWITCH_PANEL, 'collection')
  },

  /* 展开或收起 */
  handleArrowClicked({ commit }) {
    commit(types.TRIGGER_EXPAND)
  },

  /* 点击下载 */
  handleDownloadClicked({ commit, state }) {
    const imgSrcs = state.imgs.filter(([key, value]) => value.checked && !value.downloaded).map(([key, value]) => key)
    crawler.downloadImgBySrc(imgSrcs).then(() => {
      commit(types.FINISH_DOWNLOAD, imgSrcs)
    })
  },

  /* 全选或全不选所有图片 */
  handleCheckAllChange({ commit, state }, event) {
    if(event.target.checked) {
      commit(types.SELECT_IMG_ALL)
    }
    else {
      commit(types.UNSELECT_IMG_ALL)
    }
  },

  /* 返回 */
  back({ commit, state }) {
    commit(types.BACK)
    console.log(state)
  },

  /* 关闭爬取图片的窗口 */
  closeCrawlWindow({ commit }) {
    chrome.tabs.getSelected(null, function(tab) {
      chrome.tabs.sendRequest(tab.id, {
        command: 'closeCrawlWindow'
      })
    })
  },

  /* 爬取图片 */
  triggerCrawl({ commit }, cssSelector) {
    commit(types.SWITCH_PANEL, 'download')
    chrome.tabs.getSelected(null, function(tab) {
      chrome.tabs.sendRequest(tab.id, {
        command: 'fireCrawl',
        cssSelector
      }, (imgs) => {
        JSON.stringify(imgs)
        commit(types.ADD_IMGS, imgs)
      })
    });
  },

  /* 收藏或取消收藏 */
  starOrNot({ commit }, selector) {
    if (selector.isCollected) {
      commit(types.REMOVE_FROM_COLLECTION, selector)
    }
    else {
      commit(types.ADD_TO_COLLECTION, selector)
    }
  }
}

/**
 * mutations
 */ 
const mutations = {
  [types.TRIGGER_EXPAND] (state) {
    state.isExpanded = !state.isExpanded
  },
  /* 下载完成 */
  [types.FINISH_DOWNLOAD] (state, imgsUrl) {
    const imgsMap = new Map(state.imgs)
    imgsMap.forEach((value, key) => {
      if(imgsUrl.includes(key)) {
        value.downloaded = true
      }
    })
    state.imgs = Array.from(imgsMap)
  },

  /* 返回 */
  [types.BACK] (state) {
    state.currentPanel = state.lastPanel
  },

  /* 切换面板 */
  [types.SWITCH_PANEL] (state, panelName) {
    state.lastPanel = state.currentPanel
    state.currentPanel = panelName
    console.log(panelName)
    console.log(state)
  },

  /* 收藏 */
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

  /* 取消收藏 */
  [types.REMOVE_FROM_COLLECTION] (state, { hostname, cssSelector }) {
    const collectionsMap = new Map(state.selectorsCollection)
    const temp = new Set(collectionsMap.get(hostname))
    temp.delete(cssSelector)
    collectionsMap.set(hostname, Array.from(temp))

    state.selectorsCollection = Array.from(collectionsMap)
  },

  /* 添加到历史记录 */
  [types.ADD_TO_HISTORY_LIST] (state, { hostname, cssSelector }) {
    const tempStr = JSON.stringify({ hostname, cssSelector })
    const historySet = new Set(state.selectorsHistory)

    // 确保历史最新添加的一条历史记录在末尾
    historySet.delete(tempStr)
    historySet.add(tempStr)

    state.selectorsHistory = Array.from(historySet)
  },

  /* 从历史记录删除一条 */
  [types.REMOVE_FROM_HISTORY] (state, { hostname, cssSelector} ) {
    const tempStr = JSON.stringify({ hostname, cssSelector })
    const historySet = new Set(state.selectorsHistory)
    historySet.delete(tempStr)

    state.selectorsHistory = Array.from(historySet)
  },

  /* 选中某个图片 */
  [types.CHANGE_CHECKEDIMGS] (state, checkedImgUrls) {
    const imgsMap = new Map(state.imgs)
    imgsMap.forEach((value, key) => {
      value.checked = checkedImgUrls.includes(key)
    })
    state.imgs = Array.from(imgsMap)
  },

  /* 选中所有图片 */
  [types.SELECT_IMG_ALL] (state) {
    state.imgs.forEach(item => {
      item[1].checked = true
    })
  },

  /* 取消选中所有图片 */
  [types.UNSELECT_IMG_ALL] (state) {
    state.imgs.forEach(item => {
      item[1].checked = false
    })
  },

  /* 添加一组图片 */
  [types.ADD_IMGS] (state, newImgs)
  {
    if(newImgs) {
      const temp = [...state.imgs]
      temp.push(...newImgs)
      state.imgs = Array.from(new Map(temp))
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}