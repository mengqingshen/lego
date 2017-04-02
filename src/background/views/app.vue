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
                    chrome.tabs.executeScript(null, {
                        file: 'common/common.js'
                    })
                    chrome.tabs.executeScript(null, {
                        file: 'content-script/index.js'
                    })
                    chrome.tabs.insertCSS(null, {
                        file: 'content-css/crawl.css'
                    })
                }
            })
        }
    }
</script>