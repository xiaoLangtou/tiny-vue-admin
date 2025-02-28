<template>
    <div class="app">
        <loading :visible="loading" />
        <a-config-provider :theme="themeConfig">
            <a-app>
                <router-view />
            </a-app>
        </a-config-provider>
    </div>
</template>
<script lang="ts" setup>
import { useAppStore } from '@/store';
import { isDark } from '@/store/module/app';
import Loading from '@/components/loading/index.vue';

const appStore = useAppStore();
const { themeConfig, theme } = storeToRefs(appStore);
const loading = ref(true);

// 初始化主题
const initTheme = () => {
    const currentTheme = isDark.value ? 'dark' : 'light';
    appStore.toggleTheme(currentTheme);
};

// 页面加载时初始化主题
onMounted(() => {
    initTheme();
    // 延迟关闭loading，确保主题和资源加载完成
    setTimeout(() => {
        loading.value = false;
    }, 1000);
});
</script>
<style lang="scss">
.app {
    width: 100vw;
    height: 100vh;
}
</style>
