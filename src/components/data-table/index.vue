<template>
    <div class="data-table-container">
        <TeleportFullscreen :is-fullscreen="isTeleportFullscreen">
            <!-- 表格工具栏 -->
            <table-toolbar
                v-if="isToolbar"
                v-bind="toolbarProps"
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

            <!-- 表格 -->
            <a-table
                v-bind="tableAttrs"
                ref="tableWrapperRef"
                class="xlt-table"
                :bordered="bordered === 1"
                :dataSource="dataSource"
                :columns="visibleColumns"
                :pagination="false"
                :scroll="scrollConfig"
                :loading="loading"
                :rowKey="rowKey"
                :rowSelection="computedRowSelection"
            >
                <template v-for="(_, name) in slots" #[name]="slotData">
                    <slot :name="name" v-bind="slotData"></slot>
                </template>
            </a-table>

            <!-- 分页 -->
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
import { computed, ref, watch, useAttrs, useSlots } from 'vue';
import TableToolbar from '@/components/data-table/table-toolbar/index.vue';
import ColumnSetting from '@/components/data-table/column-setting/index.vue';
import { TablePaginationConfig } from 'ant-design-vue';
import TeleportFullscreen from '../fullscreen/teleport.vue';
import { StorageUtil } from '@/utils/storage';
import { useTableScroll } from '@/composables/common/useTableScroll';
import { DataTableProps, TableToolbarProps } from '@/components/data-table/types';

const props = withDefaults(defineProps<DataTableProps & TableToolbarProps>(), {
    dataSource: () => [],
    columns: () => [],
    pagination: () => ({}),
    loading: false,
    rowKey: 'id',
    isToolbar: true,
    showRefresh: true,
    showColumnSetting: true,
    showImport: false,
    showExport: false,
    showFullscreen: true,
    isFullscreen: false,
    addBtnText: '新增',
});

const emit = defineEmits<{
    (e: 'add' | 'refresh' | 'fullscreen' | 'columnSetting' | 'import' | 'export', ...args: any): void;
    (e: 'change', pagination: TablePaginationConfig, filters: any, sorter: any): void;
    (e: 'pageChange', value: { current: number; size: number }): void;
    (e: 'update:selectedRowKeys', selectedRowKeys: any[]): void;
    (e: 'toggleAdvancedSearch', value: boolean): void;
}>();

// **定义 `props`**

const slots = useSlots();
const attrs = useAttrs();

// **工具栏的 `props`**
const toolbarProps = computed(() => ({
    showRefresh: props.showRefresh,
    showColumnSetting: props.showColumnSetting,
    showImport: props.showImport,
    showExport: props.showExport,
    showFullscreen: props.showFullscreen,
    isFullscreen: props.isFullscreen,
    addBtnText: props.addBtnText,
}));

// **表格 `attrs`**
const tableAttrs = computed(() => ({
    ...attrs,
    class: 'xlt-table',
}));

defineOptions({
    name: 'DataTable',
    inheritAttrs: false,
});

// **状态管理**
const bordered = ref<1 | 2>(2);
const heightFull = ref<1 | 2>(2);
// eslint-disable-next-line vue/no-dupe-keys
const showColumnSetting = ref(false);
const settingColumns = ref<any[]>([]);

// **分页**
const defaultPagination = ref({
    total: 0,
    current: 1,
    pageSize: 10,
    pageSizeOptions: [10, 20, 30, 40, 50],
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total: number) => `共${total}条`,
});
const tablePagination = computed(() => ({
    ...defaultPagination.value,
    ...props.pagination,
}));

// **行选择**
const computedRowSelection = computed(() => {
    if (!props.rowSelection) return undefined;
    return {
        ...props.rowSelection,
        onChange: (selectedRowKeys: any[]) => {
            emit('update:selectedRowKeys', selectedRowKeys);
            props.rowSelection?.onChange?.(selectedRowKeys);
        },
    };
});

// **列设置**
const columnsConfig = ref<Record<string, { visible: boolean; fixed?: 'left' | 'right' }>>({});
const visibleColumns = computed(() =>
    props.columns
        ?.map((col) => ({
            ...col,
            visible: columnsConfig.value[col.key]?.visible ?? true,
        }))
        .filter((col) => col.visible),
);

// **打开列设置**
const openColumnSetting = () => {
    showColumnSetting.value = true;
};

// **列设置变化处理**
const handleColumnsChange = (columns: any[], _heightFull: 1 | 2, showBorder: 1 | 2) => {
    bordered.value = showBorder;
    heightFull.value = _heightFull;
    initColumns(columns);
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
};

// **加载本地列配置**
const loadSavedColumnConfig = () => {
    const savedConfig = StorageUtil.get<Record<string, any>>(`${props.localeName}_table-column-config`);
    if (savedConfig) {
        Object.assign(columnsConfig.value, savedConfig);
    }
};

// **保存列配置**
watch(
    columnsConfig,
    () => {
        if (props.locale) {
            StorageUtil.set(`${props.localeName}_table-column-config`, columnsConfig.value);
        }
    },
    { deep: true },
);

// **监听列变化**
watch(
    () => props.columns,
    () => {
        initColumns(props.columns);
    },
    { immediate: true },
);

const { scrollConfig } = useTableScroll();

// **全屏模式**
const isTeleportFullscreen = ref(false);
const toggleFullscreen = () => {
    isTeleportFullscreen.value = !isTeleportFullscreen.value;
};
</script>
