
<script>
    import {
        mapGetters
    } from 'vuex'
    export default {
        mounted () {
            window.onresize = function (e) {
                console.log(e)
            }
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
            handleResize (e) {
                console.log('resize')
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
    @import "../style/common";
    body {
        margin: 0;
        padding: 0;
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        width: 250px;
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
        background: $color-light-black;
        .icon-base {
            font-size: 16px;
            padding: 0 3px;
        }
        .top-area {
            position: relative;
            padding: 5px;
            top: 0;
            left: 0;
            right: 0;
            background: $color-black;
            z-index: 11;
            box-shadow: 0px 3px 20px $color-black;
        }
        .scroll-wrapper {
            position: relative;
            max-height: 400px;
            overflow: hidden;
            background: #E5E9F2;
        }
    }
</style>
