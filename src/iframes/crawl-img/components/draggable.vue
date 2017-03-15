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
	#draggable {
		border: 1px solid transparent;
		border-radius: 5px;
		overflow: hidden;
		background: transparent;
		z-index: 999999999999999999;
	}

</style>
<template lang="pug">
	#draggable.ui-draggable(ref="draggable", :style="{top: pos.top + 'px', left: pos.left + 'px'}", @mousedown="handleMouseDown", @mousemove="handleMouseMove")
		slot

</template>
<script>
	export default {
		mounted() {
			$(window).resize(e => {
				this.resetMaxXY()
			}).resize()
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
				mouseOffsetY: 0,
				maxX: 0,
				maxY: 0
			}
		},
		methods: {
			resetMaxXY() {
				this.maxX = document.documentElement.clientWidth - this.$refs.draggable.offsetWidth
				this.maxY = document.documentElement.clientHeight - this.$refs.draggable.offsetHeight
			},
			resetCurrentPos() {
				this.pos.left =0
				this.pos.top = 0
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
					
					moveX = Math.min(this.maxX, Math.max(0, moveX))
					moveY = Math.min(this.maxY, Math.max(0, moveY))

					this.pos.left = moveX
					this.pos.top = moveY
				}
			}
		}
	}
</script>