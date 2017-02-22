
<template lang="pug">
    #window-for-crawl
        panelSearch
        
</template>

<style lang="sass">
    @import url('../styles/common.scss');
    body {
        width: 300px;
        margin: 0 auto;
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
