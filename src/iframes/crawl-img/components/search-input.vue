<script>
	import {
		mapActions
	} from 'vuex'
	export default {
		data () {
			return {
				cssSelectorText: '',
				toolTipDisabled: true
			}
		},
		methods: {
			...mapActions(
				[
					'triggerCrawl'
				]
			),
			handleSearch (e) {
				if (this.cssSelectorText === '') {
					this.toolTipDisabled = false
					return
				}
				this.triggerCrawl(this.cssSelectorText)
				this.toolTipDisabled = this.cssSelectorText !== ''
			},
			handleInput () {
				if (this.cssSelectorText !== '') {
					this.toolTipDisabled = true
				}
			}
		}
	}
</script>

<template lang="pug">
	div
		//- el-tooltip(placement="top-end", :disabled="toolTipDisabled", content="不能为空", effect="light")
		div(class="search-input")
			i.el-icon-search(@click="handleSearch")
			input(type="text", placeholder="css 选择器", autocomplete="off", @keyup.enter="handleSearch", v-model.trim="cssSelectorText", @input="handleInput")
</template>

<style lang="sass" scoped>
	.search-input {
		position: relative;
		font-size: 14px;
		display: inline-block;
		width: 100%;
		margin-top: 5px;
		user-select: none;
		i {
			font-family: element-icons!important;
			speak: none;
			font-style: normal;
			font-weight: 400;
			font-variant: normal;
			text-transform: none;
			line-height: 1;
			vertical-align: baseline;
			display: inline-block;
			-webkit-font-smoothing: antialiased;
			-moz-osx-font-smoothing: grayscale;
			position: absolute;
			width: 35px;
			height: 100%;
			right: 0;
			top: 0;
			text-align: center;
			color: #bfcbd9;
			transition: all .3s;
			&:before {
				content: "\E61D"
			}
			&:after {
				content: '';
				height: 100%;
				width: 0;
				display: inline-block;
				vertical-align: middle;
			}
		}
		input {
			padding-right: 35px;
			appearance: none;
			-moz-appearance: none;
			-webkit-appearance: none;
			outline: 0;
			background-color: #fff;
			border-radius: 4px;
			border: 1px solid #bfcbd9;
			color: #1f2d3d;
			display: block;
			font-size: inherit;
			height: 36px;
			line-height: 1;
			padding: 3px 10px;
			transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
			width: 210px;
			background-image: none;
			box-sizing: border-box;
		}
	}
</style>