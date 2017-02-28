<template lang="pug">
	div 内容待定
</template>

<style lang="sass">
	
</style>

<script>
	export default {
		created () {
			chrome.extension.onRequest.addListener((request, sender, sendResponse) => {
				console.log(sender.tab ?
							'from a cnotent script:' + sender.tab.url :
							'from the extension')
				console.log(request.command)
				switch(request.command) {
					case 'showCrawlWindow':
						chrome.tabs.executeScript(null, {
							file: 'common/js/common.js'
						})
						chrome.tabs.executeScript(null, {
							file: 'contentScriptController/js/main.js'
						})
						chrome.tabs.insertCSS(null, {
							file: 'stylesheets/insertCSSForCrawl.css'
						})
						break;
				}
			})
		}
	}
</script>