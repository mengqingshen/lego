<script>
  import {
    mapState,
    mapActions
  } from 'vuex'

  export default {
    name: 'origin',
    data () {
      return {}
    },
    computed: {
      ...mapState(['url', 'map']),
      ...mapActions(['syncCookie']),
      info () {
        return this.map.find(({ domain }) => domain === (new URL(this.url)).hostname)
      },
      status () {
        if (!this.info) {
          return 0 // 还没有加入到名单中, 没有相关信息
        }
        return this.info.cheaterList.every(({ cookies }) => cookies.every(({ status }) => status === 1))
      }
    },
    methods: {
    }
  }
</script>

<template lang="pug">
  div#origin
    md-card(v-if="info")
      md-card-header
        md-avatar
          img(:src="info.avatar")
        .md-title 被模拟•{{info.name}}
        .md-subhead {{info.domain}}
    div.md-primary
      div(:style="{ textAlign: 'center' }")
        md-icon.md-size-3x done
      .md-title(:style="{ textAlign: 'center' }") 无差异，不需要同步
    md-list(v-if="info.cheaterList.length > 0")
      md-subheader 模仿者列表
      md-list-item(:key="cheater.origin" v-for="cheater of cheaterList")
        md-avatar
          img(:src="cheater.avatar")
        .md-list-item-text
          span {{cheater.name}}
          span {{cheater.origin}}
        md-switch(
          :value="cheater.cookies.every(cookie => cookie.status === 1)",
          @change="syncCookie(origin, cheater.origin, cheater.cookies)")
</template>

<style>

</style>
