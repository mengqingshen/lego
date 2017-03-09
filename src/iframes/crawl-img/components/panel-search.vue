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
                .logo Image Crawler
                ul.tools.clearfix
                    li
                        i(:class="[isExpanded ? 'el-icon-arrow-up' : 'el-icon-arrow-down']", @click="handleArrowClicked")
                    li
                        i.el-icon-time(@click.stop.prevent="handHisClicked")
            el-input(placeholder="输入 css 选择器，比如: img", icon="search")
        .his-list-content.list-area(v-if="isExpanded")
            .his-label 历史记录
            ul.list-wrap-selectors
                li(v-for="selector of hisList" @click="triggerCrawl(selector.cssSelector, $event)")
                    p {{selector.cssSelector}}
                    p {{selector.hostname}}
                    i(:key="selector.id" @click.stop="starOrNot(selector, $event)" v-bind:class="[selector.isCollected ? 'el-icon-star-on' : 'el-icon-star-off']")
</template>

<style lang="sass" scoped>
    @import "../style/common";
    .header {
        line-height: 40px;
        font-size: 18px;
        .logo {
            float: left;
            color: $color-white;
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
            text-align: center;
        }
        .list-wrap-selectors {
            color: $color-silver;
            li {
                background: $color-black;
                border-radius: 3px;
                padding: 5px;
                position: relative;
                overflow: hidden;
                user-select: none;
                cursor: pointer;
                padding: 16px;
                margin-bottom: 5px;
                &:active {
                    box-shadow: 3px -2px 3px $color-gray;
                }
                p {
                    padding: 0;
                    margin: 0;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    font-size: 12px;
                    overflow: hidden;
                    &:nth-child(2) {
                    font-size: 10px;
                    margin: 5px 0;
                    }
                }
                i {
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
