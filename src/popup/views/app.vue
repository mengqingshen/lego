<script>
    export default {
        data () {
            return {
                toolDownPic: {
                    disabled: false,
                    created: false
                }
            }
        },
        created () {
            this.ping()
        },
        methods: {
            ping () {
                chrome.tabs.getSelected(null, tab => {
                    chrome.tabs.sendRequest(tab.id, {
                        command: 'howareyou'
                    }, res => {
                        if (res === 'fine') {
                            this.toolDownPic.created = true
                            this.toolDownPic.disabled = true
                        }
                        else if (res === 'hidden') {
                            this.toolDownPic.created = true
                            this.toolDownPic.disabled = false
                        }
                    })
                })
            },
            showCrawlWindow () {
                if (!this.toolDownPic.disabled) {
                    if (this.toolDownPic.created) {
                        chrome.tabs.getSelected(null, tab => {
                            chrome.tabs.sendRequest(tab.id, {
                                command: 'show-crawl-window'
                            }, res => {
                                this.ping()
                            })
                        })
                    }
                    else {
                        chrome.extension.sendRequest(null, {
                            command: 'create-craw-window'
                        }, res => {
                            this.ping()
                        })
                    }
                }
            }
        }
    }
</script>

<template lang="pug">
    #app
        table.app-entry-wrap
            tr
                td
                    div.trans.bdc.tc.app-entry(:class="{'disabled': toolDownPic.disabled}", @click="showCrawlWindow")
                        div
                            i.iconfont.icon-tupian
                        strong 下载图片
</template>

<style lang="sass">
    body {
        width: 300px;
        margin: auto;
    }
    .app-entry-wrap {
        margin: 30px auto;
    }
    .app-entry {
        border: 1px solid ;
        position: relative;
        height: 90px;
        width: 90px;
        border-radius: 3px;
        cursor: pointer;
        &:hover {
            box-shadow: 0 0 5px #999;
        }
        &.disabled {
            cursor: not-allowed;
            pointer-events: none;
            color: #999;
        }

        i.iconfont {
            font-size: 50px;
        }
        strong {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
        }
    }
</style>
