<template>
    <div ref="appRef" class="app">
        <Loading :visible="loading" />
        <a-config-provider :theme="themeConfig" :locale="locale === 'en' ? enUS : zhCN">
            <a-app>
                <router-view />
            </a-app>
        </a-config-provider>
    </div>
</template>
<script lang="ts" setup>
import Loading from '@/components/loading/index.vue';
import { useAppStore } from '@/store/module';
import { isDark } from '@/store/module/app';
import enUS from 'ant-design-vue/es/locale/en_US';
import zhCN from 'ant-design-vue/es/locale/zh_CN';

const appStore = useAppStore();
const { themeConfig } = storeToRefs(appStore);
const loading = ref(true);

const locale = ref(zhCN.locale);
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
