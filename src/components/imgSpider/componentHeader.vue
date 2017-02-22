<template lang="pug">
    el-row.header
        el-col(:span="2")
            i.el-icon-arrow-left
        el-col(:span="8")
            .title(:span="2") 图片爬取
        el-col(:span="2")
            .close
</template>
<style>
    .header {
        padding: 5px;
        background-color: #1f2d3d;
        color: #fff;
        font-size: 20px;
    }
</style>
<script>
    export default {
        data(){
            return{

            }
        },
        components:{

        }
    }
</script>
