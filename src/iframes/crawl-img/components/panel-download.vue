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
        beforeDestore() {
            if(this.listScroll) {
                this.listScroll.destroy()
                this.listScroll = null
            }
        },
        mounted() {
            this.initIScroll()
        },
        watch: {
            // 如果列表长度发生变化就更新 IScroll
            imgUrls(value, oldValue) {
                if(value.length !== oldValue.length) {
                    if(this.listScroll) {
                        Vue.nextTick(() => {    
                            this.listScroll.refresh()
                        })
                    }
                }
            }
        },
        computed: {
            checkedImgUrls: {
                get () {
                    return this.$store.state.crawl.imgs.filter(([key, value]) => value.checked && !value.downloaded).map(([key, value]) => key)
                },
                set (newValue) {
                    this.$store.commit(types.CHANGE_CHECKEDIMGS, newValue)
                }
            },
            ...mapState({
                imgUrls: state => state.crawl.imgs.filter(([key, value]) => !value.downloaded).map(([src, { w, h }]) => {
                    const height = ~~(h / w * state.crawl.imgWidth) + 'px'
                    return {
                        src,
                        style: {
                            height,
                            "line-height": height,
                            "background-image": `url(${src})`
                        }
                    }
                })
            }),
            ...mapGetters([
                'isIndeterminate',
                'checkAll'
            ])
        },
        methods: {
            initIScroll() {
                this.listScroll = new IScroll('.scroll-wrapper', {
                    mouseWheel: true,
                    bounce: true,
                    scrollbars: true,
                    fadeScrollbars: true
                })
            },
            ...mapActions([
                'handleDownloadClicked',
                'back',
                'handleCheckAllChange',
                'handleCheckedImgsChange'
            ])
        }
    }
</script>

<template lang="pug">
    #panel-download
        .top-area
            .header
                i.el-icon-arrow-left.icon-base(@click="back")
            .btn-wrap
                el-button(type="primary", icon="download" @click.stop="handleDownloadClicked") 下载({{checkedImgUrls.length}}/{{imgUrls.length}})
                    i.iconfont.icon-icondownload.icon-base
                    
        .tool-bar
            el-checkbox(:indeterminate="isIndeterminate", v-model="checkAll", @change="handleCheckAllChange")
            i(:class="[is]")
        .scroll-wrapper
            .list-area
                el-checkbox-group(v-model="checkedImgUrls")
                    el-checkbox(v-for="obj in imgUrls", :label="obj.src", class="img-wrap")
                        div.img-wrap(:style="obj.style")
        iframe#hidden-iframe(style="display: none")
</template>

<style lang="sass">
    @import "../style/common";
    #panel-download {
        position: relative;
        color: $color-light-gray;
        .el-checkbox-group {
            .el-checkbox__input {
                position: absolute;
                z-index: 10;
                left: 0;
                top: 0;
            }
            .el-checkbox__label {
                font-size: 0;
            }
            .el-checkbox__inner {
                background-color: transparent;
                border: none;
            }
        }
        .img-wrap {
            transition: .2s background-size ease;
            box-shadow: 0 0 34px rgba(0, 0, 0, .9) inset;
            background-position: center;
            &:hover {
                background-size: 90% 90%;
            }
        }
        .el-checkbox__label {
            padding: 0;
        }
    }
</style>

<style lang="sass" scoped> 
    .top-area {
        .el-icon-arrow-left {
            cursor: pointer;
        }
        .el-button {
            width: 100%;
        }
        .header {
            line-height: 30px;
        }
    }
    .tool-bar {
        line-height: 39px;
        position: absolute;
        bottom: 0;
        left: 0;
        background-color: rgba(50, 64, 87, .5);
        right: 0;
        z-index: 3;
    }
    
    .list-area {
        .img-wrap {
            display: inline-block;
            box-sizing: border-box;
            padding: 0;
            width: 100%;
            font-size: 0;
            margin: 0;
            background-repeat: no-repeat;
            background-clip: border-box;
            background-size: 100% 100%;
            background-color: transparent;
            background-attachment: scroll;
            &::before {
                font-family: 'iconfont';
                content: "\E6A8";
                display: block;
                box-sizing: border-box;
                position: absolute;
                z-index: -1;
                left: 0;
                font-size: 50px;
                text-align: center;
                width: 100%;
                height: calc(100%);
                background: #666;
            }
            &::hover {
                box-shadow: 0 0 34px rgba(0, 0, 0, .9) inset;
            }
        }
    }
</style>
