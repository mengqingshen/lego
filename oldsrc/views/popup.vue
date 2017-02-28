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
import logo from '../assets/logo.png';
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
    @import url('../styles/common.scss');
    body {
        width: 200px;
    }
</style>
