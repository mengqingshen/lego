/**
 * Created by mengqingshen on 2018/3/8.
 * 对 iframe 进行简单封装
 */
<template lang="pug">
  iframe(
    :src="src",
    frameborder="0",
    seamless="seamless",
    scrolling="no",
    id="jarvis-iframe",
    :style="{width: sizeMA.w, height: sizeMA.h}")
</template>
<script>
  import {
    mapGetters
  } from 'vuex'
  export default {
    computed: {
      ...mapGetters([
        'sizeMA'
      ])
    },
    props: {
      src: {
        type: String,
        required: true
      }
    }
  }
</script>
