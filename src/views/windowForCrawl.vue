
<template lang="pug">
    #window-for-crawl
        panelSearch
        
</template>

<style lang="sass">
    @import url('../styles/common.scss');
    body {
        width: 300px;
        margin: 0 auto;
        height: 540px;
    }
    #window-for-crawl {
        height: 100%;
        padding: 5px 16px;
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
                resolve(require('../components/windowForCrawl/panelSearch'))
            }
        }
    }
</script>
