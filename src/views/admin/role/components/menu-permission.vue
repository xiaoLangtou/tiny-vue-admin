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
            <a-tree
                ref="treeRef"
                v-model:checked-keys="checkedMenuKeys"
                v-model:expanded-keys="expandedKeys"
                class="xlt-ant-tree pl-2"
                :tree-data="menuTreeData"
                checkable
                :field-names="{ title: 'name', key: 'id', children: 'children' }"
                show-line
            >
                <template #title="{ data }">
                    <div class="flex items-center gap-8 justify-between w-full pr-1">
                        <span class="flex items-center gap-2">{{ data.name }} </span>
                        <span v-if="data.path" class="max-w-[240px] break-all overflow-ellipsis overflow-hidden">{{
                            data.path
                        }}</span>
                        <span v-if="data.menuType === '2' && data.permission">
                            {{ data.permission }}
                        </span>
                    </div>
                </template>
            </a-tree>
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
const checkedMenuKeys = ref<number[]>([]);

const treeRef = useTemplateRef<typeof Tree>('treeRef');

const saveRoleMenuPermission = async () => {
    try {
        await changeRoleMenu({ id: props.role.id, menus: checkedMenuKeys.value });
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
    menuTreeData.value = data;

    // 判断当前菜单是否已经全选
    if (props.role.menus) {
        // 设置选中的菜单
        await nextTick();
        checkedMenuKeys.value = props.role.menus;
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
            checkedMenuKeys.value = extractIds(menuTreeData.value);
            break;
        case 'unselect':
            checkedMenuKeys.value = [];
            break;
        case 'refresh':
            getAllMenu();
            break;
    }
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
