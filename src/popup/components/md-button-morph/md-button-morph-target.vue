<template>
  <md-button class="md-icon-button md-button-morph-target md-raised" v-on="$listeners" v-bind="$attrs" @click="handleClick">
    <slot />
  </md-button>
</template>

<script>
  export default {
    name: 'MdButtonMorphTarget',
    inject: ['MdButtonMorph'],
    methods: {
      handleClick () {
        if (this.MdButtonMorph.event === 'click') {
          this.MdButtonMorph.active = !this.MdButtonMorph.active
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "~vue-material/src/components/MdAnimation/variables";
</style>
