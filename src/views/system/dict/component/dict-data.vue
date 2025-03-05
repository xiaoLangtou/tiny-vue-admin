<template>
    <div>
        <!-- 搜索表单 -->
        <search-form :fields="searchFields" @search="handleSearch" @reset="handleReset">
            <template #actions>
                <a-button type="primary" @click="handleAdd">
                    <template #icon>
                        <PlusOutlined />
                    </template>
                    新增字典项
                </a-button>
            </template>
        </search-form>

        <!-- 数据表格 -->
        <data-table
            :columns="columns"
            :data-source="tableData"
            :pagination="pagination"
            :loading="loading"
            @change="handleTableChange"
        >
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'action'">
                    <a-space>
                        <a-button type="link" @click="handleEdit(record)">
                            <template #icon>
                                <EditOutlined />
                            </template>
                            修改
                        </a-button>
                        <a-button type="link" danger @click="handleDelete(record)">
                            <template #icon>
                                <DeleteOutlined />
                            </template>
                            删除
                        </a-button>
                    </a-space>
                </template>
            </template>
        </data-table>
    </div>
    <!-- 新增/修改字典的弹窗 -->
    <!--    <dict-data-add ref="addDialog" @close="getList" />-->
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons-vue';
// import DictDataAdd from './dict-data-add.vue';
import { IDictData, IDictType } from '@/service/interface/dict';
import { getDictDataList, removeDictData } from '@/service/apis/dict';
import { message } from 'ant-design-vue';
import type { TablePaginationConfig } from 'ant-design-vue';

const props = defineProps<{ dictType: IDictType }>();
const tableData = ref<IDictData[]>([]);
const addDialog = ref();
const loading = ref(false);

// 搜索字段配置
const searchFields = [
    { name: 'dictLabel', label: '标签名' },
    { name: 'dictValue', label: '数据值' },
];

// 表格列配置
const columns = [
    { title: '标签名', dataIndex: 'dictLabel', key: 'dictLabel' },
    { title: '数据值', dataIndex: 'dictValue', key: 'dictValue' },
    { title: '字典类型', dataIndex: 'dictType', key: 'dictType' },
    { title: '描述', dataIndex: 'dictRemark', key: 'dictRemark' },
    { title: '排序', dataIndex: 'dictSort', key: 'dictSort', width: 80 },
    { title: '操作', key: 'action', width: 150 },
];

// 分页配置
const pagination = reactive<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    showQuickJumper: true,
});

// 监听字典类型变化
watch(
    () => props.dictType,
    () => getList(),
);

// 获取列表数据
const getList = async (params = {}) => {
    if (!props.dictType?.id) return;
    loading.value = true;
    try {
        const { data } = await getDictDataList(Number(props.dictType.id), pagination.current, pagination.pageSize);
        tableData.value = data.records || [];
        pagination.total = data.pager?.total || 0;
    } catch (error) {
        console.error(error);
    } finally {
        loading.value = false;
    }
};

// 表格变化处理
const handleTableChange = (pag: TablePaginationConfig) => {
    pagination.current = pag.current || 1;
    pagination.pageSize = pag.pageSize || 10;
    getList();
};

// 搜索处理
const handleSearch = (values: any) => {
    pagination.current = 1;
    getList(values);
};

// 重置处理
const handleReset = () => {
    pagination.current = 1;
    getList();
};

// 新增处理
const handleAdd = () => {
    addDialog.value?.openDialog('add', {
        dictTypeId: props.dictType.id,
        dictType: props.dictType.dictCode,
    });
};

// 编辑处理
const handleEdit = (record: IDictData) => {
    addDialog.value?.openDialog('edit', record);
};

// 删除处理
const handleDelete = async (record: IDictData) => {
    try {
        await removeDictData(record.id);
        message.success('删除成功');
        await getList();
    } catch (error) {
        message.error('删除失败');
    }
};
</script>
