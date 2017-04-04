/*
* @fileoverview 下载列表
* @author sean(eli01linux@aliyun.com)
*/

<script>
    import Vue from 'vue'
    import {
        mapState,
        mapGetters,
        mapActions
    } from 'vuex'
    import IScroll from 'iscroll'
    import Velocity from 'velocity-animate'
    import "animate.css"

    import * as types from '../store/mutation-types'
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
            isGrid (value) {
                this.refreshIScroll()
            },

            // 如果列表长度发生变化就更新 IScroll
            imgUris (value, oldValue) {
                if(value.length !== oldValue.length) {
                    this.refreshIScroll()
                }
            }
        },
        computed: {
            showCount() {
                return this.imgUris.filter(({ hide }) => !hide).length
            },
            queryStringOfDownloads: {
                get () {
                    return this.$store.getters.queryStringOfDownloads
                },
                set (queryString) {
                    if ('' === queryString) {
                        this.$store.commit(types.SHOW_ALL_DOWNLOAD)
                    }
                    else {
                        this.$store.commit(types.CHANGE_QUERY_OF_DOWNLOADS, queryString)
                    }
                }
            },
            columnCount () {
                return this.isGrid ? 2 : 1
            },
            ...mapGetters([
                'isDownloadSearchMode',
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
            refreshIScroll () {
                if(this.listScroll) {
                    Vue.nextTick(() => {    
                        this.listScroll.refresh()
                    })
                }
                else {
                    this.initIScroll()
                }
            },
            handlePicClicked () {},
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
                'handleTriggerSearchMode',
                'handleSearchWithinDownload',
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
                    el-button(
                        icon="download",
                        size="small",
                        @click.stop="handleDownloadClicked") 下载({{checkedCount}}/{{imgUris.length}})
                        i.iconfont.icon-icondownload.icon-base
                span.iconfont-wrap
                    i.iconfont(
                        :class="[isPreviewDownload ? 'icon-eye' : 'icon-hide']",
                        @click="handlePreviewClicked")
            transition(
                :key="isDownloadSearchMode ? 'search-mode' : 'normal-mode'",
                name="t-slide-fade")
                .tool-bar(
                    v-show="isPreviewDownload",
                    :class="{'m-search-mode-active': isDownloadSearchMode}")
                    span.iconfont-wrap
                        i.iconfont(
                            :class="{ 'icon-quanxuan': checkAll, 'icon-qudiaoquanxuan': checkAllOff, 'icon-qudiaoquanxuan1': checkSome}",
                            @click="handleCheckedMass")
                    span.iconfont-wrap
                        i.iconfont(:class="[isGrid ? 'icon-viewgrid' : 'icon-viewlist']", @click="handleClickPreviewType")
                    .search-within-download
                        span.iconfont-wrap
                            i.iconfont(class="icon-search", @click="handleTriggerSearchMode")
                        .search-within-download-bar(
                            v-if="isDownloadSearchMode")
                            input(
                                type="search",
                                v-model="queryStringOfDownloads",
                                @keyup.enter="handleSearchWithinDownload",
                                autofocus,
                                placeholder="输入正则进行匹配")
                            button.seanway-btn.seanway-btn-tiny(
                                @click="handleSearchWithinDownload") 查找
        transition(
            mode: 'out-in',
            enter-active-class="animated fadeIn",
            leave-active-class="animated fadeOut")
            .scroll-wrapper(v-show="isPreviewDownload")
                transition-group(
                    name="box",
                    tag="div",
                    class="list-area",
                    enter-active-class="animated flipInY",
                    leave-active-class="animated flipOutY",
                    v-if="imgUris.length > 0",
                    :style="{ columnCount: columnCount}")
                    .box-wrap(
                        :key="img.uri",
                        v-for="img in imgUris",
                        v-show="!img.hide",
                        @click="handleCheck(img.uri)")
                        .box
                            .checked-tag
                                i.iconfont.icon-selected(v-if="img.checked")
                            .pic(:style="img.size")
                                img(:src="img.uri")
                            strong(:style="{ width: imgWidth + 'px' }") {{img.picName}}
                            strong(:style="{ width: imgWidth + 'px' }") {{img.w + ' x ' + img.h}}
                .empty-list-view(v-if="imgUris.length === 0 || showCount === 0")
                    i.iconfont.icon-empty
        iframe#hidden-iframe(style="display: none")
</template>

<style lang="sass">
    @import "../../../common/style/modules/_element-colors";
    #panel-download {
        position: relative;
        color: $color-light-gray;
    }
</style>

<style lang="sass" scoped>
    @import "../../../common/style/modules/_element-colors";
    @import "../../../common/style/modules/_sizes";
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
        white-space: nowrap;
        margin-left: 45px;
        transition: margin-left .5s ease-in-out;
        &.m-search-mode-active {
            margin-left: $search-within-download-margin-left;
            > span {
                transform: scale(0);
            }
            .search-within-download > span {
                transform: scale(.7);
            }
        }
        .iconfont-wrap {
            transition: transform .5s ease-in-out;
            margin: 5px;
        }
        .search-within-download {
            display: inline-block;
            .search-within-download-bar {
                display: inline-block;
                input[type="search"] {
                    width: 120px;
                    color: $color-gray;
                    appearance: none;
                    border: none;
                    background: transparent;
                    border-bottom: 1px solid $color-gray;
                    outline: none;
                }
                button {
                    margin-left: 16px;
                }
            }
        }
    }
    
    .list-area {
        column-gap: 5px;
        padding: 5px;
        .box-move {
            transition: transform 1s;
        }
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
