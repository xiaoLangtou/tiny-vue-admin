import { IconView } from '@/components';
import { useDeepClone } from '@/composables/common/useDeepClone.ts';
import router from '@/router';
import type { MenuOptions } from '@/service/interface/menu.ts';
import { useMenuStore } from '@/store/module';
import { computed, h } from 'vue';

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

export function useMenu({ mode = 'inline', layout = 'default' }) {
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

    const initMenuState = () => {
        const currentRoute = useRoute().fullPath;
        const routeItem = menuStore.flatMeuList.find((item) => item.path === currentRoute);

        state.openKeys = [];
        state.selectedKeys = [];
        // 三种菜单模式
        if (routeItem) {
            state.selectedKeys = [routeItem.id.toString()];
            if (
                routeItem.parentId !== undefined &&
                (routeItem.parentId as unknown as string) !== '-1' &&
                mode === 'inline'
            ) {
                console.log('initMenuState', routeItem);
                state.openKeys = [routeItem.parentId.toString()];
            }
        }
        if (['mix'].includes(layout)) {
            // 另外一种形式
            if (routeItem) {
                state.selectedKeys = [routeItem.id.toString()];
                if (routeItem.parentId !== undefined && (routeItem.parentId as unknown as number) !== -1) {
                    state.openKeys = [routeItem.parentId.toString()];
                }
            }
        }
    };

    initMenuState();

    return {
        state,
        getMenuTreeData,
        handleMenuClick,
        menuStore,
    };
}
