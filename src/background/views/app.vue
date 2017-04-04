<template lang="pug">
    div 待开发
</template>

<style lang="sass">
    
</style>

<script>
    import extension from '../../api/chrome-extension'
    export default {
        created () {
            extension.on({
                'create-window': (subWinName) => {
                    extension.insertCSS('content-css/common.css')
                    extension.insertScriptToCurrentTab('common/common.js')
                    extension.insertScriptToCurrentTab('content-script/index.js').then(() => {
                        extension.emitToCurrentTab('show-sub-window', subWinName)
                    })
                }
            })
        }
    }
</script>