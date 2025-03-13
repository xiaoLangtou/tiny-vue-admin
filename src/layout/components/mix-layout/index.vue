<!--
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-03-04 14:32:22
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-03-12 16:55:14
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
                width="200"
                :collapsed="menuStore.isCollapsed"
                class="layout-sider !bg-white dark:!bg-bg-darkLayout"
                @mouseenter="menuStore.setCollapsed({ isCollapsed: false })"
                @mouseleave="menuStore.setCollapsed({ isCollapsed: true })"
            >
                <suspense>
                    <Menu
                        v-model:open-keys="menuOpenKeys"
                        v-model:selected-keys="menuSelectedKeys"
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
import Logo from '@/layout/components/logo/index.vue';
import HeaderRightBar from '@/layout/components/header-right-bar/index.vue';
import { LayoutPage } from '@/layout/components';
import { useMenuStore } from '@/store/module';
import type { MenuOptions } from '@/service/interface/menu';
import router from '@/router';
import { useMenu } from '@/composables/business/useMenu';

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
const { getMenuTreeData } = useMenu();

const menuOpenKeys = ref<string[]>([]);
const menuSelectedKeys = ref<string[]>([]);
const subMenuList = ref<MenuOptions[]>([]);

const topMenuItems = computed(() => getMenuTreeData({ isTopMenu: true }));
const subMenuItems = computed(() => getMenuTreeData({ isMixMenu: true, mixMenuList: subMenuList.value }));

onMounted(() => {
    menuStore.setCollapsed({ isCollapsed: true });
});

const handleTopMenu = (item: MenuOptions) => {
    if (item.id && menuStore.subMenuList.has(item.id as unknown as string)) {
        subMenuList.value = menuStore.subMenuList.get(item.id as unknown as string) as MenuOptions[];
        // 如果有子菜单，展开侧边栏
        menuStore.setCollapsed({ isCollapsed: false });
    } else {
        subMenuList.value = [];
        menuStore.setCollapsed({ isCollapsed: true });
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        item.path && router.push({ path: item.path });
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
