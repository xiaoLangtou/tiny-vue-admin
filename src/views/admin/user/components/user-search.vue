<template>
    <search-form :form-state="formState" :search-event="handleSearch" :reset-event="handleReset">
        <template #username>
            <a-form-item label="用户名" name="username">
                <a-input v-model:value="formState.username" placeholder="请输入" allow-clear />
            </a-form-item>
        </template>
        <template #nickname>
            <a-form-item label="用户昵称" name="nickname">
                <a-input v-model:value="formState.nickname" placeholder="请输入" allow-clear />
            </a-form-item>
        </template>
        <template #phone>
            <a-form-item label="手机号" name="phone">
                <a-input v-model:value="formState.phone" placeholder="请输入" allow-clear />
            </a-form-item>
        </template>
        <template #email>
            <a-form-item label="用户邮箱" name="email">
                <a-input v-model:value="formState.email" placeholder="请输入" allow-clear />
            </a-form-item>
        </template>
        <template #status>
            <a-form-item label="状态" name="status">
                <a-select v-model:value="formState.status" allow-clear>
                    <a-select-option v-for="(item, key) in FROZEN_STATUS" :key="key" :value="key"
                        >{{ item }}
                    </a-select-option>
                </a-select>
            </a-form-item>
        </template>
    </search-form>
</template>

<script setup lang="ts">
import SearchForm from '@/components/data-table/search-form/index.vue';
import { FROZEN_STATUS } from '@/global/enums';
import { useSearchForm } from '@/composables';

const emit = defineEmits(['search', 'reset']);

const { formState, handleSearch, handleReset } = useSearchForm(
    {
        fields: ['username', 'nickname', 'phone', 'email', 'status', 'deptId'] as const,
    },
    emit,
);
</script>
