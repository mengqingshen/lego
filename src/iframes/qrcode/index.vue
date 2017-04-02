<script>
	// import $ from 'expose-loader?$!jquery'
	import QRCode from 'qrcode'
	export default {
		mounted () {
			const text = location.href
			QRCode.toCanvas(this.$refs.qrcode, text, (error) => {})
		}
	}
</script>

<template lang="pug">
	canvas#ca-qrcode-container(ref="qrcode")
</template>

<style>
#ca-qrcode-container {
	width: 200px;
	height: 200px;
}
</style>