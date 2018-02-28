<script>
  import {
    mapState,
    mapActions
  } from 'vuex'
  import {
    fireResize
  } from '../../api/utils'
  import $ from 'jquery'
  import '../../lib/jquery.ba-resize'

  import ChooseRole from './views/choose-role'

  export default {
    components: {
      ChooseRole
    },
    created () {
      this.init().then((data) => {
        if (data && data[1]) {
          const url = data[0]
          const map = data[1]
          console.log(url, map)
          const urlObj = new URL(url)
          if (url && map) {
            // 是否是被模拟者
            if (map.some((originItem) => {
              console.log(originItem.url, urlObj.origin)
              return originItem.url === urlObj.origin
            })) {
              return this.$router.push({ name: 'origin' })
            }
            // 是否是模拟者
            if (map.some((originItem) => {
              return originItem && originItem.cheaterList && originItem.cheaterList.find(({ origin }) => {
                console.log(origin, urlObj.origin)
                return origin === urlObj.origin
              })
            })) {
              return this.$router.push({ name: 'cheater' })
            }
          }
        }
        // 都不是
        this.$router.push({ name: 'choose-role' })
      })
    },
    mounted () {
      const $win = $('#cookie')
      $win.resize(e => {
        fireResize({
          w: $win.width() + 'px',
          h: $win.height() + 'px'
        })
      }).resize()
    },
    computed: {
      ...mapState(['origin']),
      pageTitle () {
        return (this.$router.meta || {}).pageTitle || ''
      }
    },
    watch: {
      pageTitle (val) {
        document.title = val
      }
    },
    methods: {
      ...mapState(['map']),
      ...mapActions(['init'])
    }
  }
</script>

<template lang="pug">
  div#cookie
    md-toolbar(class="md-primary")
      h3(
        class="md-title" style="flex: 1") cookie 搬运工
    md-content.md-scrollbar
      router-view
</template>

<style lang="scss">
  #cookie {
    width: 400px;
    background-color: #fafafa;
    .md-content {
      max-height: 500px;
      overflow: auto;
      padding: 16px;
    }
  }
</style>
