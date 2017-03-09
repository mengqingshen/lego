import Vue from 'vue'
import {
  crawler
} from '../iframes/crawl-img/api/crawl'

new Vue({
  el: "#seanway-crawl-window",
  render (h) {
    return (
      <draggable>
        <iframe src={chrome.extension.getURL('iframes/crawl-img/index.html')}
                frameborder="0"
                seamless="seamless"
                scrolling="no"
                id="seanway-iframe"
                style={this.style}></iframe>
      </draggable>
    )
  },
  beforeCreate () {
    $('<div>', {
        id: "seanway-crawl-window"
    }).appendTo($(document.body))
  },
  data() {
    return {
      isCrawlWindowExists: false,
      style: {}
    }
  },
  components: {
    draggable: (resolve, reject) => {
      resolve(require('../iframes/crawl-img/components/draggable'))
    },
  },
  created () {
    const _this = this
    chrome.extension.onRequest.addListener((request, sender, sendResponse) => {
      switch(request.command) {
        case 'resize':
           Object.assign(_this.style, request.size)
           break
        case 'fireCrawl':
          console.log('开始爬取图片信息>>>')
          sendResponse(_this.crawl(request.cssSelector))
          console.log('>>>完成爬取任务，返回爬取的数据。')
          break
        case 'closeCrawlWindow':
          if (_this.isCrawlWindowExists) {
            this.removeCrawlWindow()
            _this.isCrawlWindowExists = false
          }
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
    removeCrawlWindow () {
      $('#seanway-crawl-window').remove()
    }
  }
})

