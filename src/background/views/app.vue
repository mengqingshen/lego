<template lang="pug">
    div 待开发
</template>

<style lang="scss">
    
</style>

<script>
    import extension from '../../api/chrome-extension'
    export default {
        created () {
            extension.on({
                'create-window': subWinName => {
                    extension.insertCSS('content-css/common.css')
                    extension.insertScriptToCurrentTab('common/common.js')
                    return extension.insertScriptToCurrentTab('content-script/index.js').then(() => {
                        return extension.emitToCurrentTab('show-sub-window', subWinName)
                    })
                }
            })
        }
    }
</script>