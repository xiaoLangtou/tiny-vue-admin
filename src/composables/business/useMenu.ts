import { computed, h } from 'vue';
import { useMenuStore } from '@/store/module';
import { useDeepClone } from '@/composables/common/useDeepClone';
import type { MenuOptions } from '@/service/interface/menu';
import { IconView } from '@/components';
import router from '@/router';

export interface IMenuOptions {
    key: string | number;
    id: string | number;
    icon: any;
    label: string;
    title: string;
    meta: MenuOptions;
    children?: IMenuOptions[];
}

export interface MenuState {
    collapsed: boolean;
    selectedKeys: string[];
    openKeys: string[];
    preOpenKeys: string[];
}

export function useMenu() {
    const menuStore = useMenuStore();
    const state = reactive<MenuState>({
        collapsed: true,
        selectedKeys: [],
        openKeys: [],
        preOpenKeys: [],
    });

    const rawMenuList = computed(() => useDeepClone(unref(menuStore.menuList)));
    const topMenuList = computed(() => useDeepClone(unref(menuStore.topMenuList)));

    const filterRawMenuData = (data: MenuOptions[]) => {
        const menus: IMenuOptions[] = [];
        data.forEach((item) => {
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
                const _children = filterRawMenuData(item.children);
                _children.sort((a, b) => {
                    return a.meta.sortOrder - b.meta.sortOrder;
                });
                _menuItem.children = _children;
            }
            menus.push(_menuItem);
        });
        return menus;
    };

    const getMenuTreeData = ({
        isMixMenu = false,
        isTopMenu = false,
        mixMenuList = [],
    }: {
        isMixMenu?: boolean;
        isTopMenu?: boolean;
        mixMenuList?: MenuOptions[];
    } = {}) => {
        if (isTopMenu) {
            // 顶部菜单模式下，只返回顶级菜单项，不包含子菜单
            return filterRawMenuData(topMenuList.value.map((item) => ({ ...item, children: [] })));
        } else if (isMixMenu) {
            // 混合模式下，根据传入的mixMenuList显示对应的子菜单
            return filterRawMenuData(mixMenuList);
        }
        // 默认模式下显示完整的菜单树
        return filterRawMenuData(rawMenuList.value);
    };

    const handleMenuClick = (item: IMenuOptions, isTopMenu = false) => {
        const { path } = item.meta;
        if (isTopMenu) {
            return item;
        }
        if (path) {
            router.push(path);
        }
    };

    return {
        state,
        getMenuTreeData,
        handleMenuClick,
        menuStore,
    };
}
