<script>
  import {
    mapState,
    mapActions,
    mapGetters
  } from 'vuex'

  export default {
    name: 'origin-steps',
    data () {
      return {
        active: 'first',
        first: false,
        second: false,
        name: '',
        avatar: null
      }
    },
    computed: {
      ...mapState(['url']),
      ...mapGetters(['domain'])
    },
    methods: {
      ...mapActions([
        'getBase64ImageOfShortcut',
        'addNewOrigin'
      ]),
      setDone (id, index) {
        this[id] = true
        if (index) {
          this.active = index
        }
        if (id === 'first') {
          this.getBase64ImageOfShortcut().then((base64Image) => {
            this.avatar = base64Image
          })
        }

        if (id === 'second') {
          this.addNewOrigin({
            name: this.name,
            domain: this.domain,
            avatar: this.avatar,
            cheaterList: []
          })
          this.$router.push({ name: 'origin' })
        }
      }
    }
  }
</script>

<template lang="pug">
  div
    md-steppers(:md-active-step.sync="active", md-vertical md-linear)
      md-subheader 作为被模拟者添加到名单中
      md-step(
        id="first",
        md-label="第一步",
        md-description="起一个容易区分的名字吧",
        :md-done.sync="first")
        md-field
          label 名称
          md-input(
            v-model="name",
            maxlength="50")
        md-button(
          :disabled="name === ''"
          class="md-raised md-primary",
          @click="setDone('first', 'second')") 继续
      md-step(
        id="second",
        md-label="第二步",
        md-description="完成",
        :md-done.sync="second")
        md-list(class="md-triple-line")
          md-list-item
            md-avatar
              img(:src="avatar")
            div(class="md-list-item-text")
              span {{name}}
              p {{domain}}
        md-button(
          :disabled="!avatar"
          class="md-raised md-primary",
          @click="setDone('second')") 完成
  
</template>

<style>

</style>
