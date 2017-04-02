<template lang="pug">
    div 内容待定
</template>

<style lang="sass">
    
</style>

<script>
    import extension from '../../api/chrome-extension'
    export default {
        created () {
            extension.on({
                'create-craw-window': () => {
                    extension.insertScriptToCurrentTab('common/common.js')
                    extension.insertCSS('content-script/index.js')
                    extension.insertCSS('content-css/crawl.css')
                }
            })
        }
    }
</script>