
<script>
    /*
    * @fileoverview 收藏列表
    * @author sean(eli01linux@aliyun.com)
    */

    import * as types from '../store/mutation-types'
    import {
        mapGetters,
        mapActions
    } from 'vuex'
    export default {
        computed: {
            ...mapGetters(
                [
                    'selectorsCollection',
                    'selectorsRecommanded'
                ]
            )
        },
        methods: {
            ...mapActions([
                'back',
                'removeCollection',
                'triggerCrawl',
                'removeAllCollection'
            ])
        }
    }
</script>

<template lang="pug">
    #panel-collection
        .header
            span.iconfont-wrap
                i.el-icon-arrow-left.icon-base(@click="back")
            span.title 收藏
            span.iconfont-wrap
                i.el-icon-delete(@click="removeAllCollection")
        dl
            div(v-for="sels of selectorsCollection")
                dt {{sels[0]}}
                dd(v-for="sel of sels[1]" @click="triggerCrawl(sel)")
                    div {{sel}}
                    span.iconfont-wrap
                        i.el-icon-delete(@click.stop="removeCollection({hostname: sels[0], cssSelector: sel})")
</template>

<style lang="sass">
@import "../../../common/style/modules/_element-colors";
#panel-collection {
    background-color: $color-black;
    color: $color-light-gray;
    .header {
        font-size: 13px;
        padding-top: 12px;
        .title {
            display: inline-block;
        }
        .iconfont-wrap:last-child {
            float: right;
        }
    }
    dl {
        margin: 0;
        padding: 0 5px 25px;
        margin-left: 25px;
    }
    dt {
        color: $color-silver;
        line-height: 30px;
        font-size: 13px;
        position: sticky;
    }
    dd {
        font-size: 13px;
        margin: 0;
        line-height: 30px;
        position: relative;
        div {
            color: $color-gray;
            width: 81%;
            overflow: hidden;
            line-height: 2;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .iconfont-wrap {
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            margin: auto;
        }
    }
    .el-tabs__item.is-active {
        color: $color-gray;
    }
    .el-tabs__item:hover {
        color: $color-silver;
    }
    .el-tabs__active-bar {
        background-color: $color-gray;
    }
    .el-tabs__header {
        border: none;
    }
}

</style>