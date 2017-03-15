/*
* @fileoverview 收藏列表
* @author sean(eli01linux@aliyun.com)
*/


<script>
    import Vue from 'vue'
    import {
        mapState,
        mapGetters,
        mapActions
    } from 'vuex'

    import * as types from '../store/mutation-types'
    import IScroll from 'iscroll'
    export default {
        beforeDestore () {
            if(this.listScroll) {
                this.listScroll.destroy()
                this.listScroll = null
            }
        },
        mounted () {
            this.initIScroll()
        },
        watch: {
            // 如果列表长度发生变化就更新 IScroll
            imgUris (value, oldValue) {
                if(value.length !== oldValue.length) {
                    if(this.listScroll) {
                        Vue.nextTick(() => {    
                            this.listScroll.refresh()
                        })
                    }
                    else {
                        this.initIScroll()
                    }
                }
            }
        },
        computed: {
            ...mapGetters([
                'isPreviewDownload',
                'isGrid',
                'checkAll',
                'checkAllOff',
                'checkSome',
                'imgWidth',
                'imgUris',
                'checkedCount'
            ])
        },
        methods: {
            handlePicClicked () {

            },
            initIScroll() {
                if (!this.listScroll) {
                    this.listScroll = new IScroll('.scroll-wrapper', {
                        mouseWheel: true,
                        bounce: true,
                        scrollbars: true,
                        fadeScrollbars: true
                    })
                }
            },
            ...mapActions([
                'handleCheck',
                'handleClickPreviewType',
                'handleCheckedMass',
                'handlePreviewClicked',
                'handleDownloadClicked',
                'back'
            ])
        }
    }
</script>

<template lang="pug">
    #panel-download
        .top-area
            .header
                span.iconfont-wrap
                    i.el-icon-arrow-left.icon-base(@click="back")
                .btn-wrap
                    el-button(icon="download", size="small", @click.stop="handleDownloadClicked") 下载({{checkedCount}}/{{imgUris.length}})
                        i.iconfont.icon-icondownload.icon-base
                span.iconfont-wrap
                    i.iconfont(:class="[isPreviewDownload ? 'icon-eye' : 'icon-hide']", @click="handlePreviewClicked")
            .tool-bar(v-show="isPreviewDownload")
                span.iconfont-wrap
                    i.iconfont(:class="{ 'icon-quanxuan': checkAll, 'icon-qudiaoquanxuan': checkAllOff, 'icon-qudiaoquanxuan1': checkSome}", @click="handleCheckedMass")
                span.iconfont-wrap
                    i.iconfont(:class="[isGrid ? 'icon-viewgrid' : 'icon-viewlist']", @click="handleClickPreviewType")
        .scroll-wrapper(v-show="isPreviewDownload")
            .list-area(v-if="imgUris.length > 0")
                .box-wrap(v-for="img in imgUris", @click="handleCheck(img.uri)")
                    .box
                        .checked-tag
                            i.iconfont.icon-selected(v-if="img.checked")
                        .pic(:style="img.size")
                            img(:src="img.uri")
                        strong(:style="{ width: imgWidth + 'px' }") {{img.picName}}
                        strong(:style="{ width: imgWidth + 'px' }") {{img.w + ' x ' + img.h}}
            .empty-list-view(v-if="imgUris.length === 0")
                i.iconfont.icon-empty
                    
        iframe#hidden-iframe(style="display: none")
</template>

<style lang="sass">
    @import "../style/common";
    #panel-download {
        position: relative;
        color: $color-light-gray;
    }
</style>

<style lang="sass" scoped> 
    @import "../style/common";
    .empty-list-view {
        width: 60px;
        height: 60px;
        border-radius: 30px;
        border: 1px solid transparent;
        background-color: $color-dark-white;
        margin: 30px auto;
        line-height: 60px;
        text-align: center;
        .iconfont {
            font-size: 30px;
        }
    }
    .btn-wrap {
        display: inline-block;
        width: 65%;
        margin: 0 5px;
    }
    .top-area {
        padding-bottom: 0;
        .el-icon-arrow-left {
            cursor: pointer;
        }
        .el-button {
            width: 100%;
        }
    }
    .tool-bar {
        text-align: center;
        .iconfont-wrap {
            margin: 5px;
        }
    }
    
    .list-area {
        column-count: 2;
        column-gap: 5px;
        padding: 5px;
        .box {
            position: relative;
            backface-visibility: hidden;
            transition: all .4s ease;
            display: inline-block;
            padding: 5px 5px 0;
            border: 1px solid #ccc;
            box-sizing: content-box;
            background-color: #fff;
            margin-bottom: 5px;
            cursor: pointer;
            &:hover,
            &:focus,
            &:active {
                transform: translateY(-5px);
                background-color: $color-black;
                * {
                    color: $color-dark-white;
                }
                img {
                    transform: scale(1.02) rotate(3deg);
                }
                &:before {
                    opacity: 1;
                    transform: translateY(3px);
                }
                .checked-tag {
                    i {
                        color: $color-dark-white;
                    }
                }
            }
            &:before {
                pointer-events: none;
                position: absolute;
                z-index: -1;
                content: '';
                top: 100%;left: 5%;
                height: 5px;
                width: 90%;
                opacity: 0;
                background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0) 80%);
                transition-duration: .3s;
                transition-property: transform, opacity;
            }
            .checked-tag {
                position: absolute;
                right: -2px;
                bottom: -6px;
                i {
                    font-size: 20px;
                    color: $color-black;
                }
            }
            .pic {
                position: relative;
                img {
                    width: 100%;
                    height: 100%;
                    margin: 0 auto 5px;
                    backface-visibility: hidden;
                    transition: all .4s ease;
                    &:before {
                        content: '\e6db';
                        display: block;
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        top: 0;
                        left: 0;
                        color: #333;
                        background-color: #fff;
                        text-align: center;
                        font-family: "iconfont" !important;
                        font-size: 30px;
                        font-style: normal;
                        -webkit-font-smoothing: antialiased;
                        -moz-osx-font-smoothing: grayscale;
                    }
                }
            }
            strong {
                display: inline-block;
                color: #333;
                white-space: nowrap;
                overflow: hidden;
                font-size: 10px;
                line-height: 1.5;
                text-overflow: ellipsis;
                font-weight: normal;
            }
        }
    }
</style>
