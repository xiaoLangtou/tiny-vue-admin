<template>
    <a-layout class="min-h-screen flex flex-col">
        <!-- 头部 -->
        <a-layout-header
            class="layout-header !bg-white dark:!bg-bg-darkLayout shadow dark:shadow-gray-700 !px-4 sticky top-0 z-[999]"
        >
            <div class="flex items-center justify-between w-full h-full">
                <div class="flex items-center gap-4">
                    <Logo class="w-40 flex-shrink-0"></Logo>
                    <suspense>
                        <Menu
                            mode="horizontal"
                            :items="menuItems"
                            :open-keys="state.openKeys"
                            :selected-keys="state.selectedKeys"
                            class="!bg-transparent border-0"
                        ></Menu>
                    </suspense>
                </div>
                <header-right-bar @setting="() => emit('setting')"></header-right-bar>
            </div>
        </a-layout-header>

        <!-- 主体内容区域 -->
        <a-layout-content class="flex-1 flex flex-col overflow-hidden">
            <div class="breadcrumb px-4 py-3">
                <Breadcrumb></Breadcrumb>
            </div>

            <!-- 内容区域 -->
            <div class="flex-1 overflow-hidden">
                <layout-page breadcrumb-height="48px"></layout-page>
            </div>
        </a-layout-content>

        <!-- 底部 -->
        <a-layout-footer class="text-center h-16 text-gray-500 dark:text-gray-400">
            Ant Design ©2018 Created by Ant UED
        </a-layout-footer>
    </a-layout>
</template>

<script lang="ts" setup>
import { Breadcrumb } from '@/components';
import { useMenu } from '@/composables/common/useMenu.ts';
import { LayoutPage } from '@/layout/components';
import HeaderRightBar from '@/layout/components/header-right-bar/index.vue';
import Logo from '@/layout/components/logo/index.vue';

const emit = defineEmits(['setting']);
const { getMenuTreeData, state } = useMenu({ mode: 'horizontal', layout: 'top' });

const menuItems = computed(() => getMenuTreeData());
defineOptions({
    name: 'TopMenuLayout',
});
</script>

<style lang="scss" scoped>
.layout-header {
    @apply flex items-center justify-between transition-colors duration-300;

    :deep(.ant-menu-horizontal) {
        @apply border-b-0 dark:bg-transparent;

        .ant-menu-item {
            @apply transition-colors duration-300;

            &:hover {
                @apply bg-gray-100 dark:bg-gray-800;
            }

            &-selected {
                @apply bg-gray-100 dark:bg-gray-800;
            }
        }
    }

    .aside-logo {
        @apply justify-start;
    }
}
</style>
