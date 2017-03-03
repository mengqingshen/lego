<template lang="pug">
    #window-for-crawl
        transition(name="panel-switch" mode="out-in")
            keet-alive
                component(v-bind:is="currentPanel")

</template>

<style lang="sass">
    body {
        margin: 0;
        padding: 0;
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        width: 250px;
        margin: 0 auto;
    }

    ul,li {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    #window-for-crawl {
        position: relative;
        max-height: 600px;
        overflow: scroll;
        &::-webkit-scrollbar {
            display:none
        }
        .icon-base {
            font-size: 16px;
            padding: 0 3px;
        }
        .top-area {
            position: -webkit-sticky;
            position: sticky;
            top: 0;
            left: 0;
            right: 0;
            background: #f9fafc;
            z-index: 2;
            box-shadow: 0px 3px 20px #1f2d3d;
            padding: 10px;
        }
    }
</style>

<script>
    import { mapGetters } from 'vuex'
    export default{
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
        }
    }
</script>
