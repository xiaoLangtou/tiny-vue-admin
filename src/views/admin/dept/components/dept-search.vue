<!--
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-03-09 11:55:18
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-03-09 16:18:49
 * @FilePath: src/views/admin/dept/components/dept-search.vue
 * @Description: 部门搜索表单
 -->
<template>
    <search-form :form-state="formState" :search-event="handleSearch" :reset-event="handleReset">
        <template #code>
            <a-form-item label="机构代码" name="code">
                <a-input v-model:value="formState.code" placeholder="请输入" allow-clear />
            </a-form-item>
        </template>
        <template #name>
            <a-form-item label="机构名称" name="name">
                <a-input v-model:value="formState.name" placeholder="请输入" allow-clear />
            </a-form-item>
        </template>
        <template #status>
            <a-form-item label="状态" name="status">
                <a-select v-model:value="formState.status" placeholder="请选择" allow-clear>
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

defineOptions({
    name: 'DeptSearch',
});

const { formState, fields, handleSearch, handleReset } = useSearchForm(
    {
        fields: ['code', 'name', 'status'] as const,
    },
    emit,
);
</script>


