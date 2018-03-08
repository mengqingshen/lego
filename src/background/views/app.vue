<template lang="pug">
  div 待开发
</template>

<style lang="scss">
  
</style>

<script>
  import extension from '../../api/chrome-extension'
  export default {
    state: {
      currentApp: null,
      mode: 'normal'
    },
    created () {
      extension.on({
        'create-window': subWinName => {
          extension.insertCSS('content-css/common.css')
          extension.insertScriptToCurrentTab('common/common.js')
          return extension.insertScriptToCurrentTab('content-script/index.js').then(() => {
            return extension.emitToCurrentTab('show-sub-window', subWinName)
          })
        },
        'get-current-app': () => this.currentApp,
        'set-current-app': (app) => {
          this.currentApp = app
        },
        'get-mode': () => this.mode,
        'set-mode': mode => { this.mode = mode }
      }, 'background')
    }
  }
</script>
