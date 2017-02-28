<template lang="pug">
	ul.list-wrap-selectors
		li(v-for="selector of selectorsListWithStatus" @click="triggerCrawl(selector.cssSelector)")
			p {{selector.cssSelector}}
			p {{selector.hostname}}
			i(:key="selector.id" @click.stop="starOrNot(selector, $event)" v-bind:class="[selector.isCollected ? 'el-icon-star-on' : 'el-icon-star-off']")

</template>

<style lang="sass">
	.list-wrap-selectors {
		li {
			background: #fff;
			border-radius: 3px;
			padding: 5px;
			position: relative;
			overflow: hidden;
			color: #5e6d82;
			transition: .5s box-shadow;
			margin-bottom: 5px;
			border-top: 1px solid #D3DCE6;
			&:hover {
				box-shadow: 0px -2px 3px #D3DCE6;
				cursor: pointer;
			}

			p {
				padding: 0;
				margin: 0;
				white-space: nowrap;
				text-overflow: ellipsis;
				font-size: 12px;
				overflow: hidden;
				&:nth-child(2) {
					font-size: 10px;
					opacity: 0.69;
					margin: 5px 0;
				}
			}
			i {
				position: absolute;
				top:50%;
				right: 10px;
				transform: translateY(-50%);
				transition: 1s filter;
				&:hover {
					filter: drop-shadow(0px 3px 2px rgba(0, 0, 0, 1));
				}
			}
		}
	}
</style>

<script>
	import {
		mapActions
	} from 'vuex'

	export default {
		props: {
			selectorsList: {
				Array,
				required: true
			}
		},
		computed: {
			/** 
			* 给 selectorsList 的每个成员添加必要的属性
			*
			* @returns{Array} 成员添加了必要属性的 selectorsList
			*/
			selectorsListWithStatus () {
				const collections = new Map(this.$store.getters.selectorsCollection)
				return this.selectorsList.map((selector, index) => {
					const newSelector = Object.assign({}, selector, { isCollected: false, id: index })

					let temp = collections.get(selector.hostname)
					if (temp) {
						temp = new Set(temp)
						if (temp.has(selector.cssSelector)) {
							newSelector.isCollected = true
						}
					}
					
					return newSelector
				})
			}
		},
		methods: {
			...mapActions([
				'starOrNot',
				'triggerCrawl'
			])
		}
	}
</script>