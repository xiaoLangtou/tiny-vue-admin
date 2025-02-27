<!--
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-22 20:21:41
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-02-27 11:26:56
 * @FilePath: src/components/menu/index.vue
 * @Description: 修改菜单样式
 -->
<template>
    <a-menu
        v-model:openKeys="state.openKeys"
        v-model:selectedKeys="state.selectedKeys"
        mode="inline"
        :items="menuTreeData"
    ></a-menu>
</template>

<script setup lang="ts">
import { computed, h, ref } from 'vue';
import { MenuOptions } from '@/service/interface/menu';
import { useMenuStore } from '@/store/module';
import { useDeepClone } from '@/hooks/useDeepClone';
import router from '@/router';
import { IconView } from '@/components';

interface IMenuOptions {
    key: string | number;
    icon: VNode;
    label: string;
    title: string;
    meta: MenuOptions;
    children?: IMenuOptions[];
}

const props = defineProps({
    isCollapsed: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
});

const state = reactive({
    collapsed: true,
    selectedKeys: [],
    openKeys: [],
    preOpenKeys: [],
});

const menuStore = useMenuStore();
await menuStore.getAuthMenuList();
const rawMenuList = computed(() => useDeepClone(unref(menuStore.menuList)));

const filterRawMenuData = (data: MenuOptions[]) => {
    const menus: IMenuOptions[] = [];
    data.forEach((item) => {
        const url = item.path!;
        const _menuItem: IMenuOptions = {
            key: item.id,
            icon: h(IconView, { modelValue: item.meta?.icon }),
            label: item.meta?.title,
            title: item.meta?.title,
            meta: {
                ...item,
                ...item.meta,
            },
        };
        if (item.children?.length) {
            _menuItem.children = filterRawMenuData(item.children);
        }

        menus.push(_menuItem);
    });
    return menus;
};

const menuTreeData = computed(() => filterRawMenuData(rawMenuList.value));
</script>

<style lang="scss">
.ant-menu-root.ant-menu-inline {
    border-inline-end: none !important;
}
</style>
