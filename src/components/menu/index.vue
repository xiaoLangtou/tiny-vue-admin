<template>
    <a-menu
        v-bind="$attrs"
        v-model:open-keys="openKeys"
        v-model:selected-keys="selectedKeys"
        :mode="mode"
        :items="items"
        @click="handleClick"
        @open-change="onOpenChange"
        @select="handleMenuSelect"
    ></a-menu>
</template>

<script setup lang="ts">
import type { IMenuOptions } from '@/composables/common/useMenu.ts';
import { useWindowOpen } from '@/composables/common/useWindowOpen.ts';
import { MenuLayoutMode } from '@/global/enums';
import router from '@/router';
import type { MenuProps } from 'ant-design-vue';

defineOptions({
    name: 'AppMenu',
});

interface MenuCustomProps {
    isCollapsed?: boolean;
    layoutMode?: MenuLayoutMode;
    items: IMenuOptions[];
    selectedKeys?: string[];
    openKeys?: string[];
}

type Props = MenuProps & MenuCustomProps;

const props = withDefaults(defineProps<Props>(), {
    isCollapsed: false,
    mode: 'inline',
    layoutMode: MenuLayoutMode.DEFAULT,
    selectedKeys: () => [] as string[], // ✅ 确保 selectedKeys 是字符串数组
    openKeys: () => [] as string[], // ✅ 确保 openKeys 是字符串数组
});

const emit = defineEmits(['clickTopMenu']);

const appTitle = import.meta.env.VITE_GLOB_APP_TITLE;

const openKeys = ref(props.openKeys);
const selectedKeys = ref(props.selectedKeys);
const rootSubmenuKeys = ref<string[]>([]);

// 监听 props 变化，确保同步
watch(
    () => [props.selectedKeys, props.openKeys],
    ([newSelectedKeys, newOpenKeys]) => {
        selectedKeys.value = [...newSelectedKeys];
        openKeys.value = [...newOpenKeys];
    },
    { immediate: true, deep: true },
);

// 处理菜单点击
const handleClick = ({ item }: { item: IMenuOptions }) => {
    if (item.meta.isIframe) {
        console.log('item', item.meta.path);
        useWindowOpen({
            url: item.meta.path,
            target: '_blank',
        });
        return;
    }
    if (props.layoutMode === MenuLayoutMode.TOP) {
        emit('clickTopMenu', item);
    } else if (item.meta?.path) {
        useTitle(`${item?.meta?.title} - ${appTitle}`);
        router.push(item.meta.path);
    }
};

const onOpenChange = (_openKeys: string[]) => {
    openKeys.value = _openKeys.length > 1 ? [_openKeys[_openKeys.length - 1]] : _openKeys;
};

const handleMenuSelect = (e: { key: string; keyPath: string[] }) => {
    console.log('handleMenuSelect', e);
    if (!rootSubmenuKeys.value.includes(e.key) && e.keyPath.length <= 1) {
        openKeys.value = [];
    }
};

watch(
    () => props.items,
    () => {
        rootSubmenuKeys.value = props.items
            .filter((item) => item?.meta?.children?.length)
            .map((item) => item.key as string);
    },
    { immediate: true },
);
</script>

<style lang="scss">
.ant-menu-root.ant-menu-inline {
    border-inline-end: none !important;
}
</style>
