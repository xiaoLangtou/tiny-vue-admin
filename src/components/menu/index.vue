<!--
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-22 20:21:41
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-02-26 09:20:02
 * @FilePath: src/components/menu/index.vue
 * @Description: 修改菜单样式
 -->
<template>
    <div class="menu-router" :class="{ 'menu-collapsed': isCollapsed }">
        <tiny-tree-menu
            ref="treeMenu"
            :data="menuTreeData"
            :show-filter="false"
            node-key="id"
            wrap
            only-check-children
            check-strictly
            :collapse="isCollapsed"
            @current-change="currentChange"
        >
            <template #default="slotScope">
                <template v-if="isCollapsed">
                    <tiny-dropdown :menu-options="menuOptions">
                        <div style="width: 100%">
                            <icon-view :model-value="slotScope.node.data.meta.icon"></icon-view>
                        </div>
                    </tiny-dropdown>
                </template>
                <div
                    v-else
                    :class="['flex items-center gap-2', slotScope.node.data.children.length ? 'has-child' : '']"
                >
                    <icon-view :model-value="slotScope.node.data.meta.icon"></icon-view>
                    <span class="custom-node">{{ slotScope.node.label }}</span>
                </div>
            </template>
        </tiny-tree-menu>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { MenuOptions } from '@/service/interface/menu';
import { useMenuStore } from '@/store/module';
import { useDeepClone } from '@/hooks/useDeepClone';
import router from '@/router';
import { iconStarDisable } from '@opentiny/vue-icon';

const props = defineProps({
    isCollapsed: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
});

const menuOptions = reactive({
    placement: 'bottom-start',
    options: [
        {
            label: '老友粉',
            icon: iconStarDisable(),
            children: [
                {
                    label: '老友粉 2.1',
                    children: [{ label: '狮子头 3.1' }],
                },
                { label: '老友粉 2.2' },
                { label: '老友粉 2.3', disabled: true },
            ],
        },
        {
            label: '狮子头',
            divided: true,
        },
        {
            label: '黄金糕',
            divided: true,
            icon: iconStarDisable(),
        },
    ],
});

const menuStore = useMenuStore();
await menuStore.getAuthMenuList();
const treeMenu = ref();
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
    if (props.isCollapsed.value && node.children?.length > 0) {
        // 在折叠状态下，如果点击的是父节点，不进行路由跳转
        return;
    }
    if (node.children?.length > 0) return;
    router.push({ path: node.path });
};

const menuTreeData = computed(() => {
    if (routerTitle.length) {
        routerTitle = [];
    }
    return filterRawMenuData(rawMenuList.value);
});
</script>

<style lang="scss">
.menu-router {
    transition: width 0.3s;
    //width: 220px;
    overflow: hidden;

    &.menu-collapsed {
        width: 80px;

        .tiny-tree-menu {
            --tv-TreeMenu-width: 80px;
            --tv-Tree-node-padding-left: 0;
            --tv-TreeMenu-node-vertical-line-margin-right: 0;
        }

        .custom-node {
            display: none;
        }

        .tiny-tree-menu {
            padding: 0 5px;
        }

        .tiny-tree-node__content {
            @apply justify-center;
        }

        .tiny-dropdown__suffix-inner {
            display: none;
        }

        .tree-node-icon {
            display: none;
        }

        .tree-node {
            @apply flex items-center justify-center;
        }
    }
}

.tiny-tree {
    --tv-Tree-node-content-hover-bg-color: none;
}

.tiny-tree-menu {
    --tv-TreeMenu-node-body-text-color: theme('colors.primary.950');
    --tv-TreeMenu-node-selected-bg-color: theme('colors.primary.100');
    padding: 0 10px;
    background-color: var(--tv-TreeMenu-background-color);

    &:before {
        border: none;
    }

    .tiny-tree-node__content {
        padding: 5px 0;
        border-radius: 5px;

        &:before {
            border-left: none;
        }
    }

    .tiny-tree-node {
        &.is-current {
            span {
                color: theme('colors.primary.600');
            }
        }

        &.is-expanded .has-child {
            color: theme('colors.primary.600');
        }
    }
}
</style>
