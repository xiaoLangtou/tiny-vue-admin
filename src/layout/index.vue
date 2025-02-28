<template>
    <a-layout style="min-height: 100vh">
        <a-layout-sider :collapsed="menuStore.isCollapsed" class="!bg-white dark:!bg-bg-darkLayout" :width="230">
            <suspense>
                <layout-aside></layout-aside>
            </suspense>
        </a-layout-sider>
        <a-layout>
            <a-layout-header class="!bg-white dark:!bg-bg-darkLayout shadow dark:shadow-gray-700 !ps-0.5 !pe-0.5">
                <layout-header></layout-header>
            </a-layout-header>
            <a-layout-content>
                <layout-page></layout-page>
            </a-layout-content>
            <a-layout-footer style="text-align: center" class="!pt-3 !pb-3">
                Ant Design ©2018 Created by Ant UED</a-layout-footer
            >
        </a-layout>
    </a-layout>
</template>

<script lang="ts" setup>
// 初始化默认主题
import { LayoutAside, LayoutHeader, LayoutPage } from './components';
import { useMenuStore } from '@/store/module';
import { useAppStore } from '@/store';

const menuStore = useMenuStore();
const appStore = useAppStore();

const asideWidth = computed(() => (menuStore.isCollapsed ? 80 : 220));

const pattern = ref('fashion');
</script>

<style scoped lang="scss">
.layout {
    width: 100%;
    height: 100%;
}
</style>
