/**
 * Created by mengqingshen on 2017/4/2.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import main from './modules/main'
import downloader from './modules/downloader'
import qrcode from './modules/qrcode'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  strict: debug,
  modules: {
    main,
    downloader,
    qrcode
  }
})
