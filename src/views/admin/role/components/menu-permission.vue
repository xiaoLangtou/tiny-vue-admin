<template>
    <div class="w-full">
        <div class="pt-2 pl-2 pb-3 pr-2 box-border">
            <div class="top-1 z-10 flex gap-3 items-center justify-between mb-5">
                <a-dropdown-button type="primary" @click="saveRoleMenuPermission">
                    提交
                    <template #overlay>
                        <a-menu @click="handleMenuClick">
                            <a-menu-item key="refresh">刷新数据</a-menu-item>
                            <a-menu-item key="select">选择全部</a-menu-item>
                            <a-menu-item key="unselect">取消选择</a-menu-item>
                            <a-menu-divider />
                            <a-menu-item key="expand">展开全部</a-menu-item>
                            <a-menu-item key="collapse">折叠全部</a-menu-item>
                        </a-menu>
                    </template>
                </a-dropdown-button>
            </div>
            <div class="tree-content mt-5 h-[calc(100vh_-240px)] overflow-y-auto pb-10 mb-5">
                <a-tree
                    ref="treeRef"
                    v-model:checked-keys="checkedMenuKeys"
                    v-model:expanded-keys="expandedKeys"
                    class="xlt-ant-tree pl-2"
                    :tree-data="menuTreeData"
                    checkable
                    :field-names="{ title: 'name', key: 'id', children: 'children' }"
                    show-line
                    @check="handleMenuChecked"
                >
                    <template #title="{ data }">
                        <div class="flex items-center gap-3 justify-between w-full pr-1">
                            <span class="flex items-center gap-2">{{ data.name }} </span>
                            <span v-if="data.path" class="max-w-[240px] break-all overflow-ellipsis overflow-hidden">{{
                                data.path
                            }}</span>
                            <span
                                v-if="data.permission"
                                class="max-w-[240px] break-all overflow-ellipsis overflow-hidden"
                                >{{ data.permission }}</span
                            >
                        </div>
                    </template>
                </a-tree>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useMessage } from '@/composables';
import { getMenuTreeList } from '@/service/apis/menu';
import { changeRoleMenu } from '@/service/apis/role.ts';
import type { IRole } from '@/service/interface/role';
import type { MenuProps, Tree } from 'ant-design-vue';

defineOptions({
    name: 'MenuPermission',
});

const { message } = useMessage();
const props = defineProps({
    role: {
        type: Object as PropType<IRole>,
        default: () => ({}),
    },
});

const menuTreeData = ref<any[]>([]);
const expandedKeys = ref<number[]>([]);
const checkedMenuKeys = ref<string[]>([]);
const checkedMenuNodes = ref<any[]>([]);

const treeRef = useTemplateRef<typeof Tree>('treeRef');

const saveRoleMenuPermission = async () => {
    try {
        // 筛选出所有的buttons
        const buttons = checkedMenuKeys.value
            .filter((item) => item.includes('button:'))
            .map((item) => Number(item.split(':')[1]));
        const menuIds = checkedMenuKeys.value.filter((item) => !item.includes('button:')).map((item) => Number(item));

        await changeRoleMenu({ id: props.role.id, menus: menuIds, buttons });
        message.success('保存成功');
    } catch (e) {
        console.log(e);
    }
};

const setTreeOpenOrClose = (expend: boolean) => {
    const ids = extractIds(menuTreeData.value);
    expandedKeys.value = expend ? ids : [];
};

const getAllMenu = async () => {
    // 获取所有菜单
    const { data } = await getMenuTreeList();
    menuTreeData.value = transformMenuTree(data);
    // 判断当前菜单是否已经全选
    if (props.role.menus) {
        // 设置选中的菜单
        await nextTick();
        checkedMenuKeys.value = props.role.menus as unknown as string[];
        setTreeOpenOrClose(true);
    }
};

const extractIds = (data: any[]): number[] => {
    const ids: number[] = [];
    data.forEach((item: any) => {
        ids.push(item.id);
        if (item.children && item.children.length > 0) {
            ids.push(...extractIds(item.children));
        }
    });
    return ids;
};

const handleMenuClick: MenuProps['onClick'] = (e) => {
    switch (e.key) {
        case 'expand':
            setTreeOpenOrClose(true);
            break;
        case 'collapse':
            setTreeOpenOrClose(false);
            break;
        case 'select':
            checkedMenuKeys.value = extractIds(menuTreeData.value) as unknown as string[];
            break;
        case 'unselect':
            checkedMenuKeys.value = [];
            break;
        case 'refresh':
            getAllMenu();
            break;
    }
};

/**
 * 实现一个方法，将 菜单数据和所有的菜单下的buttons转换成一个树形结构
 */
interface MenuItem {
    id: string;
    name: string;
    menuType: string; // "menu" | "button"
    children?: MenuItem[];
    buttons?: ButtonItem[];
}

interface ButtonItem {
    id: string;
    name: string;
    permission: string;
    menuId: string | number;
}

const transformMenuTree = (menuTree: MenuItem[]): MenuItem[] => {
    return menuTree.map((menu) => {
        const newMenu = { ...menu };

        // 确保 children 是数组
        if (!newMenu.children) newMenu.children = [];

        // 如果有 buttons，就转换成 children 的一部分
        if (newMenu.buttons && newMenu.buttons.length > 0) {
            const buttonChildren = newMenu.buttons.map((button) => ({
                id: `button:${button.id}`,
                name: button.name,
                permission: button.permission,
                parentId: button.menuId,
                menuType: 'button', // 这里标记为按钮类型
            }));

            // 插入到 children
            newMenu.children.push(...buttonChildren);
        }

        // 递归处理子菜单
        if (newMenu.children.length > 0) {
            newMenu.children = transformMenuTree(newMenu.children);
        }

        // 移除原 buttons 字段
        delete newMenu.buttons;

        return newMenu;
    });
};
const handleMenuChecked = (checkedKeys: string[], { checkedNodes }: { node: any; checkedNodes: any[] }) => {
    checkedMenuNodes.value = checkedNodes;
};
watch(
    () => props.role,
    (val) => {
        if (!val.id) return;
        getAllMenu();
    },
    { immediate: true },
);

defineExpose({
    getAllMenu,
});
</script>
