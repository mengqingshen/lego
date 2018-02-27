<script>
  import {
    mapState
  } from 'vuex'
  import {
    getAllCookieByDomain
  } from '../../../api/chrome-cookie'

  export default {
    name: 'cheater-steps',
    data () {
      return {
        active: 'first',
        first: false,
        second: false,
        selectedDomain: null,
        originCookies: [],
        selectedCookieNames: []
      }
    },
    watch: {
      selectedDomain (domain) {
        if (domain) {
          getAllCookieByDomain(domain).then((cookies) => {
            console.log('cookies', cookies)
            this.originCookies = cookies
          })
        }
      }
    },
    computed: {
      ...mapState(['map'])
    },
    methods: {
      setDone (id, index) {
        this[id] = true
        if (index) {
          this.active = index
        }
      }
    }
  }
</script>

<template lang="pug">
  div
    md-steppers(:md-active-step.sync="active", md-vertical)
      md-step(
        id="first",
        md-label="第一步",
        md-description="要模拟的目标",
        :md-done.sync="first")
        md-list.md-triple-line
          md-list-item(:key="originItem.domain" v-for="originItem in map")
            md-avatar
              img(:src="originItem.avatar")
            .md-list-item-text
              span {{originItem.name}}
              span {{originItem.domain}}
            md-radio(
              v-model="selectedDomain",
              :value="originItem.domain")
        md-button(
          :disabled="!selectedDomain"
          class="md-raised md-primary",
          @click="setDone('first', 'second')") 继续
      md-step(
        id="second",
        md-label="第二步",
        md-description="要同步的 cookie",
        :md-done.sync="second")
        md-list.md-triple-line
          template(v-for="domainCookies in originCookies")
            md-subheader {{domainCookies.domain}}
            md-list-item(:key="cookie.name" v-for="cookie in domainCookies.cookies")
              md-checkbox(
                v-model="selectedCookieNames",
                :value="cookie.name")
                .md-subheading {{cookie.name}}
                .md-caption {{cookie.value}}
                .md-caption {{cookie.domain}}
            md-divider
        md-button(
          class="md-raised md-primary",
          @click="setDone('second')") 继续
      
</template>

<style scoped lang="sass">

</style>
