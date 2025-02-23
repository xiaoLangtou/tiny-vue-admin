<!--
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-22 20:21:41
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-02-23 13:44:34
 * @FilePath: src/components/menu/index.vue
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 -->
<template>
    <div class="menu-router">
        <tiny-tree-menu
            :data="menuTreeData"
            :show-filter="false"
            node-key="id"
            width-adapt
            accordion
            only-check-children
            check-strictly
            wrap
            @current-change="currentChange"
        >
            <template #default="slotScope">
                <div :class="['flex items-center gap-2', slotScope.node.data.children.length ? 'has-child' : '']">
                    <icon-view :model-value="slotScope.node.data.meta.icon"></icon-view>
                    <span class="custom-node">{{ slotScope.node.label }}</span>
                </div>
            </template>
        </tiny-tree-menu>
    </div>
</template>

<script setup lang="ts">
import { MenuOptions } from '@/service/interface/menu';
import { useMenuStore } from '@/store/module';
import { useDeepClone } from '@/hooks/useDeepClone';
import router from '@/router';

const menuStore = useMenuStore();
await menuStore.getAuthMenuList();
const rawMenuList = computed(() => useDeepClone(unref(menuStore.menuList)));

let routerTitle = [] as any;
const filterRawMenuData = (data: MenuOptions[]) => {
    const menus: MenuOptions[] = [];
    data.forEach((item) => {
        const url = item.path!;
        routerTitle.push({
            label: item.meta?.title,
            icon: item.meta?.icon,
            url: url,
        });
        menus.push({
            ...item,
            label: item.meta?.title,
            meta: {
                ...item.meta,
            },
            children: item.children ? filterRawMenuData(item.children) : [],
        });
    });
    return menus;
};

const currentChange = (node: any) => {
    if (node.children.length > 0) return;
    router.push({ path: node.path });
};

const menuTreeData = computed(() => {
    if (routerTitle.length) {
        routerTitle = [];
    }
    return filterRawMenuData(rawMenuList.value);
});
</script>
