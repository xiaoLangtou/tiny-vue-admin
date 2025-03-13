<template>
    <div class="xlt-container h-full !p-0">
        <SplitPane size="280px" :min-size="200" :max-size="600">
            <!-- 左侧内容 -->
            <template #left>
                <div class="w-full">
                    <DeptTree @change="handleTreeChange" />
                </div>
            </template>

            <!-- 右侧主要内容 -->
            <template #main>
                <UserSearch></UserSearch>
                <data-table
                    :data-source="tableData"
                    :loading="loading"
                    v-bind="{ ...tableConfig, ...toolbarConfig, pagination }"
                    @refresh="send"
                >
                    <template #toolbar-buttons>
                        <a-button v-auth="['user:add:btn']" type="primary" class="xlt-btn !gap-0" @click="handleAdd">
                            <template #icon>
                                <Plus :size="16" />
                            </template>
                            新增
                        </a-button>
                        <a-button
                            v-auth="['user:batch:delete:btn']"
                            class="xlt-btn !gap-0"
                            @click="handleBatchOperation('batchDeletion')"
                        >
                            <template #icon>
                                <delete-outlined />
                            </template>
                            批量删除
                        </a-button>
                        <a-button
                            v-auth="['user:status:btn']"
                            class="xlt-btn !gap-0"
                            @click="handleBatchOperation('batchResetPasswords')"
                        >
                            <template #icon>
                                <sync-outlined />
                            </template>
                            批量重置密码
                        </a-button>
                    </template>

                    <template #bodyCell="{ column, record }">
                        <template v-if="column.key === 'status'">
                            <a-tag :color="record.status ? 'processing' : 'default'">
                                {{ FROZEN_STATUS[record.status] }}
                            </a-tag>
                        </template>
                        <template v-if="column.key === 'controls'">
                            <div class="xlt-flex-center">
                                <a-button
                                    v-auth="['user:edit:btn']"
                                    class="xlt-btn !gap-0"
                                    type="link"
                                    @click="handleEdit(record)"
                                >
                                    <template #icon>
                                        <edit-outlined />
                                    </template>
                                    修改
                                </a-button>
                                <a-button
                                    v-auth="['user:status:btn']"
                                    class="xlt-btn !gap-0"
                                    type="link"
                                    danger
                                    @click="handleChangeStatus(record)"
                                >
                                    <template #icon>
                                        <unlock-outlined v-if="record.status === 'FROZEN'" />
                                        <lock-outlined v-else />
                                    </template>
                                    {{ record.status === 'FROZEN' ? '解冻' : '冻结' }}
                                </a-button>
                                <a-button
                                    v-auth="['user:reset:btn']"
                                    class="xlt-btn !gap-0"
                                    type="link"
                                    @click="handleDelete(record)"
                                >
                                    <template #icon>
                                        <sync-outlined />
                                    </template>
                                    删除
                                </a-button>
                                <a-button
                                    v-auth="['user:reset:btn']"
                                    type="link"
                                    class="xlt-btn !gap-0"
                                    @click="handleResetPassword(record)"
                                >
                                    <template #icon>
                                        <sync-outlined />
                                    </template>
                                    重置密码
                                </a-button>
                                <a-button
                                    v-auth="['user:role:btn']"
                                    type="link"
                                    class="xlt-btn !gap-0"
                                    @click="handleSetRole(record)"
                                >
                                    <template #icon>
                                        <setting-outlined />
                                    </template>
                                    设置角色
                                </a-button>
                            </div>
                        </template>
                    </template>
                </data-table>
            </template>
        </SplitPane>
        <UserAdd ref="userAddRef" @close="send" />
    </div>
</template>

<script lang="ts" setup>
import { SplitPane } from '@/components';
import { useModalMessage, useTableConfig } from '@/composables';
import { FROZEN_STATUS } from '@/global/enums';
import { changeUserStatus, deleteUser, getUserDetail, getUserList, resetPassword } from '@/service/apis/user';
import type { IUser, IUserParams } from '@/service/interface/user';
import { DeleteOutlined, EditOutlined, SyncOutlined } from '@ant-design/icons-vue';
import { usePagination } from 'alova/client';
import { message } from 'ant-design-vue';
import { Plus } from 'lucide-vue-next';
import { reactive, ref } from 'vue';
import { DeptTree, UserAdd, UserSearch } from './components';

