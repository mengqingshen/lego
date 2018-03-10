<script>
  import {
    mapState,
    mapGetters,
    mapActions
  } from 'vuex'
  import moment from 'moment'
  import _ from 'lodash'
  
  moment.locale('zh-cn')

  export default {
    name: 'cheater',
    data () {
      return {
        now: moment().unix()
      }
    },
    computed: {
      ...mapState(['map']),
      ...mapGetters(['origin']),
      info () {
        for (let i = 0, l = this.map.length; i < l; i++) {
          const originItem = this.map[i]
          for (let j = 0, ll = originItem.cheaterList.length; j < ll; j++) {
            const cheater = originItem.cheaterList[j]
            if (cheater.origin === this.origin) {
              return {
                origin: originItem,
                cheater
              }
            }
          }
        }
      },
      status () {
        if (!this.info) {
          return 0
        }
        return this.info.cheater.cookies.every(({ status }) => status === 1) ? 1 : 2
      },
      theme () {
        if (this.status === 0) return ''
        return this.status === 1 ? 'md-primary' : 'md-accent'
      },
      statusDesc () {
        if (this.status === 0) return '没找到记录'
        return this.status === 1 ? '已同步' : '需同步'
      },
      cookieStatus: {
        get () {
          return this.info.cheater.cookies.filter(({ status }) => status === 1).map(({ name }) => name)
        },
        set (newVal) {
          const cookieStatus = this.info.cheater.cookies.filter(({ status }) => status === 1).map(({ name }) => name)
          const name = _.xor(newVal, cookieStatus)[0]
          this.$store.dispatch({
            type: 'syncCookie',
            fromSite: this.info.origin.url,
            toSite: this.info.cheater.origin,
            name
          })
        }
      }
    },
    methods: {
      ...mapActions(['deleteCheater']),
      moment,
      clear () {
        this.deleteCheater({ fromSite: this.info.origin.url, toSite: this.info.cheater.origin })
        this.$route.push({ name: 'choose-role' })
      }
    }
  }
</script>

<template lang="pug">
  #origin
    md-card(v-if="info")
      md-card-header
        md-card-header-text.ellipsis
          .md-title.ellipsis {{info.cheater.name}}
          .md-subhead.ellipsis {{info.cheater.origin}}
        md-card-media
          md-chip(
          :class="theme") {{statusDesc}}
      md-card-actions
        md-button.md-icon-button(@click="clear")
          md-icon delete_forever
    md-list.md-triple-line(v-if="info")
      md-subheader 要同步的 cookie 列表
      md-list-item(
        :key="info.cheater.cookies.name",
        v-for="(cookie, i) of info.cheater.cookies")
        md-avatar.md-avatar-icon {{i + 1}}
        .md-list-item-text
          span {{cookie.name}}
          span(:class="{'md-accent': cookie.expirationDate * 1000 < now}") {{moment(cookie.expirationDate * 1000).startOf('day').fromNow()}}
          p {{cookie.value}}
        md-switch(
          :disabled="cookie.status === 1"
          v-model="cookieStatus"
          :value="cookie.name")

</template>

<style lang="scss">

</style>
