/**
 * Created by mengqingshen on 2017/4/1.
 */
<script>
    import {
        mapGetters
    } from 'vuex'
    import $ from 'expose-loader?$!jquery'
    import '../../../lib/jquery.ba-resize'
    import extension from '../../../api/chrome-extension'
    export default {
        mounted () {
            $('#window-for-crawl').resize(e => {
                this.fireResize()
            }).resize()
        },
        computed: {
            ...mapGetters(['currentPanel'])
        },
        components:{
            search: (resolve, reject) => {
                resolve(require('../components/panel-search'))
            },
            collection: (resolve, reject) => {
                resolve(require('../components/panel-collection'))
            },
            download: (resolve, reject) => {
                resolve(require('../components/panel-download'))
            }
        },
        methods: {
            fireResize (e) {
                extension.emitToCurrentTab('resize', {
                    size: {
                        width: $('#window-for-crawl').width() + 'px',
                        height: $('#window-for-crawl').height() + 'px'
                    }
                })
            }
        }
    }
</script>

<template lang="pug">
    #window-for-crawl
        transition(name="panel-switch" mode="out-in")
            keep-alive
                component(v-bind:is="currentPanel")

</template>

<style lang="sass">
    @import "../../../common/style/modules/_element-colors";
    body {
        margin: 0;
        padding: 0;
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        margin: 0 auto;
    }
    i {
        cursor: pointer;
    }

    ul,li {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    #window-for-crawl {
        position: relative;
        width: 220px;
        background: $color-black;
        border-radius: 5px;
        overflow: hidden;
        .icon-base {
            font-size: 16px;
            padding: 0 3px;
        }
        .top-area {
            position: relative;
            padding: 5px;
        }
        .scroll-wrapper {
            position: relative;
            max-height: 400px;
            overflow: hidden;
            background: #E5E9F2;
        }
    }
</style>