const userAddRef = ref();
// const { BUTTONS } = useAuthButtons();

const searchForm = reactive<IUserParams>({});
const checkboxData = ref<IUser[]>([]);

const { toolbarConfig, tableConfig, pagination } = useTableConfig({
    showPagination: true,
    pagination: {
        current: 1,
        total: 0,
        pageSize: 10,
    },
    columns: [
        { dataIndex: 'username', title: '用户名', width: 120 },
        { dataIndex: 'nickname', title: '用户昵称', width: 120 },
        { dataIndex: 'deptName', title: '归属部门', width: 120 },
        {
            key: 'status',
            dataIndex: 'status',
            title: '状态',
            width: 100,
        },
        { dataIndex: 'updateTime', title: '更新时间', width: 150 },
        { dataIndex: 'name', title: '员工姓名', width: 120 },
        { dataIndex: 'email', title: '电子邮箱', width: 150 },
        { dataIndex: 'phone', title: '手机号', width: 150 },
    ],
    controlsWidth: 280,
});

const {
    data: tableData,
    send,
    loading,
} = usePagination(
    (page, pageSize) =>
        getUserList({
            ...searchForm,
            current: page,
            size: pageSize,
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

// 处理部门树筛选
const handleTreeChange = (node: any) => {
    searchForm.deptId = node;
    send();
    console.log(tableData.value);
};
const handleAdd = () => {
    userAddRef.value?.openDialog();
};

const handleChangeStatus = async (row: IUser) => {
    try {
        const status = row.status === 'FROZEN' ? 'NORMAL' : 'FROZEN';
        await useModalMessage('修改状态', changeUserStatus, { id: row.id, status }, send);
    } catch (e) {
        console.log(e);
    }
};

const handleEdit = async (row: IUser) => {
    try {
        if (!row.id) return;
        const { data } = await getUserDetail(row.id);
        userAddRef.value?.openDialog('edit', data);
    } catch (e) {
        console.log(e);
    }
};

const handleDelete = async (row: IUser) => {
    try {
        if (!row.id) return;
        await useModalMessage('删除', deleteUser, row.id, send);
    } catch (e) {
        console.log(e);
    }
};

const handleResetPassword = async (row: IUser) => {
    if (!row.id) return;
    await batchResetPasswords([row.id]);
};

const batchResetPasswords = async (ids: number[]) => {
    try {
        if (!ids.length) return message.warning('请选择需要重置密码的用户');
        await useModalMessage('重置密码', resetPassword, { ids }, send);
    } catch (e) {
        console.log(e);
    }
};

const batchDeletion = async () => {
    try {
        const ids = checkboxData.value.map((item) => item.id);
        if (!ids.length) return message.warning('请选择需要删除的用户');
        await useModalMessage('删除', deleteUser, ids, send);
    } catch (e) {
        console.log(e);
    }
};

const handleBatchOperation = (command: string) => {
    const commands: Record<string, any> = {
        batchResetPasswords: batchResetPasswords,
        batchDeletion: batchDeletion,
    };
    const ids = checkboxData.value.map((item) => item.id);
    if (commands[command]) {
        commands[command](ids);
    }
};

// const handleCheckboxChange = (selectedRowKeys: any[], selectedRows: IUser[]) => {
//     checkboxData.value = selectedRows;
// };

const handleSetRole = async (row: IUser) => {
    try {
        if (!row.id) return;
        const { data } = await getUserDetail(row.id);
        console.log(userAddRef.value);
        userAddRef.value?.openDialog('edit', { ...data, setRole: true });
    } catch (e) {
        console.log(e);
    }
};

// const handleCommand = (command: string, row: IUser) => {
//     const commands: Record<string, any> = {
//         handleDelete: handleDelete,
//         handleResetPassword: handleResetPassword,
//         handleSetRole: handleSetRole,
//     };
//     commands[command] && commands[command](row);
// };

// const handlePageChange = ({ current, size }: { current: number; size: number }) => {
//     page.value = current;
//     pageSize.value = size;
// };
</script>

<style lang="scss">
.hidden-btn {
    background-color: #dedede;
    border-radius: 20px;
}
</style>
