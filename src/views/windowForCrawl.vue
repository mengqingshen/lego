
<template lang="pug">
    #window-for-crawl
        panelSearch
        
</template>

<style lang="sass">
    @import url('../styles/common.scss');
    body {
        width: 250px;
        height: 450px;
        margin: 0 auto;
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
                resolve(require('../components/windowForCrawl/panelSearch'))
            }
        }
    }
</script>
