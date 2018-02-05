<script>
  import $ from 'jquery'
  import QRCode from 'qrcode'
  import extension from '../../api/chrome-extension'
  import {
    fireResize
  } from '../../api/utils'

  export default {
    mounted () {
      extension.emitToCurrentTab('get-href').then((href) => {
        console.log('get-window', href)
        if (!href) return
        QRCode.toCanvas(this.$refs.qrcode, href, error => {
          if (error) {
            throw new Error(error.message)
          }
          const $win = $('#ca-qrcode-container')
          fireResize({
            w: $win.width() + 'px',
            h: $win.height() + 'px'
          })
        })
      })
    }
  }
</script>

<template lang="pug">
  canvas#ca-qrcode-container(ref="qrcode")
</template>

<style>
#ca-qrcode-container {
  width: 200px;
  height: 200px;
}
</style>
