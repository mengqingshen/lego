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
    export default {
        components: {
            'draggable': (resolve, reject) => {
                resolve(require('../../common/components/draggable'))
            },
            'downloader': (resolve, reject) => {
                resolve(require('./downloader'))
            },
            'qrcode': (resolve, reject) => {
                resolve(require('./qrcode'))
            }
        },
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
                }
            })
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
        #seayway-mask(v-show="isMaskMA && !isHideMA")
        draggable
            transition(name="slide-fade")
                #seanway-window(v-show="!isHideMA")
                    .top-bar
                        span.img-wrap(@click="toggleMaskMA")
                            img(v-show="isMaskMA", src="../assets/umbrella.png")
                            img(v-show="!isMaskMA", src="../assets/si-glyph-umbrella-close.png")
                        span.img-wrap(@click="hideWinMA")
                            img(src="../assets/close.png")
                    .seanway-content-container
                        transition(
                            name="animate-flipY",
                            mode="out-in",
                            enter-active-class="animated flipInY",
                            leave-active-class="animated flipOutY")
                            keep-alive
                                component(
                                    :is="curSubWinMA")
</template>

<style lang="scss">
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
	#seanway-window {
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