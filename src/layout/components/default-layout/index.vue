<template>
    <a-layout class="min-h-screen">
        <a-layout-sider
            :collapsed="menuStore.isCollapsed"
            class="layout-sider !bg-white dark:!bg-bg-darkLayout"
            :class="checked ? '!absolute z-[99]' : ''"
            :width="230"
            :collapsed-width="collapsedWidth"
            @mouseenter="mouseEvent(false)"
            @mouseleave="mouseEvent(true)"
        >
            <suspense>
                <div class="layout-aside flex flex-col h-full">
                    <div class="flex-1 overflow-hidden">
                        <div
                            class="aside-top pt-6 pb-6 pl-2 pr-2 flex items-center"
                            :class="!menuStore.isCollapsed ? 'justify-between' : 'justify-center'"
                        >
                            <logo class="flex-shrink-0"></logo>
                            <a-switch
                                v-if="!menuStore.isCollapsed"
                                v-model:checked="checked"
                                @change="handleCheckChange"
                            ></a-switch>
                        </div>
                        <div class="aside-menu overflow-y-auto flex-1 p-2">
                            <user-info></user-info>
                            <Menu
                                v-model:openKeys="menuOpenKeys"
                                v-model:selectedKeys="menuSelectedKeys"
                                :items="menuItems"
                            ></Menu>
                        </div>
                    </div>
                    <back-in-out-left>
                        <div
                            v-if="!menuStore.isCollapsed"
                            class="aside-setting h-16 w-full border-t border-t-gray-100 dark:border-t-gray-700"
                        >
                            <div class="setting-box h-full flex items-center justify-center gap-3">
                                <theme-toggle></theme-toggle>
                                <button
                                    class="setting-icon-btn w-6 h-6 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                    title="帮助"
                                >
                                    <CircleHelp :size="18" :stroke-width="2.25" absoluteStrokeWidth />
                                </button>
                                <button
                                    class="setting-icon-btn w-6 h-6 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                    title="返回"
                                >
                                    <ArrowLeft :size="18" :stroke-width="2.25" absoluteStrokeWidth />
                                </button>
                            </div>
                        </div>
                    </back-in-out-left>
                </div>
            </suspense>
        </a-layout-sider>

        <a-layout class="layout-content" :style="{ 'margin-left': checked ? `${collapsedWidth}px` : '' }">
            <a-layout-header class="layout-header !bg-bg-layout dark:!bg-bg-darkContainer dark:shadow-gray-700 !px-4">
                <div class="flex items-center justify-between w-full h-full">
                    <div class="flex items-center gap-3">
                        <button
                            v-if="!checked"
                            class="fold-btn p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            @click="toggleMenuStyle"
                        >
                            <component :is="menuStore.isCollapsed ? PanelTopClose : PanelTopOpen" :size="20" />
                        </button>
                        <Breadcrumb></Breadcrumb>
                    </div>
                    <header-right-bar @setting="() => emit('setting')"></header-right-bar>
                </div>
            </a-layout-header>

            <a-layout-content class="flex-1 overflow-hidden">
                <layout-page></layout-page>
            </a-layout-content>

            <a-layout-footer class="text-center h-16 text-gray-500 dark:text-gray-400">
                Ant Design ©2018 Created by Ant UED
            </a-layout-footer>
        </a-layout>
    </a-layout>
</template>

<script lang="ts" setup>
// 初始化默认主题
import { LayoutPage } from '../index';
import { useMenuStore } from '@/store/module';
import { ArrowLeft, CircleHelp, PanelTopClose, PanelTopOpen } from 'lucide-vue-next';
import HeaderRightBar from '@/layout/components/header-right-bar/index.vue';
import { BackInOutLeft, Breadcrumb } from '@/components';
import Logo from '@/layout/components/logo/index.vue';
import { useMenu } from '@/composables/business/useMenu';
import UserInfo from './user-info.vue';

const emit = defineEmits(['setting']);
const menuStore = useMenuStore();

const { getMenuTreeData } = useMenu();

const menuItems = computed(() => getMenuTreeData());
const menuOpenKeys = ref<string[]>([]);
const menuSelectedKeys = ref<string[]>([]);

const toggleMenuStyle = () => {
    menuStore.setCollapsed({ isCollapsed: !menuStore.isCollapsed });
};

const checked = ref<boolean>(false);
const collapsedWidth = ref<number>(80);
const handleCheckChange = () => {
    menuStore.setCollapsed({ isCollapsed: !!checked.value });
};

const mouseEvent = (action: boolean) => {
    if (checked.value) {
        menuStore.setCollapsed({ isCollapsed: action });
    }
};

defineOptions({
    name: 'DefaultLayout',
});
</script>

<style scoped lang="scss">
.layout-sider {
    border-top-right-radius: 16px;
    border-bottom-right-radius: 16px;
    @apply transition-all duration-300;
}

.layout-aside {
    @apply h-full;
}

.aside-menu {
    height: calc(100vh - 4rem - 80px);
}

.fold-btn {
    svg {
        transform: rotate(90deg);
    }
}

.setting-icon-btn {
    @apply flex items-center justify-center cursor-pointer;
}
</style>
