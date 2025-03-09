<template>
    <div class="xlt-base-container">
        <div class="xlt-container">
            <!-- 数据表格 -->
            <data-table
                :data-source="tableData"
                :show-pagination="false"
                v-bind="{ ...tableConfig, ...toolbarConfig }"
                @add="handleAdd"
            >
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'name'">
                        <span class="flex items-center" @click="handleEdit(record)">
                            <IconView :model-value="record.icon ? record.icon : 'ele-Tickets'"></IconView>
                            <a-link type="primary" class="ml-1">{{ record.name }}</a-link>
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
                        <a-space>
                            <a-button
                                v-if="record.menuType !== 2"
                                v-auth="['menu:add:btn']"
                                type="link"
                                @click="handleAdd($event, record)"
                            >
                                新增
                            </a-button>
                            <a-button type="link" @click="handleEdit(record)"> 修改 </a-button>
                            <a-button type="link" danger @click="handleDelete(record)"> 删除 </a-button>
                        </a-space>
                    </template>
                </template>
            </data-table>
        </div>
    </div>
    <!-- 新增/修改菜单的弹窗 -->
    <menu-add ref="addDialog" @close="getList" />
</template>

<script setup lang="ts">
import { IMenu } from '@/service/interface/menu';
import { deleteMenu, getMenuDetail, getMenuTreeList } from '@/service/apis/menu';
import { message } from 'ant-design-vue';
import MenuAdd from './components/add.vue';
import { useTableConfig } from '@/composables';
import { useRequest } from 'alova/client';

const addDialog = ref();
const pagination = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
    showTotal: (total: number) => `共 ${total} 条`,
});

const menuTypeDict = reactive<Record<string, string>>({
    0: '目录',
    1: '菜单',
    2: '按钮',
});

const { tableConfig, toolbarConfig } = useTableConfig({
    columns: [
        { title: '菜单名称', dataIndex: 'name', key: 'name' },
        { title: '图标', dataIndex: 'icon', key: 'icon' },
        { title: '类型', dataIndex: 'menuType', key: 'menuType' },
        { title: '权限标识', dataIndex: 'permission', key: 'permission' },
        { title: '路由地址', dataIndex: 'path', key: 'path' },
        { title: '组件路径', dataIndex: 'component', key: 'component' },
        { title: '排序', dataIndex: 'sortOrder', key: 'sortOrder' },
    ],
    indexWidth: 110,
});
const tableData = ref<IMenu[]>([]);

const { data, send } = useRequest(() => getMenuTreeList(), {
    focus: true,
}).onSuccess(({ data, method }) => {
    tableData.value = data?.data ?? [];
});

const handleAdd = (event: Event, record?: IMenu) => {
    addDialog.value?.openDialog('add', { parentId: record?.id });
};

const handleEdit = async (record: IMenu) => {
    if (!record.id) return;
    const { data } = await getMenuDetail(record.id);
    console.log(data);
    addDialog.value?.openDialog('edit', data);
};

const handleDelete = async (record: IMenu) => {
    try {
        await deleteMenu(record.id!);
        message.success('删除成功');
    } catch (error) {
        message.error('删除失败');
    }
};

onMounted(() => {});
</script>
