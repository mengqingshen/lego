<style lang="sass" scoped>
	.ui-mask {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		background-color: #000;
		opacity: 0.4;
		filter: Alpha(opacity=40);
		user-select: none;
	}
	.ui-draggable {
		position: fixed;
		cursor: move;
		user-select: none;
	}

</style>
<template lang="pug">
	div
		#draggable.ui-draggable(ref="draggable", @mousedown="handleMouseDown", @mousemove="handleMouseMove", :style="{top: pos.top + 'px', left: pos.left + 'px'}")
			slot

</template>
<script>
	export default {
		mounted() {
			$(document).on('mouseup', e => {
				this.isDraging = false
			})
			this.resetCurrentPos()
		},
		props: {
			title: {
				type: String,
				required: true
			}
		},
		data() {
			return {
				hide: true,
				pos: {
					top: 0,
					left: 0
				},
				isDraging: false,
				mouseOffsetX: 0,
				mouseOffsetY: 0
			}
		},
		methods: {
			resetCurrentPos() {
				const clientWidth = document.documentElement.clientWidth
				const clientHeight = document.documentElement.clientHeight

				const offsetWidth = this.$refs.draggable.offsetWidth
				const offsetHeight = this.$refs.draggable.offsetHeight
				
				this.pos.left = (clientWidth - offsetWidth) / 2
				this.pos.top = (clientHeight - offsetHeight) / 2
			},
			handleMouseDown(e) {
				this.mouseOffsetX = e.pageX - this.$refs.draggable.offsetLeft
				this.mouseOffsetY = e.pageY - this.$refs.draggable.offsetTop
				this.isDraging = true
			},
			handleMouseMove(e) {
				if(this.isDraging) {
					const mouseX = e.pageX
					const mouseY = e.pageY
					let moveX = mouseX - this.mouseOffsetX
					let moveY = mouseY - this.mouseOffsetY

					const maxX = document.documentElement.clientWidth - this.$refs.draggable.offsetWidth
					const maxY = document.documentElement.clientHeight - this.$refs.draggable.offsetHeight
					moveX = Math.min(maxX, Math.max(0, moveX))
					moveY = Math.min(maxY, Math.max(0, moveY))
					this.pos.left = moveX
					this.pos.top = moveY
				}
			}
		}
	}
</script>