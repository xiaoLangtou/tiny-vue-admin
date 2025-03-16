<template>
    <div class="xlt-container !pt-0 !pb-0 w-full h-full">
        <split-pane size="300px" :min-size="200" :max-size="600">
            <template #left>
                <div>
                    <!-- Search and Action Bar -->
                    <div class="xlt-flex-center gap-2 mb-4">
                        <a-input
                            v-model:value="queryForm.roleName"
                            placeholder="请输入角色名称"
                            class="input-field"
                            @keydown.enter="send"
                        >
                            <template #suffix>
                                <Search class="icon" />
                            </template>
                        </a-input>
                        <div class="action-buttons">
                            <a-button type="primary" class="action-button" @click="handleAdd">
                                <Plus class="icon" />
                            </a-button>
                        </div>
                    </div>

                    <!-- Dictionary List -->
                    <div class="flex flex-col gap-1.5">
                        <div
                            v-for="item in tableData"
                            :key="item.id"
                            class="dict-item group"
                            :style="{
                                '--dark-bg-active': token.colorPrimary,
                                '--light-bg-active': token.colorPrimaryBg,
                                '--dark-border-active': token.colorPrimaryActive,
                                '--light-border-active': token.colorPrimaryHover,
                            }"
                            :class="{ active: activeRole.id === item.id }"
                            @click="handleSelectRole(item)"
                        >
                            <div class="dict-item__label flex">
                                <icon-view model-value="Lucide-UserRoundCog"></icon-view>
                                <span class="dict-name">{{ item.roleName }}</span>
                                <a-tag v-if="item.isSystemRoe === 1" color="processing" :bordered="false"
                                    >系统角色
                                </a-tag>
                            </div>
                            <div class="dict-item__controls group-hover:opacity-100 group-hover:translate-x-0">
                                <a-button type="text" class="control-button" @click.stop="handleEdit(item)">
                                    <Edit class="icon" />
                                </a-button>
                                <a-button type="text" class="control-button" @click.stop="handleDelete(item)">
                                    <Trash2 class="icon" />
                                </a-button>
                            </div>
                        </div>

                        <!-- Empty State -->
                        <div v-if="tableData.length === 0" class="empty-state">暂无数据</div>
                    </div>
                </div>
            </template>
            <template #main>
                <template v-if="Object.keys(activeRole).length">
                    <a-page-header class="p-0" :title="activeRole.name" :sub-title="activeRole.roleCode" />
                    <a-tabs v-model:active-key="activeTabKey" @change="handleActiveTabKeyChange">
                        <a-tab-pane key="user" tab="角色成员">
                            <user-permission ref="userPermissionRef" :role="activeRole"></user-permission>
                        </a-tab-pane>
                        <a-tab-pane key="menu" tab="角色菜单">
                            <menu-permission ref="menuPermissionRef" :role="activeRole"></menu-permission>
                        </a-tab-pane>
                        <a-tab-pane key="api" tab="角色接口">
                            <api-permission ref="apiPermissionRef" :role="activeRole"></api-permission>
                        </a-tab-pane>
                    </a-tabs>
                </template>
                <template v-else>
                    <empty-data></empty-data>
                </template>
            </template>
        </split-pane>
        <RoleAdd ref="roleAddRef" @close="handleClose"></RoleAdd>
    </div>
</template>

<script lang="ts" setup>
import { SplitPane } from '@/components';
import { useAntdToken, useMessage, useModalMessage } from '@/composables';
import { getRoleDetail, getRoleList, removeRole } from '@/service/apis/role';
import type { IRole, IRoleParams } from '@/service/interface/role';
import { to } from '@/utils/result-handler.ts';
import { usePagination } from 'alova/client';
import { Edit, Plus, Search, Trash2 } from 'lucide-vue-next';
import { ApiPermission, EmptyData, MenuPermission, RoleAdd, UserPermission } from './components';

const { token } = useAntdToken();
const { message } = useMessage();
const roleAddRef = useTemplateRef<typeof RoleAdd>('roleAddRef');
const apiPermissionRef = useTemplateRef<typeof ApiPermission>('apiPermissionRef');
const menuPermissionRef = useTemplateRef<typeof MenuPermission>('menuPermissionRef');
const userPermissionRef = useTemplateRef<typeof UserPermission>('userPermissionRef');
const queryForm = ref<IRoleParams>({
    roleName: '',
});
const activeRole = ref<IRole>({});
const activeTabKey = ref('user');

const { data: tableData, send } = usePagination(
    (page, pageSize) =>
        getRoleList({
            current: page,
            size: pageSize,
            ...queryForm.value,
        }),
    {
        force: true,
        total: (response) => response.data?.pager?.total || 0,
        data: (response) => response.data?.records ?? [],
    },
);
const getRoleDetailById = async (id: number) => {
    // 获取角色详情
    const { data } = await getRoleDetail(id);
    activeRole.value = data;
};

const handleSelectRole = async (row: IRole) => {
    if (!row.id) return;
    await getRoleDetailById(row.id);
    activeTabKey.value = 'user';
    await nextTick();
    userPermissionRef.value?.send();
};

const handleAdd = () => {
    roleAddRef.value?.openDialog();
};

const handleEdit = async (row: IRole) => {
    try {
        if (!row.id) return;
        const { data } = await getRoleDetail(row.id);
        roleAddRef.value?.openDialog('edit', data);
    } catch (e) {
        console.error(e);
    }
};

const handleDelete = async (row: IRole) => {
    if (!row.id) return;
    const result = await to(useModalMessage('确定要删除该角色吗？', ({ id }) => removeRole(id), { id: row.id }, send));

    if (!result.ok || !result.value) return;
    message.success('删除成功');
    await handleSelectRole(tableData.value[0]);
};

const handleActiveTabKeyChange = async (key: string) => {
    if (key === 'user') {
        await userPermissionRef.value?.send();
    } else if (key === 'menu') {
        await menuPermissionRef.value?.getAllMenu();
    } else if (key === 'api') {
        await apiPermissionRef.value?.init();
    }
};

const handleClose = () => {
    send();
};
</script>

<style lang="scss" scoped>
.input-field {
    @apply flex-1 h-8 text-sm;
}

.icon {
    @apply w-3.5 h-3.5;
}

.action-buttons {
    @apply flex items-center gap-3;
}

.action-button {
    @apply h-8 px-3 flex items-center gap-1 text-sm rounded;
}

.dict-item {
    @apply flex items-center justify-between p-2.5 border rounded transition-all duration-200 cursor-pointer
    bg-gray-50/50 dark:bg-gray-700/20 border-gray-100 dark:border-gray-600/30
    hover:bg-gray-100/50 dark:hover:bg-gray-600/20;
}

.dict-item.active {
    @apply bg-[var(--light-bg-active)] dark:bg-[var(--dark-bg-active)]  text-[var(--dark-bg-active)] dark:text-white;
}

.dict-item__label {
    @apply flex-1 min-w-0 pr-3;
}

.dict-name {
    @apply font-medium text-sm mr-1;
}

.dict-code {
    @apply text-gray-500 dark:text-gray-50 text-xs;
}

.dict-item__controls {
    @apply flex gap-1 opacity-0 translate-x-2 transition-all duration-200;
}

.control-button {
    @apply p-1 rounded;
}

.empty-state {
    @apply py-8 text-center text-gray-500 dark:text-gray-400;
}
</style>
