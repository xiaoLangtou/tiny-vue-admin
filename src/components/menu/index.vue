<!--
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-22 20:21:41
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-03-04 15:37:37
 * @FilePath: src/components/menu/index.vue
 * @Description: 修改菜单样式
 -->
<template>
    <a-menu
        v-model:openKeys="state.openKeys"
        v-model:selectedKeys="state.selectedKeys"
        :mode="mode"
        :items="menuTreeData"
        @click="handleCurrentMenu"
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
    id: string | number;
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
    mode: {
        type: String as PropType<'vertical' | 'horizontal' | 'inline'>,
        default: 'inline',
    },
    isTopMenu: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    isMixMenu: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    mixMenuList: {
        type: Array as PropType<MenuOptions[]>,
        default: () => [],
    },
});

const emit = defineEmits(['clickTopMenu']);

const state = reactive({
    collapsed: true,
    selectedKeys: [],
    openKeys: [],
    preOpenKeys: [],
});

const menuStore = useMenuStore();
await menuStore.getAuthMenuList();
const rawMenuList = computed(() => useDeepClone(unref(menuStore.menuList)));
const topMenuList = computed(() => useDeepClone(unref(menuStore.topMenuList)));
const subMenuList = computed(() => useDeepClone(unref(menuStore.subMenuList)));

const filterRawMenuData = (data: MenuOptions[]) => {
    const menus: IMenuOptions[] = [];
    data.forEach((item) => {
        const url = item.path!;
        const _menuItem: IMenuOptions = {
            key: item.id,
            icon: h(IconView, { modelValue: item.meta?.icon }),
            label: item.meta?.title,
            title: item.meta?.title,
            id: item.id,
            meta: {
                ...item,
                ...item.meta,
            },
        };
        if (item.children?.length) {
            let _children = filterRawMenuData(item.children);
            // 这里根据sortOrder对菜单进行排序
            _children.sort((a, b) => {
                return a.meta.sortOrder - b.meta.sortOrder;
            });

            _menuItem.children = _children;
        }

        menus.push(_menuItem);
    });
    return menus;
};

const menuTreeData = computed(() => {
    if (props.isMixMenu) {
        return filterRawMenuData(props.mixMenuList);
    } else {
        return props.isTopMenu ? filterRawMenuData(topMenuList.value) : filterRawMenuData(rawMenuList.value);
    }
});

const handleCurrentMenu = ({ item }: { item: IMenuOptions }) => {
    const { path } = item.meta;
    if (props.isTopMenu) {
        emit('clickTopMenu', item);
        return;
    }
    if (path) {
        router.push(path);
    }
};
</script>

<style lang="scss">
.ant-menu-root.ant-menu-inline {
    border-inline-end: none !important;
}
</style>
