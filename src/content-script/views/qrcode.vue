/**
 * Created by mengqingshen on 2017/4/2.
 * 二维码功能模块中负责和页面交互的部分
 */
<script>
  import extension from '../../api/chrome-extension'
  export default {
    components: {
      'extension-iframe': (resolve, reject) => {
        resolve(require('../components/extension-iframe'))
      }
    },
    computed: {
      src: () => extension.generateURL('iframes/qrcode/index.html')
    }
  }
</script>

<template lang="pug">
  extension-iframe(:src="src")
</template>
