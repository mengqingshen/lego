
<script>
	import {
		crawler
	} from '../../iframes/crawl-img/api/crawl'

	export default {
		data() {
			return {
				mask: true,
				show: false,
				style: {width: '220px', height: '100px'},
				src: chrome.extension.getURL('iframes/crawl-img/index.html')
			}
		},
		components: {
			draggable: (resolve, reject) => {
				resolve(require('../../iframes/crawl-img/components/draggable'))
			}
		},
		created () {
			chrome.extension.onRequest.addListener((request, sender, sendResponse) => {
				switch(request.command) {
					case 'show-crawl-window':
						this.showCrawlWindow()
						sendResponse()
						break
					case 'howareyou':
						sendResponse(this.show ? 'fine' : 'hidden')
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
						if (this.show) {
							this.hideCrawlWindow()
							sendResponse()
						}
						break
					default:
						break
				}
			})
		},
		methods: {
			triggerMask () {
				this.mask = !this.mask
			},
			crawl (cssSelector) {
				return crawler.getImgUrlsByCSSSelector(cssSelector)
			},
			hideCrawlWindow () {
				this.show = false
			},
			showCrawlWindow () {
				this.show = true
			}
		},
		mounted () {
			this.showCrawlWindow()
		},
	}
</script>

<template lang="pug">
	div
		#seayway-mask(v-show="mask && show")
		draggable
			transition(name="slide-fade")
				#seanway-crawl-window(v-show="show")
					.top-bar
						span.img-wrap(@click="triggerMask")
							img(v-show="mask", src="../assets/umbrella.png")
							img(v-show="!mask", src="../assets/si-glyph-umbrella-close.png")
						span.img-wrap(@click="hideCrawlWindow")
							img(src="../assets/close.png")
					iframe(
						:src="src",
						frameborder="0",
						seamless="seamless",
						scrolling="no",
						id="seanway-iframe",
						:style="{width: this.style.width, height: this.style.height}"
					)
</template>

<style scoped>
	.slide-fade-enter-active {
		transition: all .3s ease-out;
	}
	.slide-fade-leave-active {
		transition: all .3s ease-in;
	}
	.slide-fade-enter, .slide-fade-leave-active {
		transform: translateY(-50px);
		opacity: 0;
	}
</style>

<style lang="sass">
	#seayway-mask {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(0, 0, 0, .3);
		z-index: 999;
	}
	#seanway-iframe {
		cursor: auto;
	}
	#seanway-crawl-window {
		.top-bar {
			font-size: 0;
			text-align: right;
			color: #D3DCE6;
			background: transparent;
			margin-bottom: 3px;
			.img-wrap {
				margin-left: 5px;
			}
		}
	}
</style>