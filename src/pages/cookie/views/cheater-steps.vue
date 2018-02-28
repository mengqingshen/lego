<script>
  import {
    mapState, mapGetters, mapActions
  } from 'vuex'
  import {
    getAllCookie
  } from '../../../api/chrome-cookie'

  export default {
    name: 'cheater-steps',
    data () {
      return {
        active: 'first',
        first: false,
        second: false,
        selectedUrl: null,
        originCookies: [],
        selectedCookies: []
      }
    },
    watch: {
      selectedUrl (url) {
        if (url) {
          getAllCookie({ url }).then((cookies) => {
            this.originCookies = cookies
            this.selectedCookies = cookies
          })
        }
      }
    },
    computed: {
      ...mapState(['map']),
      ...mapGetters(['origin']),
      all: {
        set (isActive) {
          this.selectedCookies = isActive ? this.originCookies : []
        },
        get () {
          return this.selectedCookies.length === this.originCookies.length
        }
      }
    },
    methods: {
      ...mapActions(['addCheater']),
      setDone (id, index) {
        this[id] = true
        if (index) {
          this.active = index
        }
        if (id === 'second') {
          this.addCheater({
            selectedUrl: this.selectedUrl,
            cheater: {
              origin: this.origin,
              cookies: this.selectedCookies
            }
          }).then(() => {
            this.$router.push({ name: 'cheater' })
          })
        }
      }
    }
  }
</script>

<template lang="pug">
  div#cheater-steps
    md-steppers(:md-active-step.sync="active")
      md-step(
        id="first",
        md-label="第一步",
        md-description="要模拟的目标",
        :md-done.sync="first")
        md-list.md-triple-line
          md-list-item(:key="originItem.url" v-for="originItem in map")
            md-avatar
              img(:src="originItem.avatar")
            .md-list-item-text
              span {{originItem.name}}
              span {{originItem.url}}
            md-radio(
              v-model="selectedUrl",
              :value="originItem.url")
        md-button(
          :disabled="!selectedUrl"
          class="md-raised md-primary",
          @click="setDone('first', 'second')") 继续
      md-step(
        id="second",
        md-label="第二步",
        md-description="要同步的 cookie",
        :md-done.sync="second")
        md-checkbox(v-model="all") 全选
        md-content(style="{ maxHeight: '100px', overflow:'auto' }").md-scrollbar
          md-list
            md-list-item(:key="cookie" v-for="cookie in originCookies")
              md-checkbox(
                v-model="selectedCookies",
                :value="cookie")
              .md-list-item-text
                span {{cookie.name}}
                span {{cookie.domain}}
        md-button(
          :disabled="selectedCookies.length === 0"
          class="md-raised md-primary",
          @click="setDone('second')") 完成
      
</template>

<style lang="scss" scoped>
  #cheater-steps .md-content {
    max-height: 200px;
    overflow: auto;
  }
</style>
