import * as types from '../mutation-types'
import {
  ALL_SUB_WINS
} from '../../../api/variables'

const state = {
  isHide: false, // 用户是否隐藏了窗口（点击关闭按钮会隐藏窗口）
  isMask: true, // 是否打开遮罩
  curSubWin: '', // 当前显示的功能模块
  size: {
    h: '30px',
    w: '220px'
  }
}

const getters = {
  sizeMA: state => state.size,
  isMaskMA: state => state.isMask,
  isHideMA: state => state.isHide,
  curSubWinMA: state => state.curSubWin
}

const actions = {
  resizeWinMA ({ commit }, size) {
    commit(types.MA_RESIZE, size)
  },
  toggleMaskMA ({ commit }) {
    commit(types.MA_TOGGLE_MASK)
  },
  hideWinMA ({ commit }) {
    commit(types.MA_HIDE_WIN)
  },
  showWinMA ({ commit }) {
    commit(types.MA_SHOW_WIN)
  },
  toggleSubWinMA ({ commit }, subWinName) {
    commit(types.MA_TOGGLE_SUB_WIN, subWinName)
  }
}

const mutations = {
  [types.MA_RESIZE] (state, size) {
    state.size = size
  },
  [types.MA_TOGGLE_MASK] (state) {
    state.isMask = !state.isMask
  },
  [types.MA_HIDE_WIN] (state) {
    state.isHide = true
  },
  [types.MA_SHOW_WIN] (state) {
    state.isHide = false
  },
  [types.MA_TOGGLE_SUB_WIN] (state, subWin) {
    console.log(subWin)
    console.log(ALL_SUB_WINS)
    if (state.curSubWin !== subWin && ALL_SUB_WINS.map(item => item.name).includes(subWin)) {
      state.curSubWin = subWin
      return true
    }
    return false
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
