<script>
  import {
    mapState,
    mapGetters,
    mapActions
  } from 'vuex'

  import 'animate.css'

  import extension from '../../api/chrome-extension'

  export default {
    created () {
      extension.emitToExtension('get-current-app').then(curSubWinName => {
        console.log('curSubWinName', curSubWinName)
        if (curSubWinName) this.openSubWin(curSubWinName)
      })
    },
    computed: {
      ...mapState(['curSubWinName']),
      ...mapGetters([
        'subWins'
      ]),
      curWinComponent () {
        return this.subWinComponents[this.subWins.findIndex(({ name }) => name === this.curSubWinName)]
      },
      subWinComponents () {
        return this.subWins.map(({ name }) => ({
          name,
          data () {
            return {
              name
            }
          },
          computed: {
            url () {
              return extension.generateURL(`pages/${this.name}/index.html`)
            }
          },
          render (createElement) {
            return createElement('iframe', {
              attrs: {
                src: this.url,
                frameborder: '0',
                seamless: 'seamless',
                scrolling: 'no',
                style: {
                  width: '375px',
                  height: '375px'
                }
              }
            })
          }
        }))
      }
    },
    methods: {
      ...mapActions(['openSubWin'])
    }
  }
</script>

<template lang="pug">
  #app
    .md-layout.md-alignment-center-center
      .md-layout-item.md-gutter.md-size-20(
        :key="subWin.name",
        :class="{'disabled': subWin.isDisabled}",
        v-for="subWin in subWins",
        @click="openSubWin(subWin.name)")
        md-button.md-icon-button
          md-icon(:md-src="'../../assets/svg/' + subWin.icon + '.svg'")
          md-tooltip {{subWin.desc}}
      transition(
        name="animate-flipY",
        mode="out-in",
        exter-active-class="animated flipInY",
        leave-active-class="animated flipOutY")
        keep-alive
          component(:is="curWinComponent")
</template>

<style lang="scss">
  body {
    margin: auto;
    width: 375px;
    max-height: 812px;
    min-height: 375px;
  }
</style>
