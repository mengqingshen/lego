import Vue from 'vue'
import Vuex from 'vuex'
import {
	ALL_SUB_WINS
} from '../../api/variables'
import extension from '../../api/chrome-extension'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
	strict: debug,
	state: {
		winCreated: false,
		isWinHidden: false,
		curSubWinName: ''
	},
	actions: {
		/**
		 * 获取当前页面功能窗口的工作状态
		 */
		ping: ({ commit }) => {
			extension.emitToCurrentTab('how-are-you').then(res => {
				if (!res) {
					return
				}
				commit('didCreated')
				if (res === 'hidden') {
					commit('didHidden')
				}
				else {
					commit('toggleCurSubWin', res)
				}
			})
		},
		
		/**
		 * 打开指定的子功能窗口
		 */
		openSubWin: ({ commit, dispatch,  getters, state }, subWinName) => {
			const isDisabled = getters.subWins.find(({ name }) => name === subWinName).isDisabled
			if (isDisabled) {
				return
			}
			if (state.winCreated) {
				extension.emitToCurrentTab('show-sub-window', subWinName).then(res => {
					dispatch('ping')
				})
			}
			else {
				extension.emitToExtension('create-window', subWinName).then(res => {
					dispatch('ping')
				})
			}
		}
	},
	getters: {
		subWins: state => {
			return ALL_SUB_WINS.map(item => {
				const isDisabled = (state.winCreated && !state.isWinHidden && item.name === state.curSubWinName)
				return Object.assign({}, item, {
					isDisabled
				})
			})
		}
	},
	mutations: {
		didCreated: state => {
			state.winCreated = true
		},
		didHidden: state => {
			state.isWinHidden = true
		},
		toggleCurSubWin: (state, subWinName)  => {
			state.curSubWinName = subWinName
		}
	}
})