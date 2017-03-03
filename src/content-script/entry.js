import Vue from 'vue'
import {
  crawler
} from '../iframes/crawl-img/api/crawl'

new Vue({
  created () {
    this.initIFrame()

    const _this = this
    chrome.extension.onRequest.addListener((request, sender, sendResponse) => {
      switch(request.command) {
        case 'fireCrawl':
          console.log('开始爬取图片信息>>>')
          sendResponse(_this.crawl(request.cssSelector))
          console.log('>>>完成爬取任务，返回爬取的数据。')
          break
        default:
          break
      }
    })
  },
  methods: {
    crawl (cssSelector) {
      return crawler.getImgUrlsByCSSSelector(cssSelector)
    },
    initIFrame () {
      const iframe = $('<iframe />', {
        id: "seanway-crawl-window",
        src: chrome.extension.getURL('iframes/crawl-img/index.html'),
        frameborder: 0,
        seamless: 'seamless',
        scrolling: 'no'
      }).appendTo($(document.body))
    }
  }
})

