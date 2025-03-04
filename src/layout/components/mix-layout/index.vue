<!--
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-03-04 14:32:22
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-03-04 15:46:14
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
                            is-top-menu
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
                        mode="inline"
                        class="!bg-transparent border-0"
                        is-collapsed
                        is-mix-menu
                        :mix-menu-list="subMenuList"
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
import { MenuOptions } from '@/service/interface/menu';
import router from '@/router';

const emit = defineEmits(['setting']);
const menuStore = useMenuStore();
const subMenuList = ref<MenuOptions[]>([]);
onMounted(() => {
    menuStore.setCollapsed({ isCollapsed: true });
});

const handleTopMenu = (item: MenuOptions) => {
    if (item.id && menuStore.subMenuList.has(item.id as unknown as string)) {
        subMenuList.value = menuStore.subMenuList.get(item.id as unknown as string) as MenuOptions[];
    } else {
        subMenuList.value = [];
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
