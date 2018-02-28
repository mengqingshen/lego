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
      this.boot()
    },
    data () {
      return {
        menuVisible: false
      }
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
      ...mapState(['origin', 'map']),
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
      ...mapActions(['init', 'clear']),
      previewMapByConsole () {
        console.table(this.map)
      },
      toggleMenu () {
        this.menuVisible = !this.menuVisible
      },
      reset () {
        this.clear()
        this.$nextTick(function () {
          setTimeout(() => {
            this.boot()
          }, 500)
        })
      },
      boot () {
        this.init().then((data) => {
          console.log('data', data)
          if (data && data[1]) {
            const url = data[0]
            const map = data[1]
            const urlObj = new URL(url)
            if (url && map) {
              // 是否是被模拟者
              if (map.some((originItem) => {
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
      }
    }
  }
</script>

<template lang="pug">
  div#cookie
    md-app
      md-app-toolbar
        md-button.md-icon-button(
          @click="toggleMenu",
          v-if="!menuVisible")
          md-icon menu
        h3(
          class="md-title" style="flex: 1") cookie 搬运工
      md-app-drawer(
        :md-active.sync="menuVisible")
        md-toolbar.md-transparent(md-elevation="0")
          span 开发调试
          .md-toolbar-section-end
            md-button.md-icon-button.md-dense(@click="toggleMenu")
              md-icon keyboard_arrow_left
        md-list
          md-list-item
            md-button(@click="previewMapByConsole")
              md-icon find_in_page
              span 打印名单
          md-list-item
            md-button(@click="reset")
              md-icon undo
              span 复原
      md-app-content
        md-content
          router-view
</template>

<style lang="scss">
  #cookie {
    width: 400px;
    background-color: #fafafa;
  }
</style>
