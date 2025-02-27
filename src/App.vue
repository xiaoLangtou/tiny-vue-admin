<template>
    <div class="app">
        <a-config-provider :theme="themeConfig">
            <a-app>
                <router-view />
            </a-app>
        </a-config-provider>
    </div>
</template>
<script lang="ts" setup>
import { useAppStore } from '@/store';

const appStore = useAppStore();
const { themeConfig } = storeToRefs(appStore);

const theme = ref(themeConfig.value);
watch(
    () => theme.value,
    (newVal) => {
        console.log(newVal);
    },
    { immediate: true },
);
</script>
<style lang="scss">
.app {
    width: 100vw;
    height: 100vh;
}
</style>
