<!--
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-03-16 14:23:12
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-03-16 18:36:31
 * @FilePath: src/views/admin/role/components/user-permission.vue
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 -->
<template>
    <div class="xlt-container h-full !p-0">
        <data-table
            :data-source="tableData"
            :loading="loading"
            v-bind="{ ...tableConfig, ...toolbarConfig, pagination }"
            :row-selection="rowSelection"
            @refresh="send"
            @page-change="handlePageChange"
        >
            <template #toolbar-buttons>
                <a-button type="primary" class="xlt-btn !gap-1" @click="openAddUserModal">
                    <template #icon>
                        <Plus :size="16" />
                    </template>
                    添加成员
                </a-button>

                <a-button class="xlt-btn !gap-1" @click="handleUnassign(selectedRowKeys)">
                    <template #icon>
                        <UserX :size="16" />
                    </template>
                    移除成员
                </a-button>
            </template>
            <template #toolbar-right>
                <a-input v-model:value="searchForm.keyword" placeholder="搜索成员姓名或用户名" @keydown.enter="send">
                    <template #prefix>
                        <SearchIcon :size="16"></SearchIcon>
                    </template>
                </a-input>
            </template>
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'status'">
                    <status-tag :value="record.status"></status-tag>
                </template>
                <template v-if="column.key === 'controls'">
                    <div class="xlt-flex-center">
                        <a-button
                            v-auth="['user:edit:btn']"
                            :disabled="record.isSystemUser === 1"
                            class="xlt-btn !gap-1"
                            type="link"
                            @click="handleUnassign([record.id])"
                        >
                            <template #icon>
                                <UserX :size="16" />
                            </template>
                            取消分配
                        </a-button>
                    </div>
                </template>
            </template>
        </data-table>
        <add-user-role ref="addUserRoleRef" @close="send"></add-user-role>
    </div>
</template>

<script lang="ts" setup>
import { useModalMessage, useTableConfig } from '@/composables';
import { removeUserRole } from '@/service/apis/role.ts';
import { getUsersByRoleId } from '@/service/apis/user';
import type { IUser, IUserParams } from '@/service/interface/user';
import { to } from '@/utils/result-handler.ts';
import { usePagination } from 'alova/client';
import { message, type TableProps } from 'ant-design-vue';
import type { Key } from 'ant-design-vue/es/_util/type';
import { Plus, SearchIcon, UserX } from 'lucide-vue-next';
import { reactive, ref } from 'vue';
import { AddUserRole } from './index.ts';

const props = defineProps({
    role: {
        type: Object as PropType<Record<string, any>>,
        default: () => ({}),
    },
});

const searchForm = reactive<IUserParams>({
    keyword: '',
});
const selectedRowKeys = ref([]);

const { toolbarConfig, tableConfig, pagination } = useTableConfig({
    showPagination: true,
    showFullscreen: false,
    showColumnSetting: false,
    pagination: {
        current: 1,
        total: 0,
        pageSize: 10,
    },
    columns: [
        { dataIndex: 'username', title: '用户名', width: 120, fixed: 'left' },
        { dataIndex: 'name', title: '员工姓名', width: 120 },
        { dataIndex: 'nickname', title: '用户昵称', width: 120 },
        { dataIndex: 'deptName', title: '归属部门', width: 120 },
        {
            key: 'status',
            dataIndex: 'status',
            title: '状态',
            width: 100,
        },

        { dataIndex: 'email', title: '电子邮箱' },
        { dataIndex: 'phone', title: '手机号' },
    ],
    controlsWidth: 140,
    showIndex: false,
});

const handleSelectChange = (e: any) => {
    selectedRowKeys.value = e;
    console.log(selectedRowKeys.value);
};

const rowSelection = ref<TableProps['rowSelection']>({
    selectedRowKeys: selectedRowKeys as unknown as Key[],
    onChange: handleSelectChange,
    getCheckboxProps: (record: IUser) => ({
        disabled: record.isSystemUser === 1, // Column configuration not to be checked
        name: record.name,
    }),
});

const {
    data: tableData,
    send,
    loading,
} = usePagination(
    () =>
        getUsersByRoleId({
            username: searchForm.keyword,
            nickname: searchForm.keyword,
            roleId: props.role.id,
            current: pagination.value.current,
            size: pagination.value.pageSize,
        }),
    {
        immediate: false,
        force: true,
        total: (response) => {
            pagination.value.total = response.data?.pager?.total || 0;
            return response.data?.pager?.total || 0;
        },
        data: (response) => response.data?.records ?? [],
    },
);

const handleUnassign = async (ids: number[]) => {
    if (!ids.length) return message.error('请选择要移除的成员');

    const result = await to(
        useModalMessage(
            '确认将该员工移出角色？',
            removeUserRole,
            {
                roleId: props.role.id,
                users: ids,
            },
            send,
        ),
    );
    if (!result.ok || !result.value) return;
    message.success('移除成功');
};

const handlePageChange = ({ current, size }: { current: number; size: number }) => {
    pagination.value.current = current;
    pagination.value.pageSize = size;
    send();
};

const addUserRoleRef = useTemplateRef<typeof AddUserRole>('addUserRoleRef');
const openAddUserModal = () => {
    addUserRoleRef.value?.openModal(props.role);
};

watch(
    () => props.role,
    (val) => {
        if (!val.id) return;
        send();
    },
    { immediate: true },
);

defineExpose({
    send,
});
</script>

<style lang="scss" scoped>
.hidden-btn {
    background-color: #dedede;
    border-radius: 20px;
}

:deep(.ca-split-panel__main-content) {
    height: 100%;
}
</style>
