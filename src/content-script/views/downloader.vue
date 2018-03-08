
<script>
  import extension from '../../api/chrome-extension'
  export default {
    components: {
      'extension-iframe': (resolve, reject) => {
        resolve(require('../components/extension-iframe'))
      }
    },
    computed: {
      src: () => extension.generateURL('pages/downloader/index.html')
    }
  }
</script>

<template lang="pug">
  extension-iframe(:src="src")
</template>
