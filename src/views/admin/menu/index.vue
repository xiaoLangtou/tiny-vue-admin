<template>
    <div class="xlt-base-container">
        <div class="xlt-container">
            <!-- 数据表格 -->
            <data-table
                :data-source="tableData"
                :loading="loading"
                v-bind="{ ...tableConfig, ...toolbarConfig, addBtnText: '新增菜单' }"
                @add="handleAdd"
                @refresh="send"
            >
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'name'">
                        <span class="flex items-center">
                            <IconView :model-value="record.icon ? record.icon : 'ele-Tickets'"></IconView>
                            <span class="ml-1">{{ record.name }}</span>
                        </span>
                    </template>
                    <template v-if="column.key === 'menuType'">
                        <a-tag color="success">
                            {{ menuTypeDict[record.menuType] }}
                        </a-tag>
                    </template>
                    <template v-if="column.key === 'permission' && record.permission">
                        <a-tag v-copy="record.permission" color="success">
                            {{ record.permission }}
                        </a-tag>
                    </template>
                    <template v-if="column.key === 'controls'">
                        <div class="xlt-flex-center">
                            <a-button
                                v-if="record.menuType !== '2'"
                                v-auth="['menu:add:btn']"
                                type="link"
                                class="xlt-btn !gap-0"
                                :icon="h(Plus, { size: 16 })"
                                @click="handleAdd($event, record)"
                            >
                                新增子菜单
                            </a-button>
                            <a-button
                                type="link"
                                class="xlt-btn !gap-0"
                                :icon="h(PencilLine, { size: 16 })"
                                @click="handleEdit(record)"
                            >
                                修改
                            </a-button>
                            <a-popconfirm
                                title="确认删除该菜单吗?"
                                ok-text="确定"
                                cancel-text="取消"
                                @confirm="handleDelete(record)"
                            >
                                <a-button type="link" danger class="xlt-btn !gap-0" :icon="h(Trash2, { size: 16 })">
                                    删除
                                </a-button>
                            </a-popconfirm>
                        </div>
                    </template>
                </template>
            </data-table>
        </div>
    </div>
    <!-- 新增/修改菜单的弹窗 -->
    <menu-add ref="addDialog" @close="send" />
</template>

<script setup lang="ts">
import { useMessage, useTableConfig } from '@/composables';
import { deleteMenu, getMenuDetail, getMenuTreeList } from '@/service/apis/menu';
import type { IMenu } from '@/service/interface/menu';
import { useRequest } from 'alova/client';
import { PencilLine, Plus, Trash2 } from 'lucide-vue-next';
import { h } from 'vue';
import MenuAdd from './components/add.vue';

const { message } = useMessage();
const addDialog = useTemplateRef<typeof MenuAdd>('addDialog');
const menuTypeDict = reactive<Record<string, string>>({
    0: '目录',
    1: '菜单',
    2: '按钮',
});

const { tableConfig, toolbarConfig } = useTableConfig({
    columns: [
        { title: '菜单名称', dataIndex: 'name', key: 'name' },
        { title: '类型', dataIndex: 'menuType', key: 'menuType' },
        { title: '权限标识', dataIndex: 'permission', key: 'permission' },
        { title: '路由地址', dataIndex: 'path', key: 'path' },
        { title: '组件路径', dataIndex: 'component', key: 'component' },
        { title: '排序', dataIndex: 'sortOrder', key: 'sortOrder' },
    ],
    indexWidth: 110,
    controlsWidth: 260,
});
const tableData = ref<IMenu[]>([]);

const removeChildrenAttr = (data: any[]) => {
    if (!data) return [];
    data.forEach((item) => {
        if (item.children && item.children.length <= 0) {
            delete item.children;
        } else {
            removeChildrenAttr(item.children);
        }
    });
    return data;
};
const { send, loading } = useRequest(() => getMenuTreeList(), {
    focus: true,
}).onSuccess(({ data }) => {
    console.log(data?.data, '菜单数据');
    tableData.value = removeChildrenAttr(data?.data ?? []);
});

const handleAdd = (event: Event, record?: IMenu) => {
    addDialog.value?.openDialog('add', { parentId: record?.id });
};

const handleEdit = async (record: IMenu) => {
    if (!record.id) return;
    const { data } = await getMenuDetail(record.id);
    addDialog.value?.openDialog('edit', data);
};

const handleDelete = async (record: IMenu) => {
    try {
        await deleteMenu(record.id!);
        message.success('删除成功');
        await send();
    } catch {
        message.error('删除失败');
    }
};
</script>

<style lang="scss" scoped>
:deep(.ant-table-cell-content) {
    .ant-btn-link {
        @apply pr-1 pl-1;
    }
}
</style>
