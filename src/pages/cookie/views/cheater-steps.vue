<script>
  import {
    mapState, mapGetters, mapActions
  } from 'vuex'
  import {
    getAllCookie
  } from '../../../api/chrome-cookie'

  import {
    SET_TITLE
  } from '../store/mutation-types'

  export default {
    name: 'cheater-steps',
    data () {
      return {
        active: 'first',
        first: false,
        second: false,
        third: false,
        forth: false,
        selectedUrl: null,
        originCookies: [],
        selectedCookieNames: []
      }
    },
    watch: {
      selectedUrl (url) {
        if (url) {
          getAllCookie({ url }).then((cookies) => {
            this.originCookies = cookies ? cookies.map(item => ({ status: 0, ...item })) : []
            this.selectedCookieNames = cookies.map(({ name }) => name)
          })
        }
      }
    },
    computed: {
      ...mapState(['map', 'avatar']),
      ...mapGetters(['origin']),
      selectedCookies () {
        return this.selectedCookieNames.map(name => this.originCookies.find((item) => item.name === name))
      },
      name: {
        get () {
          return this.$store.state.title
        },
        set (val) {
          this.$store.commit(SET_TITLE, val)
        }
      },
      all: {
        set (isActive) {
          this.selectedCookieNames = isActive ? this.originCookies.map(({ name }) => name) : []
        },
        get () {
          return this.selectedCookieNames.length === this.originCookies.length
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
        if (id === 'forth') {
          this.addCheater({
            selectedUrl: this.selectedUrl,
            cheater: {
              name: this.name,
              origin: this.origin,
              cookies: this.selectedCookies,
              avatar: this.avatar
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
    md-steppers(:md-active-step.sync="active", md-vertical, md-linear)
      md-step(
        id="first",
        md-label="要模拟的目标",
        :md-done.sync="first")
        md-empty-state(
          v-if="map.length === 0"
          md-rounded,
          md-icon="search",
          md-size=270,
          md-label="空空如也",
          md-description="先去添加【被模拟者】吧")
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
        md-label="要同步的 cookie",
        :md-done.sync="second")
        md-checkbox(v-model="all") 全选
        md-content(style="{ maxHeight: '100px', overflow:'auto' }").md-scrollbar
          md-list
            md-list-item(:key="cookie.name" v-for="cookie in originCookies")
              md-checkbox(
                v-model="selectedCookieNames",
                :value="cookie.name")
              .md-list-item-text
                span {{cookie.name}}
                span {{cookie.domain}}
        md-button(
          :disabled="selectedCookies.length === 0"
          class="md-raised md-primary",
          @click="setDone('second', 'third')") 继续
      md-step(
        id="third",
        md-label="起一个容易区分的名字吧",
        :md-done.sync="third")
        md-field
          label 名称
          md-input(
            v-model="name",
            maxlength="50")
        md-button(
          :disabled="name === ''"
          class="md-raised md-primary",
          @click="setDone('third', 'forth')") 继续
      md-step(
        id="forth",
        md-label="完成",
        :md-done.sync="forth")
        md-list(class="md-triple-line")
          md-list-item
            md-avatar
              img(:src="avatar")
            div(class="md-list-item-text")
              span {{name}}
              p {{origin}}
        md-button(
          :disabled="selectedCookies.length === 0"
          class="md-raised md-primary",
          @click="setDone('forth')") 完成
      
</template>

<style lang="scss" scoped>
  #cheater-steps .md-content {
    max-height: 200px;
    overflow: auto;
  }
</style>
