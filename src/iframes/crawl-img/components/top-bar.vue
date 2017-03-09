<script>
	import {
		mapGetters,
		mapActions
	} from 'vuex'
	export default {
		props: {
			title: {
				type: String,
				required: true
			}
		},
		computed: {
			...mapGetters(['isExpanded'])
		},
		methods: {
			...mapActions([
				'handleArrowClicked',
				'closeCrawlWindow'
			])
		}
	}
</script>

<template lang="pug">
	el-row
		el-col.title(:span="16") {{title}}
		el-col(:span="4")
			i(:class="[isExpanded ? 'el-icon-arrow-down' : 'el-icon-arrow-up']", @click="handleArrowClicked")
		el-col(:span="4")
			i.el-icon-close(@click="closeCrawlWindow")
</template>

<style lang="sass">
</style>
