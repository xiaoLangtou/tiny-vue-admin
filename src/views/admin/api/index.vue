<!--
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-23 15:14:03
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-03-03 16:34:50
 * @FilePath: src/views/admin/api/index.vue
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 -->
<template>
    <div class="xlt-base-container">
        <fade-down>
            <SearchForm
                v-show="showSearchForm"
                :fields="fields"
                :collapse-limit="3"
                show-collapse
                @search="handleSearch"
                @reset="handleReset"
            >
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
            </SearchForm>
        </fade-down>
        <div class="xlt-container">
            <!--表格-->
            <data-table
                :columns="columns"
                :dataSource="dataSource"
                :loading="loading"
                :pagination="pagination"
                @add="handleAdd"
                @refresh="handleRefresh"
                @toggle-advanced-search="handleToggleAdvancedSearch"
                @page-change="handlePageChange"
            >
            </data-table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useSearchForm } from '@/hooks/useSearchForm';
import type { TablePaginationConfig } from 'ant-design-vue';
import FadeDown from '@/components/transition/fade-down.vue';
// 定义搜索字段
const fields = [
    { name: 'name', label: '名称' },
    { name: 'code', label: '编码' },
    { name: 'status', label: '状态' },
    { name: 'createTime', label: '创建时间' },
];

const showSearchForm = ref(true);

// 使用 useSearchForm hook
const { formRef, formState, searchProps, handleSearch, handleReset } = useSearchForm({
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

const handleToggleAdvancedSearch = (value: boolean) => {
    console.log('切换高级搜索状态：', value);
    showSearchForm.value = value;
};

// 定义表格列
const columns = [
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: '地址',
        dataIndex: 'address',
        key: 'address',
    },
    { title: 'Column 1', dataIndex: 'address', key: '1' },
    { title: 'Column 2', dataIndex: 'address', key: '2' },
    { title: 'Column 3', dataIndex: 'address', key: '3' },
    { title: 'Column 4', dataIndex: 'address', key: '4' },
    { title: 'Column 5', dataIndex: 'address', key: '5' },
    { title: 'Column 6', dataIndex: 'address', key: '6' },
    { title: 'Column 7', dataIndex: 'address', key: '7' },
    { title: 'Column 8', dataIndex: 'address', key: '8' },
    {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        width: 100,
    },
];

// 表格数据和状态
const loading = ref(false);
const dataSource = ref([]);
const pagination = ref<TablePaginationConfig>({
    total: 100,
    current: 1,
    pageSize: 10,
});

// 处理表格变化事件
const handlePageChange = (page: { current: number; size: number }) => {
    console.log('页码变化：', page);
    pagination.value.current = page.current;
    pagination.value.pageSize = page.size;
    fetchData();
};

// 处理新增按钮点击
const handleAdd = () => {
    console.log('点击了新增按钮');
    // 实现新增逻辑
};

// 处理刷新按钮点击
const handleRefresh = () => {
    console.log('点击了刷新按钮');
    fetchData();
};

// 获取表格数据
const fetchData = () => {
    loading.value = true;
    // 模拟接口请求
    const data: any[] = [];
    for (let i = 0; i < 10; i++) {
        data.push({
            key: i.toString(),
            name: `Edrward ${i}`,
            age: 32,
            address: `London Park no. ${i}`,
        });
    }

    setTimeout(() => {
        dataSource.value = data;
        loading.value = false;
    }, 1000);
};

// 初始加载数据
fetchData();
</script>
