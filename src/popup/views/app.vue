<template lang="pug">
    #app
        el-menu(mode="vertical")
            el-menu-item-group(title="爬虫")
                el-menu-item(index="1")
                    div(@click="showCrawlWindow")
                        i.el-icon-picture
                        span 图片爬取工具

</template>

<script>
import logo from '../../assets/logo.png';
export default {
    methods: {
        showCrawlWindow () {
            chrome.extension.sendRequest(null, {
                command: 'showCrawlWindow'
            })
        }
    }
}
</script>

<style lang="sass">
    body {
        margin: 0;
        padding: 0;
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        width: 250px;
        height: 450px;
        margin: 0 auto;
    }

    ul,li {
        list-style: none;
        padding: 0;
        margin: 0;
    }
</style>
