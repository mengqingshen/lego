/*
* @fileoverview 收藏列表
* @author sean(eli01linux@aliyun.com)
*/
<template lang="pug">
    el-card#panel-search
        .top-area
            i.el-icon-menu
            el-input(placeholder="输入 css 选择器，比如: img", icon="search")
        .his-list-content
            header 历史记录
            selectorList(v-bind:selectors-list="selectorsHistory")
</template>

<style lang="sass">
    @import url('../../styles/common.scss');
    .el-card {
        position: relative;
        .el-card__body {
            padding: 0;
        }
    }
    .top-area {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        background: #f9fafc;
        z-index: 1;
        box-shadow: 0px 3px 20px #1f2d3d;
        padding: 10px 10px;
        .el-input {
            margin-top: 5px;
        }
    }
    .his-list-content {
        height: 100%;
        padding: 100px 10px 0;
        header {
            font-size: 13px;
            color: #5e6d82;
        }
    }
    #panel-search {
        height: 100%;
    }
</style>

<script>
    export default{
        components:{
            selectorList(resolve) {
                resolve(require('./selectorList'))
            }
        },
        computed: {
			selectorsHistory () {
				return this.$store.getters.selectorsHistory
			}
		}
    }
</script>
