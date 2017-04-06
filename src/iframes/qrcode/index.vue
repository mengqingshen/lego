<script>
  import $ from 'jquery'
  import QRCode from 'qrcode'
  import {
    fireResize
  } from '../../api/utils'

  export default {
    mounted () {
      const text = location.href
      QRCode.toCanvas(this.$refs.qrcode, text, error => {
        if (error) {
          throw new Error(error.message)
        }
        const $win = $('#ca-qrcode-container')
        fireResize({
          w: $win.width() + 'px',
          h: $win.height() + 'px'
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
