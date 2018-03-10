<script>
  import {
    mapState,
    mapGetters,
    mapActions,
    mapMutations
  } from 'vuex'

  import 'animate.css'

  import extension from '../../api/chrome-extension'
  import MdButtonMorph from '../components/md-button-morph/md-button-morph.vue'
  import MdButtonMorphTarget from '../components/md-button-morph/md-button-morph-target.vue'

  export default {
    components: {
      MdButtonMorph,
      MdButtonMorphTarget
    },
    data () {
      return {
        hover: false
      }
    },
    created () {
      extension.emitToExtension('get-current-app').then(curSubWinName => {
        this.openSubWin(curSubWinName)
      })
      extension.on({
        'resize': data => {
          this.setSize(data.size)
        }
      }, 'popup')
    },
    computed: {
      ...mapState(['curSubWinName', 'size', 'loading']),
      ...mapGetters([
        'subWins'
      ]),
      curWinComponent () {
        return this.subWinComponents[this.subWins.findIndex(({ name }) => name === this.curSubWinName)]
      },
      curSubWin () {
        return this.subWins.find(subWin => subWin.name === this.curSubWinName)
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
                scrolling: 'no'
              },
              style: { width: '100%', height: '100%' }
            })
          }
        }))
      }
    },
    methods: {
      ...mapActions(['openSubWin', 'reset']),
      ...mapMutations(['setSize', 'finishLoading']),
      handleHover () {
        // this.hover
      }
    }
  }
</script>

<template lang="pug">
  #app
    div(v-show="loading")
      md-progress-spinner(:md-diameter="30" :md-stroke="3" md-mode="indeterminate")
    div(v-show="!loading")
      div(v-if="!curWinComponent", :style="{width: '240px', height: '306px'}")
        transition-group.md-layout.md-alignment-center-center(
          name="animate-pause",
          tag="p",
          enter-active-class="animated pause")
          md-content.md-elevation-1.desktop-item.md-layout-item.md-layout.md-alignment-center-center.md-size-33(
            :style="{textAlign: 'center'}",
            v-for="(subWin, index) in subWins",
            :key="index",
            :disabled="subWin.isDisabled",
            @click="openSubWin(subWin.name)")
            div(v-if="subWin.name")
              md-icon(:md-src="'../../assets/svg/' + subWin.icon + '.svg'")
              div.desktop-item__name
                .md-caption {{subWin.desc}}
      div.iframe-wrap(v-else, key="iframe", :style="{width: size.w, height: size.h}")
        div.top-home(v-if="curSubWinName")
          md-button-morph
            md-button-morph-target(@click="reset")
              md-icon.md-morph-initial(:md-src="'../../assets/svg/' + curSubWin.icon + '.svg'")
              md-icon.md-morph-final home
        keep-alive
          component(:is="curWinComponent")
</template>

<style lang="scss">
  html {
    height: auto;
  }
  body {
    padding: 0;
    margin: 0;
  }
  #app /deep/ #draggable{
    position: static;
    overflow: hidden;
  }
  .top-home {
    text-align: center;
  }
  .desktop-item {
    width: 78px;
    height: 102px;
    padding-top: 20px;
    cursor: pointer;
    &:hover {
      box-shadow: inset 0 0 38px rgba(0, 0, 0, .08);
      transition: all .15s ease;
    }
  }
  .desktop-item__name {
    margin-top: 5px;
  }
</style>
