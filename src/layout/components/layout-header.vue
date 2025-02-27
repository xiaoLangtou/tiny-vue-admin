<!--
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-22 16:56:44
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-02-27 14:12:49
 * @FilePath: src/layout/components/layout-header.vue
 * @Description: 页面公共头部
 -->
<template>
    <div class="layout-header">
        <div class="layout-header__left">
            <div class="fold-btn-wrapper">
                <Component :is="menu.isCollapsed ? PanelTopClose : PanelTopOpen" @click="toggleMenuStyle"></Component>
            </div>
            <Breadcrumb :items="[{ name: '首页', path: '/' }, { name: '系统设置' }]"></Breadcrumb>
        </div>
        <div class="layout-header__right"></div>
    </div>
</template>

<script setup lang="ts">
import { PanelTopClose, PanelTopOpen } from 'lucide-vue-next';
import { Breadcrumb } from '@/components';
import { useMenuStore } from '@/store/module';

const menu = useMenuStore();

defineOptions({
    name: 'LayoutHeader',
});

const toggleMenuStyle = () => {
    menu.setCollapsed({ isCollapsed: !menu.isCollapsed });
};
</script>

<style lang="scss" scoped>
.layout-header {
    @apply w-full h-full flex items-center justify-between px-4;

    .layout-header__left {
        @apply flex items-center gap-3;
    }

    .fold-btn-wrapper {
        @apply flex items-center justify-center  mr-4 bg-gray-100 dark:bg-gray-700 w-[28px] h-[28px] rounded hover:rounded-full cursor-pointer dark:divide-red-500;
        svg {
            transform: rotate(90deg);
        }
    }
}
</style>
