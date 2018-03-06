<script>
  import _ from 'lodash'
  import {
    mapState,
    mapGetters,
    mapActions
  } from 'vuex'

  export default {
    name: 'origin',
    data () {
      return {}
    },
    computed: {
      ...mapState(['url', 'map']),
      ...mapGetters(['origin']),
      info () {
        return this.map.find(({ url }) => url === this.origin)
      },
      status () {
        if (this.info.cheaterList.length === 0) {
          return 0 // 没有模拟者
        }
        return this.info.cheaterList.every(({ cookies }) => cookies.every(({ status }) => status === 1)) ? 1 : 2
      },
      statusDesc () {
        if (this.status === 0) return '请添加'
        return this.status === 1 ? '已同步' : '需同步'
      },
      theme () {
        if (this.status === 0) return ''
        return this.status === 1 ? 'md-primary' : 'md-accent'
      },
      statusIcon () {
        if (this.status === 0) return 'info_outline'
        return this.status === 1 ? 'done' : 'highlight_off'
      },
      cheaterStatus: {
        get () {
          return this.info.cheaterList.filter(({ cookies }) => cookies.every(cookie => cookie.status === 1))
        },
        set (newVal, oldVal) {
          const cheater = _.xor(newVal, oldVal)[0]
          this.$store.dispatch({
            type: 'syncCookie',
            fromSite: this.origin,
            toSite: cheater.origin
          })
        }
      }
    },
    methods: {
      ...mapActions(['deleteOrigin', 'deleteCheater']),
      clear () {
        this.deleteOrigin(this.info.url)
        this.$router.push({ name: 'choose-role' })
      }
    }
  }
</script>

<template lang="pug">
  #origin
    md-card(v-if="info")
      md-card-header
        md-card-header-text.ellipsis
          .md-title.ellipsis {{info.name}}
          .md-subhead.ellipsis {{info.url}}
        md-card-media
          md-chip(
          :class="theme") {{statusDesc}}
      md-card-actions
        md-button.md-icon-button(@click="deleteOrigin(info.url)")
          md-icon delete_forever
          md-tooltip(md-direction="left") 注意：被模拟者也会被一并删除!
    md-list(v-if="info && info.cheaterList")
      md-subheader 模仿者列表
      md-list-item(:key="cheater.origin" v-for="cheater of info.cheaterList")
        md-avatar
          img(:src="cheater.avatar")
        .md-list-item-text
          span {{cheater.name}}
          span {{cheater.origin}}
        md-switch(
          :disabled="cheater.cookies.every(cookie => cookie.status === 1)"
          v-model="cheaterStatus"
          :value="cheater")
        md-menu
          md-button.md-icon-button(md-menu-trigger)
            md-icon more_vert
          md-menu-content
            md-menu-item
              md-button.md-icon-button(@click="deleteCheater({fromSite: info.url, toSite: cheater.origin})")
                md-icon delete
              span 删除
              
    md-empty-state(
      v-if="info && info.cheaterList.length === 0",
      md-rounded,
      md-description="无",
      md-size="100"
    )
</template>

<style>
  .ellipsis {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
</style>
