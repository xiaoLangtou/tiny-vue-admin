<!--
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-03-04 09:26:58
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-03-04 14:33:49
 * @FilePath: src/layout/index.vue
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 -->
<template>
    <default-layout v-if="layout === 'side'" @setting="handleSetting"></default-layout>
    <top-menu-layout v-if="layout === 'top'" @setting="handleSetting"></top-menu-layout>
    <mix-layout v-if="layout === 'mix'" @setting="handleSetting"></mix-layout>

    <!--配置弹窗-->
    <setting-drawer ref="settingDrawerRef"></setting-drawer>
</template>

<script setup lang="ts">
import { DefaultLayout, TopMenuLayout, SettingDrawer, MixLayout } from './components';
import { useAppStore } from '@/store';

const appStore = useAppStore();

const settingDrawerRef = useTemplateRef('settingDrawerRef');

const layout = computed(() => {
    return appStore.layoutSetting.layout;
});

const handleSetting = () => {
    settingDrawerRef.value?.open();
};
</script>

<style scoped lang="scss"></style>
