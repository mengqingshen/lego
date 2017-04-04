import crawl, {
    crawler,
    getStringModeOfRegExp
} from '../../api/crawl'
import * as types from '../mutation-types'
import extension from '../../../../api/chrome-extension'

const state = {
    queryStringOfDownloads: '',
    isDownloadSearchMode: false,
    defaultSelectorText: 'img',
    isGrid: true,
    isPreviewDownload: true,
    isExpanded: false,
    activeTabName: 'collected', // recommand, collected
    lastPanel: 'collection',
    currentPanel: 'search', // search, collection, download
    selectorsHistory: crawl.getSelectorsHistory() || [],
    selectorsCollection: crawl.getSelectorsCollected() || [],
    selectorsRecommanded: crawl.getSelectorsRecommanded() || [],
    imgs: [
        ['http://tu.zmzjstu.com/ftp/2017/0206/b_eeb77cea52c6472865f623a26865c185.jg', { w: 100, h: 61, checked: true, downloaded: false, hide: false}],
        ['http://tu.zmzjstu.com/ftp/2017/0302/s_8bb968c1fc3937e4b33b0b70fa90b779.jg', { w: 100, h: 46, checked: true, downloaded: false, hide: false}],
        ['http://tu.zmzjstu.com/ftp/2017/0302/s_daa4b2a8467bea662b446f4e9f961d74.jpg', { w: 100, h: 61, checked: true, downloaded: false, hide: false}],
        ['http://tu.zmzjstu.com/ftp/2017/0303/s_357a3b63cce671824f21585d4c69519a.jpg', { w: 100, h: 66, checked: true, downloaded: false, hide: false}],
        ['http://tu.zmzjstu.com/ftp/2017/0302/s_e57cc049cd712ffb82a703cbc1c0bd92.jpg', { w: 100, h: 50, checked: true, downloaded: false, hide: false}],
        ['blob:https://maxiang.io/770bd6f1-0fa2-4ae4-b7ff-cf2724f2b2a3', { w: 100, h: 50, checked: true, downloaded: false, hide: false}],
        ['http://tu.zmzjstu.com/ftp/2017/0302/s_8bb968c1fc3937e4b33b0b70fa90b779.jpg', { w: 100, h: 46, checked: true, downloaded: false, hide: false}]
    ],
    imgWidth: 90
}

const getters = {
    queryStringOfDownloads: state => state.queryStringOfDownloads,
    isDownloadSearchMode: state => state.isDownloadSearchMode,
    isGrid: state => state.isGrid,
    isPreviewDownload: state => state.isPreviewDownload,
    imgWidth: state => state.imgWidth,
    imgUris: state => state.imgs.filter(([key, value]) => !value.downloaded).map(([uri, { w, h, checked, longdesc, hide }]) => {
        h = h === 0 ? 30 : h
        const height = ~~(h / w * state.imgWidth) + 'px'
        const width = state.imgWidth + 'px'
        return {
            picName: crawler.generateNameOfPic(uri, longdesc),
            uri, w, h, hide, checked,
            size: {
                height,
                width,
                "line-height": height
            }
        }
    }),
    checkedCount: state => state.imgs.filter(([_, { downloaded, checked }]) => !downloaded && checked).length,
    /* 是否展开 */
    isExpanded: state => state.isExpanded,
    
    /* 是否选中了全部 */
    checkAll: state => state.imgs.filter(([_, { downloaded }]) => !downloaded).every(([_, { checked }]) => checked),

    /* 是否全部都没选中 */
    checkAllOff: state => state.imgs.filter(([_, { downloaded }]) => !downloaded).every(([_, { checked }]) => !checked),

    /* 是否选中了部分 */
    checkSome: (state, getters) => !getters.checkAll && !getters.checkAllOff,
    selectorsHistory: state => state.selectorsHistory,
    currentPanel: state => state.currentPanel,
    selectorsCollection: state => state.selectorsCollection,
    selectorsRecommanded: state => state.selectorsRecommanded
}

