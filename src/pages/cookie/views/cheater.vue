<script>
  import {
    mapState,
    mapGetters
  } from 'vuex'
  export default {
    name: 'cheater',
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
      statusDesc () {
        if (this.status === 0) return '没找到记录'
        return this.status === 1 ? '已同步' : '需同步'
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
        md-button.md-icon-button(@click="deleteCheater(info.origin)")
          md-icon delete_forever
          md-tooltip(md-direction="left") 注意：被模拟者也会被一并删除!
</template>

<style lang="scss">

</style>
