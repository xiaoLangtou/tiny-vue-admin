<template>
    <div class="data-table-container">
        <TeleportFullscreen :is-fullscreen="isFullscreen">
            <!-- 表格工具栏 -->
            <table-toolbar
                :is-fullscreen="isFullscreen"
                @add="$emit('add')"
                @refresh="$emit('refresh')"
                @fullscreen="toggleFullscreen"
                @column-setting="openColumnSetting"
                @import="$emit('import')"
                @export="$emit('export')"
                @toggle-advanced-search="(value) => $emit('toggleAdvancedSearch', value)"
            >
                <template #buttons>
                    <slot name="toolbar-buttons"></slot>
                </template>
            </table-toolbar>

            <!-- 全屏表格 -->

            <a-table
                v-bind="$attrs"
                class="xlt-table"
                :bordered="bordered === 1"
                :dataSource="dataSource"
                :columns="visibleColumns"
                :pagination="false"
                :scroll="{ x: 1600, y: heightFull === 1 ? undefined : 'calc(100vh - 484px)' }"
                :loading="loading"
                :rowKey="rowKey"
                :rowSelection="rowSelection"
                @change="handleTableChange"
            >
                <template v-for="(_, name) in slots" #[name]="slotData">
                    <slot :name="name" v-bind="slotData"></slot>
                </template>
            </a-table>

            <div class="xlt-pagination">
                <a-pagination
                    v-model:current="tablePagination.current"
                    v-model:page-size="tablePagination.pageSize"
                    :total="tablePagination.total"
                    :show-total="tablePagination.showTotal"
                    show-quick-jumper
                    @change="handlePageChange"
                    @show-size-change="handleSizeChange"
                />
            </div>

            <!-- 列设置 -->
            <column-setting
                v-model:visible="showColumnSetting"
                :columns="settingColumns"
                :height-full="heightFull"
                :show-border="bordered"
                :default-columns="columns"
                @columns-change="handleColumnsChange"
            />
        </TeleportFullscreen>
    </div>
</template>

<script setup lang="ts">
import TableToolbar from '@/components/data-table/table-toolbar/index.vue';
import ColumnSetting from '@/components/data-table/column-setting/index.vue';
import { TableProps, TablePaginationConfig, TableColumnType, FilterDropdownProps } from 'ant-design-vue';
import { StorageUtil } from '@/utils/storage';
import TeleportFullscreen from '../fullscreen/teleport.vue';

// **定义组件属性**
interface DataTableProps {
    dataSource?: any[];
    columns?: any[];
    pagination?: false | TablePaginationConfig;
    loading?: boolean;
    rowKey?: string | ((record: any) => string);
    rowSelection?: TableProps['rowSelection'];
    locale?: boolean;
    localeName?: string;
}

const props = withDefaults(defineProps<DataTableProps>(), {
    dataSource: () => [],
    columns: () => [],
    pagination: () => ({}),
    loading: false,
    rowKey: 'id',
    locale: false,
    localeName: '',
});

const emit = defineEmits<{
    (e: 'add' | 'refresh' | 'fullscreen' | 'columnSetting' | 'import' | 'export', ...args: any): void;
    (e: 'change', pagination: TablePaginationConfig, filters: any, sorter: any): void;
    (e: 'pageChange', value: { current: number; size: number }): void;
    (e: 'update:selectedRowKeys', selectedRowKeys: any[]): void;
    (e: 'toggleAdvancedSearch', value: boolean): void;
}>();

