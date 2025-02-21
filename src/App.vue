<template>
    <div class="app">
        <router-view />
    </div>
</template>
<script lang="ts" setup>
import TinyThemeTool from '@opentiny/vue-theme/theme-tool';
import { DefaultTheme } from '@/global/theme.ts';

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
    background-color: var(--p-gray-50);
}
</style>
