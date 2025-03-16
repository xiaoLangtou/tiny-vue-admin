<template>
    <custom-modal v-model:open="open" width="50%" modal-title="添加成员">
        <a-transfer
            v-model:target-keys="targetKeys"
            class="w-full"
            :data-source="tableData"
            show-search
            :pagination="pagination"
            :operations="['添加', '移除']"
            :select-all-labels="selectAllLabels"
            :filter-option="
                (inputValue, item) =>
                    item.nickname.indexOf(inputValue) !== -1 || item.username.indexOf(inputValue) !== -1
            "
            :list-style="{
                width: '50%',
                height: '600px',
            }"
            @change="handleChange"
            @select-change="handleSelectChange"
        >
            <template #render="item">
                <div class="user-item" :style="{ '--color-primary': token.colorPrimary }">
                    <span class="nickname">{{ item.nickname }}</span>
                    <span class="username">({{ item.username }})</span>
                    <span v-if="item.deptName" class="department">| {{ item.deptName }}</span>
                </div>
            </template>
        </a-transfer>
        <template #footer>
            <a-button @click="handleCancel">取消</a-button>
            <a-button type="primary" @click="handleSubmit">确定</a-button>
        </template>
    </custom-modal>
</template>

<script lang="ts" setup>
import { useAntdToken, useMessage } from '@/composables';
import { changeUserRole } from '@/service/apis/role.ts';
import { getUserNotListByRoleId } from '@/service/apis/user.ts';
import type { IRole } from '@/service/interface/role.ts';
import { to } from '@/utils/result-handler.ts';
import { usePagination } from 'alova/client';
import type { SelectAllLabel } from 'ant-design-vue/es/transfer';
import { ref } from 'vue';

const { message } = useMessage();
const emit = defineEmits(['close']);

const { token } = useAntdToken();
const open = ref<boolean>(false);
const targetKeys = ref([]);
//eslint-disable-next-line vue/no-ref-object-reactivity-loss
const selectAllLabels: SelectAllLabel[] = ['', `已选：${targetKeys.value.length} 名用户`];
const activeRole = ref<IRole>({});

const pagination = ref({
    current: 1,
    pageSize: 10,
    total: 0,
    showLessItems: false,
    showSizeChanger: false,
    simple: true,
});

const { data: tableData, send } = usePagination(
    () =>
        getUserNotListByRoleId({
            roleId: activeRole.value.id,
            page: pagination.value.current,
            size: 1000,
        }),
    {
        immediate: false,
        force: true,
        total: (response: any) => {
            pagination.value.total = response.data?.pager?.total || 0;
            return response.data?.pager?.total || 0;
        },
        data: (response: any) =>
            response.data?.records.map((item: any) => {
                return {
                    ...item,
                    key: item.id,
                };
            }) ?? [],
    },
);

const handleSelectChange = (sourceSelectedKeys: any, targetSelectedKeys: any) => {
    console.log('sourceSelectedKeys', sourceSelectedKeys);
    console.log('targetSelectedKeys', targetSelectedKeys);
};

const handleChange = (nextTargetKeys: any) => {
    targetKeys.value = nextTargetKeys;
};
const openModal = async (role: any) => {
    activeRole.value = role;
    open.value = true;
    await nextTick();
    await send();
};

const handleCancel = () => {
    targetKeys.value = [];
    open.value = false;
    emit('close');
};

const handleSubmit = async () => {
    // 提交数据

    if (targetKeys.value.length <= 0) {
        message.error('请选择要添加的成员');
        return;
    }
    const result = await to(
        changeUserRole({
            roleId: activeRole.value.id as number,
            users: targetKeys.value,
        }),
    );
    if (!result.ok) return;
    message.success('添加成员成功');
    handleCancel();
};

defineExpose({
    openModal,
});
</script>

<style scoped lang="scss"></style>

<style lang="scss" scoped>
:deep(.ant-transfer-operation .ant-btn) {
    @apply flex items-center justify-center;
}

.user-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 6px 10px;
    font-size: 14px;
    border-bottom: 1px solid #f0f0f0; // 增加分隔感
}

.nickname {
    font-weight: bold;
    color: var(--color-primary);
}

.username {
    color: #888;
    font-size: 12px;
}

.department {
    font-size: 12px;
    color: #888; // 让部门信息稍微淡化
}
</style>
