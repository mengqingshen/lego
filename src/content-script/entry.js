import Vue from 'vue'
import {
    crawler
} from '../iframes/crawl-img/api/crawl'

new Vue({
    el: "#seanway-crawl-window",
    render (h) {
        const closeBtnData = {
            on: {
                click: () => {
                    this.hideCrawlWindow()
                }
            }
        }
        return (
            <div id="seanway-crawl-window">
                <transition name="slide-fade">
                    <draggable>
                        <div class="top-bar">
                            <span class="icon-span" {...closeBtnData}>
                                <svg width="10" height="10" viewBox="0 0 10 10" >
                                    <line x1="0" y1="0" x2="10" y2="10" stroke="#D3DCE6"/>
                                    <line x1="10" y1="0" x2="0" y2="10" stroke="#D3DCE6"/>
                                </svg>
                            </span>
                        </div>
                        <iframe src={chrome.extension.getURL('iframes/crawl-img/index.html')}
                                        frameborder="0"
                                        seamless="seamless"
                                        scrolling="no"
                                        id="seanway-iframe"
                                        style={{width: this.style.width, height: this.style.height}}></iframe>
                    </draggable>
                </transition>
            </div>
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
            style: {width: '220px', height: '100px'}
        }
    },
    components: {
        draggable: (resolve, reject) => {
            resolve(require('../iframes/crawl-img/components/draggable'))
        },
    },
    created () {
        chrome.extension.onRequest.addListener((request, sender, sendResponse) => {
            switch(request.command) {
                case 'show-crawl-window':
                    this.showCrawlWindow()
                    break
                case 'hello':
                    sendResponse('hello')
                    break
                case 'resize':
                    Object.assign(this.style, request.size)
                    break
                case 'fireCrawl':
                    console.log('开始爬取图片信息>>>')
                    sendResponse(this.crawl(request.cssSelector))
                    console.log('>>>完成爬取任务，返回爬取的数据。')
                    break
                case 'closeCrawlWindow':
                    if (this.isCrawlWindowExists) {
                        this.hideCrawlWindow()
                        this.isCrawlWindowExists = false
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
        hideCrawlWindow () {
            $('#seanway-crawl-window').hide()
        },
        showCrawlWindow () {
            $('#seanway-crawl-window').show()
        },
        
    }
})

