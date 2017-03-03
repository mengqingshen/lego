/*
* @fileoverview 收藏列表
* @author sean(eli01linux@aliyun.com)
*/

<template lang="pug">
    #panel-download
        .top-area
            el-row(type="flex", align="middle")
                el-col(:span="4")
                    i.el-icon-arrow-left.icon-base(@click="back")
                el-col(:span="16")
                    el-button(type="primary", icon="download") 下载
                        i.iconfont.icon-icondownload.icon-base
        .list-area
            el-checkbox(:indeterminate="isIndeterminate", v-model="checkAll", @change="handleCheckAllChange") 全选
            el-checkbox-group(v-model="checkedImgUrls")
                el-checkbox(v-for="url in imgUrls", :label="url", class="img-wrap")
                    el-card(:body-style="{padding: '0px'}")
                        img(:src="url")
</template>

<style lang="sass" scoped>
    .top-area {
        height: 60px;
        line-height: 60px;
        .el-icon-arrow-left {
            cursor: pointer;
        }
        .el-button {
            width: 100%;
        }
    }
    .list-area {
        padding-top: 10px;
        .img-wrap {
            width: 100%;
            margin: 0;
        }
        
        .el-card {
            transition: .2s all ease-in;
            display: inline-block;
            width: 100%;
            font-size: 0;
            &:hover {
                filter: blur(3px);
            }
            img {
                width: 100%;
            }
        }
    }
</style>

<style lang="sass">
    #panel-download {
        position: relative;
        width: 250px;
        .el-checkbox-group {
            .el-checkbox__input {
                position: absolute;
                z-index: 10;
                left: 50%;
                top: 50%;
                transform: translate3d(-50%, -50%, 0);
            }
        }
        .el-checkbox__label {
            padding: 0;
        }
    }
</style>

<script>
    import {
        mapState,
        mapGetters,
        mapActions
    } from 'vuex'

    import * as types from '../store/mutation-types'

    export default {
        computed: {
            checkedImgUrls: {
                get () {
                   return this.$store.state.crawl.imgs.filter(([key, value]) => value.checked).map(([key, value]) => key)
                },
                set (newValue) {
                    this.$store.commit(types.CHANGE_CHECKEDIMGS, newValue)
                }
            },
            ...mapState({
                imgUrls: state => state.crawl.imgs.map(([key, value]) => key)
            }),
            ...mapGetters([
                'isIndeterminate',
                'checkAll'
            ])
        },
        methods: {
            ...mapActions([
                'back',
                'handleCheckAllChange',
                'handleCheckedImgsChange'
            ])
        }
    }
</script>