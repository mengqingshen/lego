<script>
  import {
    SET_ROLE
  } from '../store/mutation-types'

  import CheaterSteps from './cheater-steps'
  import OriginSteps from './origin-steps'

  export default {
    name: 'choose-role',
    components: {
      CheaterSteps,
      OriginSteps
    },
    mounted () {
    },
    computed: {
      role: {
        get () {
          return this.$store.state.role
        },
        set (val) {
          this.$store.commit({
            type: SET_ROLE,
            role: val
          })
        }
      },
      is () {
        return `${this.role}-steps`
      }
    },
    methods: {
      next () {
        this.$router.push({ name: `${this.role}-steps` })
      }
    }
  }
</script>

<template lang="pug">
  div
    div 
      md-radio(
        v-model="role"
        value="origin") 被模拟
      md-radio(
        v-model="role"
        value="cheater") 模拟
    md-button(
      :disabled="role === null"
      class="md-raised md-primary",
      @click="next('second')") 继续

</template>

<style>

</style>
