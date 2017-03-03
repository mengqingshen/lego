/*
* @fileoverview 收藏列表
* @author sean(eli01linux@aliyun.com)
*/
<template lang="pug">
    #panel-search
        .top-area
            i.el-icon-menu
            el-input(placeholder="输入 css 选择器，比如: img", icon="search")
        .his-list-content
            header 历史记录
            selectorList(v-bind:selectors-list="selectorsHistory")
</template>

<style lang="sass" scoped>
    .top-area {
        .el-input {
            margin-top: 5px;
        }
    }
    .his-list-content {
        height: 100%;
        padding: 10px 10px 0;
        header {
            font-size: 13px;
            color: #5e6d82;
        }
    }
</style>

<script>
    export default{
        components:{
            selectorList(resolve) {
                resolve(require('./selector-list'))
            }
        },
        computed: {
            selectorsHistory () {
                return this.$store.getters.selectorsHistory
            }
        }
    }
</script>
