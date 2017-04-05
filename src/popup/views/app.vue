<script>
    import {
        mapActions,
        mapGetters
    } from 'vuex'

    import extension from '../../api/chrome-extension'
    export default {
        computed: {
            ...mapGetters([
                'subWins'
            ])
        },
        created () {
            this.ping()
        },
        methods: {
            ...mapActions([
                'ping',
                'openSubWin'
            ])
        }
    }
</script>

<template lang="pug">
    #app
        .app-entrys
            .trans.bdc.tc.app-entry(
                :key="",
                v-for="subWin in subWins",
                :class="{'disabled': subWin.isDisabled}",
                @click="openSubWin(subWin.name)")
                div
                    i.iconfont(:class="subWin.icon")
                strong {{subWin.desc}}
</template>

<style lang="scss">
    $gap: 5px;
    body {
        margin: auto;
    }
    .app-entrys {
        margin: $gap;
        display: flex;
        flex-direction: column;
    }
    .app-entry {
        flex: 1;
        border: 1px solid ;
        position: relative;
        height: 90px;
        width: 90px;
        border-radius: 3px;
        cursor: pointer;
        & + .app-entry{
            margin-top: $gap;
        }
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
