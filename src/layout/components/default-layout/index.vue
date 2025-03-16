<template>
    <a-layout class="min-h-screen">
        <a-layout-sider
            :collapsed="menuStore.isCollapsed"
            class="layout-sider h-fullh-full !bg-white dark:!bg-bg-darkLayout"
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
                                :open-keys="state.openKeys"
                                :selected-keys="state.selectedKeys"
                                :items="menuItems"
                            ></Menu>
                        </div>
                    </div>
                    <back-in-out-left>
                        <div class="aside-setting h-16 w-full border-t border-t-gray-100 dark:border-t-gray-700">
                            <div class="pl-2 pr-2 box-border flex items-center h-full">
                                <a-button
                                    class="w-full flex items-center justify-center gap-2 h-10"
                                    @click="useLoginStore().logoutAction()"
                                >
                                    <log-out :size="18" />
                                    <span v-if="!menuStore.isCollapsed">退出登录</span>
                                </a-button>
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

            <!--            <a-layout-footer class="text-center h-16 text-gray-500 dark:text-gray-400">-->
            <!--                Ant Design ©2018 Created by Ant UED-->
            <!--            </a-layout-footer>-->
        </a-layout>
    </a-layout>
</template>

<script lang="ts" setup>
import { BackInOutLeft, Breadcrumb } from '@/components';
import { useMenu } from '@/composables/common/useMenu.ts';
import HeaderRightBar from '@/layout/components/header-right-bar/index.vue';
import Logo from '@/layout/components/logo/index.vue';
import { useLoginStore, useMenuStore } from '@/store/module';
import { LogOut, PanelTopClose, PanelTopOpen } from 'lucide-vue-next';
// 初始化默认主题
import { LayoutPage } from '../index';
import UserInfo from './user-info.vue';

const emit = defineEmits(['setting']);
const menuStore = useMenuStore();

const { getMenuTreeData, state } = useMenu({ mode: 'inline', layout: 'default' });

const menuItems = computed(() => getMenuTreeData());

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