defineSlots<{
    // 静态插槽
    title: (props: { currentPageData: any[] }) => void;
    footer: (props: { currentPageData: any[] }) => void;
    bodyCell: (props: { text: any; record: Record<string, any>; index: number; column: any; value: any }) => void;
    customFilterDropdown: (props: { customFilterDropdown: FilterDropdownProps }) => void;
    customFilterIcon: (props: { filtered: any; column: TableColumnType }) => void;
    emptyText: () => void;
    expandIcon: (props: { expanded: any; onExpand: any; record: any }) => void;
    expandedRowRender: (props: { record: Record<string, any>; index: number; indent: any; expanded: any }) => void;
    expandColumnTitle: () => void;
    headerCell: (props: { title: string; column: TableColumnType }) => void;
    summary: () => void;

    // 动态插槽（改为与静态插槽一致的类型）
    [key: string]: (props: {
        record: Record<string, any>;
        index: number;
        column: TableColumnType;
        currentPageData: any[];
        text: any;
        customFilterDropdown: FilterDropdownProps;
        filtered: any;
        expanded: boolean;
        onExpand: string;
        indent: any;
        customFilterIcon: FilterDropdownProps;
        value: any;
        title: string;
    }) => void;
}>();
const slots = useSlots();

defineOptions({
    name: 'DataTable',
    inheritAttrs: false,
});

const bordered = ref<1 | 2>(2);
const heightFull = ref<1 | 2>(2);
// **列设置状态**
const showColumnSetting = ref(false);
const columnsConfig = ref<Record<string, { visible: boolean; fixed?: 'left' | 'right' }>>({});
const settingColumns = ref<any[]>([]);

// **分页配置**
const defaultPagination = ref({
    total: 0,
    current: 1,
    pageSize: 10,
    pageSizeOptions: [10, 20, 30, 40, 50],
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total: number) => `共 ${total} 条`,
});
const tablePagination = computed<TablePaginationConfig>(() => ({
    ...defaultPagination.value,
    ...props.pagination,
}));

// **行选择配置**
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

// **列可见性计算**
const visibleColumns = ref<any[]>([]);

// **打开列设置**
const openColumnSetting = () => {
    showColumnSetting.value = true;
};

// **处理列变更**
const handleColumnsChange = (columns: any[], _heightFull: 1 | 2 = 1, showBorder: 1 | 2 = 1) => {
    bordered.value = showBorder;
    heightFull.value = _heightFull;
    initColumns(columns);
};

// **表格事件处理**
const handleTableChange = (pagination: TablePaginationConfig, filters: any, sorter: any) => {
    emit('change', pagination, filters, sorter);
};

const handlePageChange = (current: number, pageSize: number) => {
    emit('pageChange', { current, size: pageSize });
};
const handleSizeChange = (current: number, pageSize: number) => {
    emit('pageChange', { current: 1, size: pageSize });
};

// **初始化列**
const initColumns = (columns: any[]) => {
    settingColumns.value = columns.filter((column) => column.key !== 'operation');
    columnsConfig.value = columns.reduce((acc, column) => {
        acc[column.key] = { visible: column.visible ?? true, fixed: column.fixed };
        return acc;
    }, {});

    if (props.locale) {
        loadSavedColumnConfig();
    }

    updateVisibleColumns();
};

// **加载已保存的列配置**
const loadSavedColumnConfig = () => {
    const savedConfig = StorageUtil.get<Record<string, any>>(`${props.localeName}_table-column-config`);
    if (savedConfig) {
        Object.assign(columnsConfig.value, savedConfig);
    }
};

// **保存列配置**
const throttledColumnsConfig = useThrottle(columnsConfig, 1000);
watch(
    throttledColumnsConfig,
    () => {
        if (props.locale) {
            StorageUtil.set(`${props.localeName}_table-column-config`, JSON.stringify(columnsConfig.value));
        }
    },
    { deep: true },
);

// **更新表格可见列**
const updateVisibleColumns = () => {
    visibleColumns.value = props.columns
        .map((col) => ({
            ...col,
            visible: columnsConfig.value[col.key]?.visible ?? true,
        }))
        .filter((col) => col.visible);
};

// **监听列变化**
watch(
    () => props.columns,
    () => {
        initColumns(props.columns);
    },
    { immediate: true },
);

const isFullscreen = ref(false);
const toggleFullscreen = () => {
    isFullscreen.value = !isFullscreen.value;
};
</script>

<style lang="scss" scoped>
.data-table-container {
    @apply w-full;
}
</style>
