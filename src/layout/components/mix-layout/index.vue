<!--
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-03-04 14:32:22
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-03-14 15:10:35
 * @FilePath: src/layout/components/mix-layout/index.vue
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 -->
<template>
    <a-layout>
        <a-layout-header
            class="layout-header !bg-white dark:!bg-bg-darkLayout shadow dark:shadow-gray-700 !px-4 sticky top-0 z-[999]"
        >
            <div class="flex items-center justify-between w-full h-full">
                <div class="flex items-center gap-4">
                    <Logo class="w-40 flex-shrink-0"></Logo>
                    <suspense>
                        <Menu
                            mode="horizontal"
                            :items="topMenuItems"
                            :layout-mode="MenuLayoutMode.TOP"
                            :selected-keys="state.openKeys"
                            class="!bg-transparent border-0"
                            @click-top-menu="handleTopMenu"
                        ></Menu>
                    </suspense>
                </div>
                <header-right-bar @setting="() => emit('setting')"></header-right-bar>
            </div>
        </a-layout-header>
        <a-layout>
            <a-layout-sider
                v-if="subMenuItems.length > 0"
                width="200"
                :collapsed="menuStore.isCollapsed"
                class="layout-sider !bg-white dark:!bg-bg-darkLayout"
                @mouseenter="menuStore.setCollapsed({ isCollapsed: false })"
                @mouseleave="menuStore.setCollapsed({ isCollapsed: true })"
            >
                <suspense>
                    <Menu
                        v-model:selected-keys="state.selectedKeys"
                        mode="inline"
                        class="!bg-transparent border-0"
                        :items="subMenuItems"
                        :layout-mode="MenuLayoutMode.MIX"
                    ></Menu>
                </suspense>
            </a-layout-sider>
            <a-layout>
                <layout-page breadcrumb-height="0px"></layout-page>
                <a-layout-footer class="text-center h-16 text-gray-500 dark:text-gray-400">
                    Ant Design ©2018 Created by Ant UED
                </a-layout-footer>
            </a-layout>
        </a-layout>
    </a-layout>
</template>
<script lang="ts" setup>
import { useMenu } from '@/composables/common/useMenu.ts';
import { LayoutPage } from '@/layout/components';
import HeaderRightBar from '@/layout/components/header-right-bar/index.vue';
import Logo from '@/layout/components/logo/index.vue';
import router from '@/router';
import type { MenuOptions } from '@/service/interface/menu';
import { useMenuStore } from '@/store/module';

defineOptions({
    name: 'MixLayout',
});

const emit = defineEmits(['setting']);

enum MenuLayoutMode {
    DEFAULT = 'default',
    TOP = 'top',
    MIX = 'mix',
}

const menuStore = useMenuStore();
const { getMenuTreeData, state } = useMenu({ mode: 'horizontal', layout: 'mix' });

const subMenuList = ref<MenuOptions[]>(
    state.openKeys ? (menuStore.subMenuList.get(state.openKeys[0] as unknown as string) as MenuOptions[]) : [],
);

const topMenuItems = computed(() => getMenuTreeData({ isTopMenu: true }));
const subMenuItems = computed(() => getMenuTreeData({ isMixMenu: true, mixMenuList: subMenuList.value }));

onMounted(() => {
    menuStore.setCollapsed({ isCollapsed: true });
});

const handleTopMenu = (item: MenuOptions & { meta: { path: string } }) => {
    if (item.id && menuStore.subMenuList.has(item.id as unknown as string)) {
        subMenuList.value = menuStore.subMenuList.get(item.id as unknown as string) as MenuOptions[];
        // 如果有子菜单，展开侧边栏
        menuStore.setCollapsed({ isCollapsed: false });
    } else {
        subMenuList.value = [];
        menuStore.setCollapsed({ isCollapsed: true });
        console.log('item', item);
        if (item.meta.path) {
            router.push({ path: item.meta.path });
        }
    }
};
</script>
<style lang="scss" scoped>
.layout-sider {
    height: calc(100vh - 70px);
    @apply transition-all duration-300  overflow-auto;
}

.aside-logo {
    @apply justify-start;
}
</style>
