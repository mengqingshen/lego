<template lang="pug">
    #window-for-crawl
        panelSearch
        
</template>

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

    #window-for-crawl {
        height: 100%;
    }
</style>

<script>
    export default{
        data(){
            return{

            }
        },
        components:{
            panelSearch: (resolve, reject) => {
                resolve(require('../components/panel-search'))
            }
        }
    }
</script>
