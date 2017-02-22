<template lang="pug">
    el-row.header
        el-col(:span="4")
            i.el-icon-arrow-left
        el-col(:span="16" justify="center")
            .title {{ title }}
        el-col(:span="4")
            .close
</template>
<style>
    .header {
        padding: 5px;
        background-color: #1f2d3d;
        color: #fff;
        font-size: 20px;
        text-align: center;
        box-shadow: 0px 2px 20px #1f2d3d;
    }
</style>
<script>
    export default {
        data(){
            return{

            }
        },
        props: {
            title: {
                type: String,
                required: true
            }
        }
    }
</script>
