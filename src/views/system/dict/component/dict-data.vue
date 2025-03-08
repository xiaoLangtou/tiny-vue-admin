<template>
    <div class="xlt-base-container">
        <div class="xlt-container">
            <!-- 数据表格 -->
            <data-table
                :data-source="tableData"
                :pagination="pagination"
                v-bind="{ ...tableConfig, ...toolbarConfig }"
                @add="handleAdd"
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
    </div>
    <!-- 新增/修改字典的弹窗 -->
    <dict-data-add ref="addDialog" @close="getList" />
</template>

<script setup lang="tsx">
import { DeleteOutlined, EditOutlined } from '@ant-design/icons-vue';
import DictDataAdd from './dict-data-add.vue';
import { IDictData, IDictType } from '@/service/interface/dict';
import { getDictDataList, removeDictData } from '@/service/apis/dict';
import { message, Button, Popconfirm } from 'ant-design-vue';
import FadeDown from '@/components/transition/fade-down.vue';
import { useTableConfig } from '@/composables/common/useTable';

const props = defineProps<{ dictType: IDictType }>();
const tableData = ref<IDictData[]>([]);
const addDialog = ref();
const loading = ref(false);

const showSearchForm = ref(true);

const { tableConfig, toolbarConfig, pagination } = useTableConfig({
    columns: [
        { title: '标签名', dataIndex: 'dictLabel', key: 'dictLabel' },
        { title: '数据值', dataIndex: 'dictValue', key: 'dictValue' },
        { title: '字典类型', dataIndex: 'dictType', key: 'dictType' },
        { title: '描述', dataIndex: 'dictRemark', key: 'dictRemark' },
        { title: '排序', dataIndex: 'dictSort', key: 'dictSort', width: 80 },
    ],
    addBtnText: '新增字典项',
    controlsCustomRender: ({ record }) => {
        return (
            <div class="flex-center gap-8px">
                <Button type="link" primary onClick={() => handleEdit(record)}>
                    修改
                </Button>
                <Popconfirm onConfirm={() => handleDelete(record)} title="确认删除?">
                    <Button danger type="link">
                        删除
                    </Button>
                </Popconfirm>
            </div>
        );
    },
    pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
    },
});

// 监听字典类型变化
watch(
    () => props.dictType,
    () => getList(),
);

const getList = async () => {
    if (!props.dictType || !props.dictType.id) return;
    try {
        const { data } = await getDictDataList({
            typeId: Number(props.dictType.id),
            current: pagination.value.current ?? 1,
            size: pagination.value.pageSize ?? 10,
        });
        tableData.value = data.records || [];
        pagination.value.total = data.pager?.total || 0;
        console.log(pagination.value);
    } catch (e) {
        console.log(e);
    }
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
