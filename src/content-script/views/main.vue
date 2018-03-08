/**
 * Created by mengqingshen on 2017/4/2.
 * 在该组件中组装子窗口
 */
<script>
  import 'animate.css'
  import extension from '../../api/chrome-extension'
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  import {
    crawler
  } from '../../pages/downloader/api/crawl'

  export default {
    computed: {
      ...mapGetters([
        'isMaskMA',
        'isHideMA',
        'curSubWinMA'
      ])
    },
    created () {
      extension.on({
        'how-are-you': data => {
          return this.isHideMA ? 'hidden' : this.curSubWinMA
        },
        'resize': data => {
          this.resizeWinMA(data.size)
        },
        'close-window': data => {
          if (!this.isHideMA) {
            this.hideWinMA()
          }
        },
        'show-sub-window': subWinName => {
          this.toggleSubWinMA(subWinName)
          this.showWinMA()
          return this.curSubWinMA
        },
        'get-href': () => window.location.href,
        'get-shortcut-icon': () => {
          const link = document.querySelector('link[rel="shortcut icon"]') || document.querySelector('link[rel="icon"]')
          if (link) {
            return link.href
          }
          const url = new URL(window.location.href)
          return `${url.origin}/favicon.ico`
        },
        'get-title': () => document.title,
        'fire-crawl': data => {
          return crawler.getImgUrlsByCSSSelector(data.cssSelector)
        }
      }, 'script-main')
    },
    methods: {
      ...mapActions([
        'resizeWinMA',
        'hideWinMA',
        'showWinMA',
        'toggleSubWinMA',
        'toggleMaskMA'
      ])
    },
    mounted () {
      this.showWinMA()
    }
  }
</script>

<template lang="pug">
  div
</template>
