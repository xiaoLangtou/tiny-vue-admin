<template>
    <div class="data-table-container">
        <!-- 集成表格工具栏 -->
        <table-toolbar
            @add="$emit('add')"
            @refresh="$emit('refresh')"
            @fullscreen="toggle"
            @column-setting="$emit('columnSetting')"
            @import="$emit('import')"
            @export="$emit('export')"
            @toggle-advanced-search="(value) => $emit('toggleAdvancedSearch', value)"
        >
            <!-- 传递自定义按钮插槽 -->
            <template #buttons>
                <slot name="toolbar-buttons"></slot>
            </template>
        </table-toolbar>

        <!-- 集成 Ant Design Vue 表格组件 -->
        <fullscreen ref="antTable" :is-fullscreen="isFullscreen" :exit-fullscreen="exit">
            <a-table
                v-bind="$attrs"
                :dataSource="dataSource"
                :columns="columns"
                :pagination="pagination"
                :loading="loading"
                :rowKey="rowKey"
                :rowSelection="rowSelection"
                @change="handleTableChange"
            >
                <!-- 传递所有插槽内容到 a-table -->
                <template v-for="(_, name) in $slots" #[name]="slotData">
                    <slot :name="name" v-bind="slotData"></slot>
                </template>
            </a-table>
        </fullscreen>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Shrink } from 'lucide-vue-next';
import type { TableProps, TablePaginationConfig } from 'ant-design-vue';

// 导入表格工具栏组件
import TableToolbar from '../table-toolbar/index.vue';
import type { MaybeElementRef } from '@vueuse/core';

const props = withDefaults(defineProps<DataTableProps>(), {
    dataSource: () => [],
    columns: () => [],
    pagination: () => ({
        total: 0,
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total: number) => `共 ${total} 条`,
    }),
    loading: false,
    rowKey: 'id',
});

// 定义组件事件
const emit = defineEmits<{
    (e: 'add' | 'refresh' | 'fullscreen' | 'columnSetting' | 'import' | 'export', ...args: any): void;
    (e: 'change', pagination: TablePaginationConfig, filters: any, sorter: any): void;
    (e: 'update:selectedRowKeys', selectedRowKeys: any[]): void;
    (e: 'toggleAdvancedSearch', value: boolean): void;
}>();

// 定义组件名称
defineOptions({
    name: 'DataTable',
    inheritAttrs: false,
});

// 定义组件属性
interface DataTableProps {
    dataSource?: any[];
    columns?: any[];
    pagination?: false | TablePaginationConfig;
    loading?: boolean;
    rowKey?: string | ((record: any) => string);
    rowSelection?: TableProps['rowSelection'];
}

// 处理表格变化事件
const handleTableChange = (pagination: TablePaginationConfig, filters: any, sorter: any) => {
    emit('change', pagination, filters, sorter);
};

// 计算属性：行选择配置
const rowSelection = computed(() => {
    if (!props.rowSelection) return undefined;

    return {
        ...props.rowSelection,
        onChange: (selectedRowKeys: any[], selectedRows: any[]) => {
            emit('update:selectedRowKeys', selectedRowKeys);
            props.rowSelection?.onChange?.(selectedRowKeys, selectedRows);
        },
    };
});

const el = useTemplateRef('antTable');
const { isFullscreen, enter, exit, toggle } = useFullscreen(el as unknown as MaybeElementRef);

console.log(isFullscreen.value, enter());
</script>

<style lang="scss" scoped>
.data-table-container {
    @apply w-full;
}
</style>
