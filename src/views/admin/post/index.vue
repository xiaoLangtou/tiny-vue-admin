<template>
    <div class="xlt-base-container">
        <post-search @search="handleSearchEvent" @reset="handleSearchEvent"></post-search>
        <div class="xlt-container">
            <div class="card content-box w-full">
                <data-table
                    :data-source="tableData"
                    v-bind="{ ...tableConfig, pagination, ...toolbarConfig }"
                    @add="handleAdd"
                    @page-change="handlePageChange"
                >
                    <template #bodyCell="{ column, record }">
                        <template v-if="column.dataIndex === 'status'">
                            <a-tag :color="record.status ? 'blue' : 'default'">
                                {{ record.status ? '启用' : '停用' }}
                            </a-tag>
                        </template>
                        <template v-if="column.key === 'controls'">
                            <div class="xlt-flex-center">
                                <a-button
                                    v-auth="['user:reset:btn']"
                                    class="xlt-btn !gap-0"
                                    type="link"
                                    @click="handleEdit(record)"
                                >
                                    <template #icon>
                                        <EditOutlined />
                                    </template>
                                    修改
                                </a-button>
                                <a-button
                                    v-auth="['role:status:btn']"
                                    class="xlt-btn !gap-0"
                                    type="link"
                                    @click="handleSwitchChange(record)"
                                >
                                    <template #icon>
                                        <UnlockOutlined v-if="record.status === '0'" />
                                        <LockOutlined v-else />
                                    </template>
                                    {{ record.status === '0' ? '启用' : '停用' }}
                                </a-button>
                                <a-button
                                    v-auth="['user:reset:btn']"
                                    class="xlt-btn !gap-0"
                                    type="link"
                                    danger
                                    @click="handleDelete(record)"
                                >
                                    <template #icon>
                                        <DeleteOutlined />
                                    </template>
                                    删除
                                </a-button>
                            </div>
                        </template>
                    </template>
                </data-table>
            </div>
        </div>
        <post-add ref="postAddRef" @close="handleClose"></post-add>
    </div>
</template>

<script lang="ts" setup>
import { changePostStatus, deletePost, getPostDetail, getPostList } from '@/service/apis/post';
import type { IPost, IPostParams } from '@/service/interface/post';
import { usePagination } from 'alova/client';
import { DeleteOutlined, EditOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons-vue';
import { useMessage, useTableConfig } from '@/composables';
import PostSearch from '@/views/admin/post/components/post-search.vue';

const { message } = useMessage();

const PostAdd = defineAsyncComponent(() => import('./components/add.vue'));
const postAddRef = useTemplateRef<typeof PostAdd>('postAddRef');

const queryForm = ref<IPostParams>({});

const { tableConfig, pagination, toolbarConfig } = useTableConfig({
    columns: [
        { title: '岗位名称', dataIndex: 'name' },
        { title: '岗位代码', dataIndex: 'code' },
        { title: '岗位状态', dataIndex: 'status' },
        { title: '排序', dataIndex: 'sortOrder' },
    ],
    pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
        showQuickJumper: true,
    },
    controlsWidth: 240,
    isCreateTime: false,
});

const { data: tableData, send } = usePagination(
    () =>
        getPostList({
            current: pagination.value.current,
            size: pagination.value.pageSize,
            ...queryForm.value,
        }),
    {
        force: true,
        total: (response) => {
            pagination.value.total = response.data?.pager?.total || 0;
            return response.data?.pager?.total || 0;
        },
        data: (response) => response.data?.records ?? [],
    },
);

const handleSearchEvent = (form: IPostParams) => {
    queryForm.value = form;
    send();
};

const handleAdd = () => {
    postAddRef.value?.openDialog();
};

const handleEdit = async (row: IPost) => {
    try {
        if (!row.id) return;
        const { data } = await getPostDetail(row.id);
        postAddRef.value?.openDialog('edit', data);
    } catch {
        message.error('获取岗位详情失败');
    }
};

const handleDelete = async (row: IPost) => {
    try {
        if (!row.id) return;
        await deletePost(row.id);
        message.success('删除成功');
        await send();
    } catch {
        message.error('删除失败');
    }
};

const handlePageChange = ({ current, size }: { current: number; size: number }) => {
    pagination.value.current = current;
    pagination.value.pageSize = size;
    send();
};

const handleClose = () => {
    send();
};

const handleSwitchChange = async (row: IPost) => {
    if (!row.id) return;
    try {
        const isEnable = row.status === '1' ? 0 : 1;
        await changePostStatus(row.id, isEnable);
        message.success(isEnable ? '启用成功' : '停用成功');
        await send();
    } catch {
        row.status = !row.status;
    }
};
</script>
