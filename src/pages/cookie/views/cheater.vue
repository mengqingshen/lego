<script>
  import {
    mapState
  } from 'vuex'
  export default {
    name: 'cheater',
    computed: {
      ...mapState(['map', 'origin']),
      info () {
        return this.map.find(({ url }) => url === this.origin)
      }
    }
  }
</script>

<template lang="pug">
  #origin
    md-card(v-if="info")
      md-card-header
        .md-layout-item.md-size-60
          md-card-header-text
            .md-title {{info.name}}
            .md-subtitle {{info.url}}
        .md-layout-item.md-size-40
          md-card-media
            md-chip(
            :class="theme") {{statusDesc}}
</template>

<style lang="scss">

</style>
