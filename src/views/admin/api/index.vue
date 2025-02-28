<!--
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-23 15:14:03
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-02-28 10:16:39
 * @FilePath: src/views/admin/api/index.vue
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 -->
<template>
    <search-form :fields="fields" :collapse-limit="3" show-collapse @search="handleSearch" @reset="handleReset">
        <!-- 可选：自定义表单项插槽 -->
        <template #status="{ field }">
            <a-select v-model:value="formState[field.name]" :placeholder="`请选择${field.label}`">
                <a-select-option value="1">启用</a-select-option>
                <a-select-option value="0">禁用</a-select-option>
            </a-select>
        </template>

        <!-- 可选：自定义操作按钮插槽 -->
        <template #actions>
            <a-button type="primary" html-type="submit">查询</a-button>
            <a-button style="margin: 0 8px" @click="handleReset">重置</a-button>
            <a-button type="primary" @click="handleExport">导出</a-button>
        </template>
    </search-form>
</template>

<script setup lang="ts">
import { useSearchForm } from '@/hooks/useSearchForm';

// 定义搜索字段
const fields = [
    { name: 'name', label: '名称' },
    { name: 'code', label: '编码' },
    { name: 'status', label: '状态' },
    { name: 'createTime', label: '创建时间' },
];

// 使用 useSearchForm hook
const { formRef, formState, loading, searchProps, handleSearch, handleReset } = useSearchForm({
    fields,
    onSearch: async (values) => {
        console.log('搜索值：', values);
        // 执行搜索逻辑
    },
    onReset: () => {
        console.log('表单已重置');
        // 执行重置后的逻辑
    },
});

// 自定义导出方法
const handleExport = () => {
    const values = formRef.value?.getFieldsValue();
    console.log('导出数据，搜索条件：', values);
};
</script>
