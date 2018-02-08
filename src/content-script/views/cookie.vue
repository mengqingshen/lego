/**
 * Created by mengqingshen on 2018/02/07
 * 负责配合 cookie 搬运工进行“卧底”工作
 */
<script>
  import extension from '../../api/chrome-extension'
  export default {
    name: 'cookie',
    components: {
      'extension-iframe': (resolve, reject) => {
        resolve(require('../components/extension-iframe'))
      }
    },
    computed: {
      src: () => extension.generateURL('pages/cookie/index.html')
    }
  }
</script>

<template lang="pug">
  extension-iframe(:src="src")
</template>
