
<script>
	import {
		crawler
	} from '../../iframes/crawl-img/api/crawl'

	export default {
		data() {
			return {
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
	draggable
		transition(name="slide-fade")
			#seanway-crawl-window(v-show="show")
				div(class="top-bar")
					span(class="icon-span", @click="hideCrawlWindow")
						svg(width="10", height="10", viewBox="0 0 10 10")
							line(x1="0", y1="0", x2="10", y2="10", stroke="#D3DCE6")
							line(x1="10", y1="0", x2="0", y2="10", stroke="#D3DCE6")
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
	#seanway-iframe {
		cursor: auto;
		filter: drop-shadow(0px 0px 10px #000);
	}
	#seanway-crawl-window {
		.top-bar {
			text-align: right;
			color: #D3DCE6;
			background:white;
			.icon-span {
				display: inline-block;
				height: 20px;
				line-height: 20px;
				width: 20px;
				cursor: pointer;
				text-align: center;
				svg {
					vertical-align: middle;
				}
			}
		}
	}
</style>