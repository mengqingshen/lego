<script>
  import {
    mapState,
    mapActions,
mapGetters
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
        menuVisible: false,
        loading: true
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
      ...mapState(['map']),
      ...mapGetters(['origin']),
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
      goHome () {
        this.boot()
      },
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
          this.loading = false
          if (data) {
            const url = data[0]
            const map = data[1]
            if (url && map) {
              // 是否是被模拟者
              if (map.some((originItem) => {
                return originItem.url === this.origin
              })) {
                return this.$router.push({ name: 'origin' })
              }
              // 是否是模拟者
              if (map.some((originItem) => {
                return originItem && originItem.cheaterList && originItem.cheaterList.find(({ origin }) => {
                  console.log(origin, this.origin)
                  return origin === this.origin
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
      md-app-toolbar(class="md-primary")
        md-button.md-icon-button(
          @click="toggleMenu",
          v-if="!menuVisible")
          md-icon menu
        md-button.md-icon-button(
          @click="goHome")
          md-icon home
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
          .md-layout.md-alignment-center-center()
            .md-layout-item.md-size-100(:style="{ textAlign: 'center' }", v-if="loading")
              md-progress-spinner(
                :md-diameter="30",
                :md-stroke="3",
                md-mode="indeterminate")
          router-view
</template>

<style lang="scss">
  #cookie {
    width: 400px;
    background-color: #fafafa;
  }
</style>
