/*
* @fileoverview 收藏列表
* @author sean(eli01linux@aliyun.com)
*/

<script>
    import {
        mapActions,
        mapGetters
    } from 'vuex'

    export default {
        data () {
            return {
                cssSelectorText: ''
            }
        },
        components: {
            'search-input': (resolve, reject) => {
                resolve(require('./search-input'))
            }
        },
        computed: {
            ...mapGetters([
                'isExpanded',
                'selectorsHistory',
                'selectorsCollection'
            ]),
            hisList () {
                const collections = new Map(this.selectorsCollection)
                return this.selectorsHistory.map((selector, index) => {
                    const newSelector = Object.assign({}, selector, { isCollected: false, id: index })

                    let temp = collections.get(selector.hostname)
                    if (temp) {
                        temp = new Set(temp)
                        if (temp.has(selector.cssSelector)) {
                            newSelector.isCollected = true
                        }
                    }
                    
                    return newSelector
                })
            }
        },
        methods: {
            ...mapActions([
                'starOrNot',
                'triggerCrawl',
				'handleArrowClicked',
                'handHisClicked'
			])
        }
    }
</script>

<template lang="pug">
    #panel-search
        .top-area
            .header
                .logo 爬取网页图片
                ul.tools.clearfix
                    li
                        span.iconfont-wrap
                            i(:class="[isExpanded ? 'el-icon-arrow-up' : 'el-icon-arrow-down']", @click="handleArrowClicked")
                    li
                        span.iconfont-wrap
                            i.el-icon-time(@click.stop.prevent="handHisClicked")
            search-input
        .his-list-content.list-area(v-if="isExpanded")
            .his-label 历史记录
            ul.list-wrap-selectors
                li(v-for="selector of hisList", @click="triggerCrawl(selector.cssSelector)")
                    p {{selector.cssSelector}}
                    span.iconfont-wrap
                        i(:key="selector.id", @click.stop="starOrNot(selector, $event)", v-bind:class="[selector.isCollected ? 'el-icon-star-on' : 'el-icon-star-off']")
</template>

<style lang="sass" scoped>
    @import "../../../common/style/modules/_element-colors";
    .header {
        overflow: hidden;
        line-height: 40px;
        font-size: 14px;
        .logo {
            float: left;
            color: $color-gray;
            user-select: none;
        }
        .tools {
            float: right;
            color: $color-gray;
            li {
                float: left;
                margin-left: 15px;
            }
        }
    }
    .top-area {
        .el-input {
            margin-top: 5px;
            user-select: none;
        }
    }
    .his-list-content {
        height: 100%;
        padding: 5px;
        .his-label {
            font-size: 14px;
            color: $color-light-gray;
            line-height: 40px;
        }
        .list-wrap-selectors {
            color: $color-gray;
            li {
                position: relative;
                user-select: none;
                cursor: pointer;
                padding: 0;
                margin-bottom: 20px;
                transition: all .4s ease;
                &:hover {
                    transform: translateY(-3px);
                }
                p {
                    width: 80%;
                    padding: 0;
                    margin: 0;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    font-size: 14px;
                    overflow: hidden;
                    &:nth-child(2) {
                        font-size: 10px;
                        margin: 5px 0;
                    }
                }
                .iconfont-wrap {
                    position: absolute;
                    top:50%;
                    right: 10px;
                    transform: translateY(-50%);
                    transition: 1s filter;
                    &:hover {
                        filter: drop-shadow(0px 3px 2px rgba(0, 0, 0, 1));
                    }
                }
            }
        }
    }
</style>
