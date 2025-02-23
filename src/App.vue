<template>
    <div class="app">
        <router-view />
    </div>
</template>
<script lang="ts" setup>
import TinyThemeTool from '@opentiny/vue-theme/theme-tool';
import { DefaultTheme } from '@/global/theme';

const themeTool = new TinyThemeTool();
themeTool.changeTheme({
    name: DefaultTheme.name,
    data: {
        ...DefaultTheme.data,
    },
});
</script>
<style lang="scss">
.app {
    width: 100vw;
    height: 100vh;
    background-color: #ffffff;
}
</style>
