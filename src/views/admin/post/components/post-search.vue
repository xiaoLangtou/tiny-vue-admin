<template>
    <search-form :form-state="formState" :search-event="handleSearch" :reset-event="handleReset">
        <template #name>
            <a-form-item label="岗位名称" name="name">
                <a-input v-model:value="formState.name" placeholder="请输入岗位名称" />
            </a-form-item>
        </template>
        <template #code>
            <a-form-item label="岗位代码" name="code">
                <a-input v-model:value="formState.code" placeholder="请输入岗位代码" />
            </a-form-item>
        </template>
        <template #status>
            <a-form-item label="岗位状态" name="status">
                <a-select v-model:value="formState.status" placeholder="请选择岗位状态">
                    <a-select-option value="1">启用</a-select-option>
                    <a-select-option value="0">停用</a-select-option>
                </a-select>
            </a-form-item>
        </template>
    </search-form>
</template>

<script setup lang="ts">
import { useSearchForm } from '@/composables';

const emit = defineEmits(['search', 'reset']);

const { formState, handleSearch, handleReset } = useSearchForm(
    {
        fields: ['name', 'code', 'status'] as const,
    },
    emit,
);
</script>

<style scoped lang="scss">
.el-form-item--default {
    margin-bottom: 0;
}
</style>
