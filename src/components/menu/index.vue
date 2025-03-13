<!--
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-22 20:21:41
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-03-13 00:26:46
 * @FilePath: src/components/menu/index.vue
 * @Description: 修改菜单样式
 -->
<template>
    <a-menu
        v-bind="$attrs"
        v-model:selected-keys="state.selectedKeys"
        :open-keys="state.openKeys"
        :mode="mode"
        :items="items"
        @click="handleClick"
        @open-change="onOpenChange"
    ></a-menu>
</template>

<script setup lang="ts">
import type { IMenuOptions } from '@/composables/business/useMenu';
import { MenuLayoutMode } from '@/global/enums';
import router from '@/router';
import type { MenuProps } from 'ant-design-vue';

defineOptions({
    name: 'AppMenu',
});

const props = withDefaults(defineProps<Props>(), {
    isCollapsed: false,
    mode: 'inline',
    layoutMode: MenuLayoutMode.DEFAULT,
});

const emit = defineEmits(['clickTopMenu']);

const appTitle = import.meta.env.VITE_GLOB_APP_TITLE;

const state = reactive<Record<string, string[]>>({
    rootSubmenuKeys: [],
    openKeys: [],
    selectedKeys: [],
});

interface MenuCustomProps {
    isCollapsed?: boolean;
    layoutMode?: MenuLayoutMode;
    items: IMenuOptions[];
}

type Props = MenuProps & MenuCustomProps;

// 处理菜单点击
const handleClick = ({ item }: { item: IMenuOptions }) => {
    if (props.layoutMode === MenuLayoutMode.TOP) {
        emit('clickTopMenu', item);
    } else if (item.meta?.path) {
        useTitle(`${item?.meta?.title} - ${appTitle}`);
        router.push(item.meta.path);
    }
};

const onOpenChange = (openKeys: string[]) => {
    const latestOpenKey = openKeys.find((key) => state.openKeys.indexOf(key) === -1);
    if (latestOpenKey !== undefined && state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        state.openKeys = openKeys;
    } else {
        state.openKeys = latestOpenKey ? [latestOpenKey] : [];
        console.log('openKeys', latestOpenKey);
    }
};

watch(
    () => props.items,
    () => {
        const rootSubmenuKeys = props.items
            .filter((item) => item?.meta?.children && item.meta?.children?.length)
            .map((item) => item?.key);
        state.rootSubmenuKeys = rootSubmenuKeys as string[];
    },
    { immediate: true },
);
</script>

<style lang="scss">
.ant-menu-root.ant-menu-inline {
    border-inline-end: none !important;
}
</style>
