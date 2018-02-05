
<script>
  import {
    crawler
  } from '../../pages/downloader/api/crawl'
  import extension from '../../api/chrome-extension'
  export default {
    components: {
      'extension-iframe': (resolve, reject) => {
        resolve(require('../components/extension-iframe'))
      }
    },
    computed: {
      src: () => extension.generateURL('pages/downloader/index.html')
    },
    created () {
      extension.on({
        'fire-crawl': data => {
          return crawler.getImgUrlsByCSSSelector(data.cssSelector)
        }
      }, 'script-downloader')
    }
  }
</script>

<template lang="pug">
  extension-iframe(:src="src")
</template>
