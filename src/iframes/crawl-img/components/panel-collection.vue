
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
        methods: {
            handleTabClicked(tab, event) {
            }
        },
        computed: {
            ...mapActions(
                [
                    'back'
                ]
            ),
            ...mapGetters(
                [
                    'selectorsCollection',
                    'selectorsRecommanded'
                ]
            ),
            activeTabName: {
                get () {
                    return this.$store.state.crawl.activeTabName
                },
                set () {}
            }
        }
    }
</script>

<template lang="pug">
    #panel-collection
        .header
            i.el-icon-arrow-left.icon-base(@click.stop.prevent="back")
        .tabs
            el-tabs(v-model="activeTabName", @tab-click="handleTabClicked")
                el-tab-pane(label="收藏", name="collected")
                    dl
                        div(v-for="sels of selectorsCollection")
                            dt {{sels[0]}}
                            dd(v-for="sel in sels[1]")  {{sel}}
                el-tab-pane(label="推荐", name="recommand")
                    dl
                        div(v-for="sels of selectorsRecommanded")
                            dt {{sels[0]}}
                            dd(v-for="sel in sels[1]")  {{sel}}
                
</template>

<style lang="sass">
@import "../style/common";
#panel-collection {
    background-color: $color-black;
    color: $color-light-gray;
    .header {
        padding-top: 12px;
    }
    dl {
        margin: 0;
        padding: 0 5px 25px;
        color: $color-light-gray;
        margin-left: 10px;
    }
    dt {
        line-height: 30px;
        font-size: 14px;
        position: sticky;
        border-bottom: 1px solid $color-silver;
    }
    dd {
        font-size: 12px;
        margin: 0;
        line-height: 30px;
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
}

</style>