<script>
  import {
    mapActions
  } from 'vuex'
  export default {
    data () {
      return {
        cssSelectorText: '',
        toolTipDisabled: true,
        advanced: false
      }
    },
    methods: {
      ...mapActions(
        [
          'triggerCrawl'
        ]
      ),
      handleSearch (e) {
        if (this.advanced) {
          if (this.cssSelectorText === '') {
            this.toolTipDisabled = false
            return
          }
          this.triggerCrawl(this.cssSelectorText)
          this.toolTipDisabled = this.cssSelectorText !== ''
        }
        else {
          this.advanced = true
        }
      },
      handleStart () {
        this.triggerCrawl()
      },
      handleInput () {
        if (this.cssSelectorText !== '') {
          this.toolTipDisabled = true
        }
      }
    }
  }
</script>

<template lang="pug">
  div.search-input-wrap
    span.iconfont-wrap.search-submit
      i.el-icon-search(@click="handleSearch")
    //- el-tooltip(placement="top-end", :disabled="toolTipDisabled", content="不能为空", effect="light")
    transition(
      name="move",
      mode="out-in")
      div(:key="advanced ? 'on' : 'off'")
        input#search-input(
          v-show="advanced",
          v-model.trim="cssSelectorText",
          type="text",
          placeholder="css 选择器",
          autocomplete="off",
          autofocus="autofocus",
          @keyup.enter="handleSearch",
          @input="handleInput")
        input#crawl-all-imgs.seanway-btn(
          v-show="!advanced",
          type="button",
          @click="handleStart",
          value="开始(全部)")
        

</template>

<style lang="scss" scoped>
  @import "../../../common/style/modules/_element-colors";
  .move-enter,
  .move-enter-active,
  .move-leave-active {
    transition: all .5s ease;
  }
  .move-enter {
    transform: translateX(20px);
    opacity: 0;
  }
  .move-leave-active {
    transform: translateX(-20px);
    opacity: 0;
  }
  .search-input-wrap {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 100%;
    margin-top: 5px;
    user-select: none;
    .search-submit {
      position: absolute;
      right: 0;
      bottom: 0;
      top: 0;
      margin: auto;
      z-index: 1;
    }

    #crawl-all-imgs {
      width: calc(100% - 39px);
      line-height: 36px;
      font-size: 13px;
      padding: 0;
    }
    #search-input {
      padding-right: 35px;
      appearance: none;
      outline: 0;
      background-color: transparent;
      border: 0 solid transparent;
      color: $color-gray;
      height: 36px;
      line-height: 36px;
      padding: 3px 10px;
      transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
      width: calc(100% - 26px);
      background-image: none;
      box-sizing: border-box;
    }
  }
</style>