const actions = {
    handleTriggerSearchMode ({ commit }) {
        commit(types.TRIGGER_DOWNLOAD_SEARCH_MODE)
    },
    handleSearchWithinDownload ({ commit }, queryRegExp) {
        if (queryRegExp === '') {
            return false
        }
        else {
            commit(types.QUERY_BY_REG_EXP, queryRegExp)
        }
    },
    removeCollection ({ commit }, { hostname, cssSelector }) {
        commit(types.REMOVE_FROM_COLLECTION, { hostname, cssSelector })
    },
    removeAllCollection ({ commit }) {
        commit(types.REMOVE_ALL_COLLECTION)
    },
    handleCheck ({ commit }, uri) {
        commit(types.CHANGE_CHECKEDIMGS, uri)
    },

    /* 切换图片列表预览样式 */
    handleClickPreviewType ({ commit, getters }) {
        commit(types.TRIGGER_PREVIEW_TYPE)
    },

    /* 批量选择/取消 */
    handleCheckedMass ({ commit, getters, state }) {
        if (getters.checkAll || getters.checkSome) {
            commit(types.UNSELECT_IMG_ALL)
        } else {
            commit(types.SELECT_IMG_ALL)
        }
    },

    /* 展开或收起下载列表 */
    handlePreviewClicked ({ commit }) {
        commit(types.TRIGGER_PREVIEW)
    },

    /* 进入列表面板 */
    handHisClicked ({ commit, state }, e) {
        commit(types.SWITCH_PANEL, 'collection')
    },

    /* 展开或收起 */
    handleArrowClicked ({ commit }) {
        commit(types.TRIGGER_EXPAND)
    },

    /* 点击下载 */
    handleDownloadClicked ({ commit, getters }) {
        const checkedImgs = getters.imgUris.filter(({ checked }) => checked)
        crawler.downloadImgBySrc(checkedImgs).then(() => {
            commit(types.FINISH_DOWNLOAD)
        })
    },

    /* 返回 */
    back ({ commit, state }) {
        commit(types.BACK)
    },

    /* 关闭爬取图片的窗口 */
    closeCrawlWindow () {
        extension.emitToCurrentTab('close-crawl-window')
    },

    /* 爬取图片 */
    triggerCrawl ({ commit, state }, cssSelector) {
        commit(types.SWITCH_PANEL, 'download')
        extension.emitToCurrentTab('fire-crawl', {
            cssSelector: cssSelector || state.defaultSelectorText
        }).then(imgs => {
            commit(types.ADD_IMGS, imgs)
        })
    },

    /* 收藏或取消收藏 */
    starOrNot ({ commit }, selector) {
        if (selector.isCollected) {
            commit(types.REMOVE_FROM_COLLECTION, selector)
        }
        else {
            commit(types.ADD_TO_COLLECTION, selector)
        }
    }
}

const mutations = {
    [types.CHANGE_QUERY_OF_DOWNLOADS] (state, queryRegExp) {
        state.queryStringOfDownloads = queryRegExp
    },
    [types.SHOW_ALL_DOWNLOAD] (state) {
        state.imgs.forEach(([_, info]) => {
            info.hide = false
        })
    },
    [types.QUERY_BY_REG_EXP] (state) {
        state.imgs.forEach(([ uri, info ]) => {
            const reg = new RegExp(getStringModeOfRegExp(state.queryStringOfDownloads))
            const picName = crawler.generateNameOfPic(uri, info.longdesc)
            info.hide = !reg.test(picName)
        })
    },
    [types.TRIGGER_DOWNLOAD_SEARCH_MODE] (state) {
        state.isDownloadSearchMode = !state.isDownloadSearchMode
    },
    [types.TRIGGER_PREVIEW_TYPE] (state) {
        state.isGrid = !state.isGrid
        if (state.isGrid) {
            state.imgWidth = 90
        }
        else {
            state.imgWidth = 198
        }
    },
    [types.TRIGGER_EXPAND] (state) {
        state.isExpanded = !state.isExpanded
    },
    [types.TRIGGER_PREVIEW] (state) {
        state.isPreviewDownload = !state.isPreviewDownload
    },
    [types.FINISH_DOWNLOAD] (state) {
        state.imgs.forEach(([src, info]) => {
            if (info.checked) {
                info.downloaded = true
            }
        })
    },

    /* 返回 */
    [types.BACK] (state) {
        state.currentPanel = state.lastPanel
    },

    /* 切换面板 */
    [types.SWITCH_PANEL] (state, panelName) {
        state.lastPanel = state.currentPanel
        state.currentPanel = panelName
    },

    /* 清空收藏 */
    [types.REMOVE_ALL_COLLECTION] (state) {
        state.selectorsCollection = []
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
        if (temp.size === 0) {
            collectionsMap.delete(hostname)
        }
        else {
            collectionsMap.set(hostname, Array.from(temp))
        }

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
    [types.CHANGE_CHECKEDIMGS] (state, src) {
        const [_, obj] = state.imgs.find(([imgSrc]) => src === imgSrc)
        obj.checked = !obj.checked
    },

    /* 选中所有图片 */
    [types.SELECT_IMG_ALL] (state) {
        state.imgs.forEach(([_, obj]) => {
            obj.checked = true
        })
    },

    /* 取消选中所有图片 */
    [types.UNSELECT_IMG_ALL] (state) {
        state.imgs.forEach(([_, obj]) => {
            obj.checked = false
        })
    },

    /* 添加一组图片 */
    [types.ADD_IMGS] (state, newImgs) {
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