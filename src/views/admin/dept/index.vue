<!--
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-23 15:14:03
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-03-09 18:43:36
 * @FilePath: src/views/admin/dept/index.vue
 * @Description: 部门管理
 -->
<template>
    <div class="xlt-base-container">
        <dept-search @search="handleSearchEvent" @reset="handleSearchEvent" />
        <div class="xlt-container">
            <data-table
                :data-source="tableData"
                :show-pagination="false"
                defaultExpandAllRows
                v-bind="{ ...tableConfig, pagination, ...toolbarConfig }"
                @add="handleAdd"
            ></data-table>
        </div>
        <DeptAdd ref="deptAddRef" @close="handleClose" />
    </div>
</template>

<script lang="tsx" setup>
import { message, Modal } from 'ant-design-vue';
import DeptSearch from '@/views/admin/dept/components/dept-search.vue';
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons-vue';
import { useTableConfig } from '@/composables';
import { getDeptDetail, getDeptList, removeDept } from '@/service/apis/dept';
import { IDept, IDeptParams } from '@/service/interface/dept';
import { getDictDataObjByType } from '@/service/apis/dict';

const tableData = ref<IDept[]>([]);

const DeptAdd = defineAsyncComponent(() => import('./components/add.vue'));
const deptAddRef = useTemplateRef<typeof DeptAdd>('deptAddRef');

const deptTypeDict = ref<Record<string, any>>({});
let searchForm = reactive<IDeptParams>({});

const { tableConfig, toolbarConfig, pagination } = useTableConfig({
    columns: [
        { title: '机构名称', dataIndex: 'deptName', width: 200 },
        { title: '机构代码', dataIndex: 'deptCode' },
        { title: '机构全称', dataIndex: 'fullName' },
        { title: '排序', dataIndex: 'orderNum' },
        {
            title: '机构类型',
            dataIndex: 'deptType',
            slots: { customRender: 'deptType' },
            customRender: ({ record }: { record: any }) => {
                return (
                    <a-tag color={record.deptType === 'COMPANY' ? 'blue' : 'green'}>
                        {deptTypeDict.value[record.deptType]}
                    </a-tag>
                );
            },
        },
        { title: '状态', dataIndex: 'status', slots: { customRender: 'status' } },
        { title: '负责人', dataIndex: 'leader' },
    ],
    controlsWidth: 300,
    indexWidth: 100,
    controlsCustomRender: ({ record }: { record: IDept }) => {
        return (
            <div class="xlt-flex-center">
                <a-button
                    type="link"
                    class="xlt-btn gap-0"
                    icon={<PlusCircleOutlined />}
                    onClick={(event: MouseEvent) => handleAdd(event, record)}
                >
                    新增下级
                </a-button>
                <a-button type="link" class="xlt-btn gap-0" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
                    编辑
                </a-button>
                <a-button
                    type="link"
                    danger
                    class="xlt-btn gap-0"
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(record)}
                >
                    删除
                </a-button>
            </div>
        );
    },
});

onMounted(() => {
    initListData();
});

const getDeptTypeDict = async () => {
    const { data } = await getDictDataObjByType('SYSTEM_DEPT_TYPE');
    deptTypeDict.value = data;
};

const getList = async () => {
    const { data } = await getDeptList({ ...searchForm });
    tableData.value = data.records;
};

const handleSearchEvent = (form: IDeptParams) => {
    searchForm = form;
    getList();
};

const handleAdd = (event: MouseEvent, row?: IDept) => {
    deptAddRef.value?.openDialog('add', { parentId: row?.id });
};

const handleEdit = async (row: IDept) => {
    try {
        if (!row.id) return;
        const { data } = await getDeptDetail(row.id);
        deptAddRef.value?.openDialog('edit', data);
    } catch (e) {
        console.error(e);
    }
};

const handleDelete = async (row: IDept) => {
    try {
        if (!row.id) return;
        Modal.confirm({
            title: '提示',
            content: '确定删除该条数据吗？',
            async onOk() {
                await removeDept(row.id!);
                message.success('删除成功');
                initListData();
            },
        });
    } catch (e) {
        console.error(e);
    }
};

const initListData = () => {
    getList();
    getDeptTypeDict();
};

const handleClose = () => {
    initListData();
};
</script>

<style scoped>
.dialog-footer {
    text-align: right;
}
</style>
