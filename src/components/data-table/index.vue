<template>
    <div class="data-table-container">
        <TeleportFullscreen :is-fullscreen="isTeleportFullscreen">
            <!-- 表格工具栏 -->
            <table-toolbar
                v-if="isToolbar"
                v-bind="toolbarProps"
                :columns="settingColumns"
                @add="$emit('add')"
                @refresh="$emit('refresh')"
                @fullscreen="toggleFullscreen"
                @import="$emit('import')"
                @export="$emit('export')"
                @column-setting="toggleColumnSetting"
                @column-fixed="toggleColumnFixed"
            >
                <template #buttons>
                    <slot name="toolbar-buttons"></slot>
                </template>
            </table-toolbar>

            <!-- 表格主体 -->
            <div ref="tableWrapperRef">
                <a-table
                    v-bind="tableAttrs"
                    class="xlt-table h-full"
                    :bordered="bordered === 1"
                    :default-expand-all-rows="true"
                    :data-source="dataSource"
                    :columns="visibleColumns"
                    :pagination="false"
                    :scroll="scrollConfig"
                    :loading="loading"
                    :row-key="rowKey"
                    :row-selection="computedRowSelection"
                >
                    <template v-for="(_, name) in slots" #[name]="slotData">
                        <slot :name="name" v-bind="slotData"></slot>
                    </template>
                </a-table>
            </div>

            <!-- 分页 -->
            <div v-if="showPagination" class="xlt-pagination">
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
        </TeleportFullscreen>
    </div>
</template>

<script setup lang="ts">
import TableToolbar from '@/components/data-table/table-toolbar/index.vue';
import type { DataTableProps, TableToolbarProps } from '@/components/data-table/types';
import { useMd5Id } from '@/composables/common/useMd5Id.ts';
import { StorageUtil } from '@/utils/storage';
import { type TablePaginationConfig } from 'ant-design-vue';
import { useAttrs, useSlots } from 'vue';
import TeleportFullscreen from '../fullscreen/teleport.vue';

// **组件属性定义**
const props = withDefaults(defineProps<DataTableProps & TableToolbarProps>(), {
    dataSource: () => [],
    columns: () => [],
    pagination: () => ({}),
    showPagination: true,
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

// **事件定义**
const emit = defineEmits<{
    (e: 'add' | 'refresh' | 'fullscreen' | 'columnSetting' | 'import' | 'export', ...args: any): void;
    (e: 'change', pagination: TablePaginationConfig, filters: any, sorter: any): void;
    (e: 'pageChange', value: { current: number; size: number }): void;
    (e: 'update:selectedRowKeys', selectedRowKeys: any[], selectedRows: any[]): void;
    (e: 'toggleAdvancedSearch', value: boolean): void;
}>();

// **基础配置**
const slots = useSlots();
const attrs = useAttrs();

// **工具栏配置**
const toolbarProps = computed(() => ({
    showRefresh: props.showRefresh,
    showColumnSetting: props.showColumnSetting,
    showImport: props.showImport,
    showExport: props.showExport,
    showFullscreen: props.showFullscreen,
    isFullscreen: props.isFullscreen,
    addBtnText: props.addBtnText,
}));

// **表格属性配置**
const tableAttrs = computed(() => ({
    ...attrs,
    class: 'xlt-table',
}));

// 表格唯一id
const route = useRoute();
const tableId = `${useMd5Id(`${route.fullPath}_table-column-config`)}`;

defineOptions({
    name: 'DataTable',
    inheritAttrs: false,
});

// **表格基础状态**
const bordered = ref<1 | 2>(2);
const settingColumns = ref<any[]>([]);

// **分页配置与处理**
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

const handlePageChange = (value: number, size: number) => {
    emit('pageChange', { current: value, size: size });
};

const handleSizeChange = (value: number, size: number) => {
    emit('pageChange', { current: value, size: size });
};

// **列设置相关**
const columnsConfig = new Map<string, { visible: boolean; fixed: 'left' | 'right' | undefined }>();
const visibleColumns = ref<any[]>([]);
// 初始化列配置
const initColumns = (columns: any[]) => {
    // 先剔除掉已经被隐藏的列
    const configKeys = Array.from(columnsConfig.entries())
        .filter(([, value]) => value.visible)
        .map(([key]) => key);

    let _visibleColumns = columns
        .filter((column) => configKeys.includes(column.key))
        .map((column) => {
            return {
                ...column,
                fixed: columnsConfig.get(column.key)?.fixed,
            };
        });

    // 根据固定值left和right进行排序处理，整个列的顺序为left在前，right在后,没有值的在中间
    _visibleColumns = _visibleColumns.sort((a, b) => {
        if (a.fixed === 'left' && b.fixed !== 'left') {
            return -1;
        } else if (a.fixed !== 'left' && b.fixed === 'left') {
            return 1;
        } else if (a.fixed === 'right' && b.fixed !== 'right') {
            return 1;
        } else if (a.fixed !== 'right' && b.fixed === 'right') {
            return -1;
        } else {
            return 0;
        }
    });
    visibleColumns.value = _visibleColumns;

    // 将配置保存到本地
    StorageUtil.set(tableId, Object.fromEntries(columnsConfig.entries()), 7 * 24 * 60 * 60);

    if (props.localeName) {
        loadSavedColumnConfig();
    }
};

// **行选择配置**
const computedRowSelection = computed(() => {
    if (!props.rowSelection) return undefined;
    return {
        ...props.rowSelection,
        onChange: (selectedRowKeys: any[], selectedRows: any[]) => {
            emit('update:selectedRowKeys', selectedRowKeys, selectedRows);
            props.rowSelection?.onChange?.(selectedRowKeys, selectedRows);
        },
    };
});

// 切换列显示状态
const toggleColumnSetting = (result: Map<string, boolean>) => {
    const hiddenKeys = Array.from(result.entries())
        .filter(([, value]) => !value)
        .map(([key]) => key);
    console.log();

    Array.from(columnsConfig.keys()).forEach((item) => {
        if (hiddenKeys.includes(item)) {
            columnsConfig.set(item, {
                visible: false,
                fixed: columnsConfig.get(item)?.fixed,
            });
        } else {
            columnsConfig.set(item, {
                visible: true,
                fixed: columnsConfig.get(item)?.fixed,
            });
        }
    });

    initColumns(props.columns);
};

// 列的固定状态
const toggleColumnFixed = (key: string, fixed: 'left' | 'right' | undefined) => {
    // 更新列的固定状态
    columnsConfig.set(key, {
        visible: columnsConfig.get(key)?.visible ?? true,
        fixed: fixed,
    });
    initColumns(props.columns);
};

// 加载本地列配置
const loadSavedColumnConfig = () => {
    // 将本地配置转换成map
    console.log('加载本地表格配置列');
    return StorageUtil.get<Record<string, any>>(tableId);
};

// 更新列的配置
const updateColumnConfig = (columns: any[]) => {
    // 将列的显示与隐藏，列固定给提出来形成一个对象，方便后期使用
    console.log('更新表格列，开始初始化表格列');
    const localConfig = loadSavedColumnConfig();

    if (localConfig) {
        Object.entries(localConfig).forEach(([key, value]) => {
            columnsConfig.set(key, {
                visible: value.visible,
                fixed: value.fixed,
            });
        });
    } else {
        columns.forEach((column) => {
            columnsConfig.set(column.key, {
                visible: column.visible ?? true,
                fixed: column.fixed ?? undefined,
            });
        });
    }

    settingColumns.value = props.columns
        .filter((column) => column.key !== 'controls')
        .map((col) => {
            return {
                ...col,
                visible: columnsConfig.get(col.key)?.visible ?? true,
                fixed: columnsConfig.get(col.key)?.fixed,
            };
        });

    initColumns(columns);
};

// 监听列变化
watch(
    () => props.columns,
    () => {
        updateColumnConfig(props.columns);
    },
    { immediate: true },
);

// **表格高度自适应**
const tableWrapperRef = shallowRef<HTMLElement | null>(null);
const scrollConfig = ref();

// 计算表格高度
const calculateTableHeight = () => {
    if (!tableWrapperRef.value) return;

    try {
        const containerRect = tableWrapperRef.value.getBoundingClientRect();
        const distanceToBottom = window.innerHeight - containerRect.top;
        const bottomMargin = 200;

        scrollConfig.value = {
            y: Math.max(200, distanceToBottom - bottomMargin),
        };
    } catch (error) {
        console.error('Error calculating table height:', error);
    }
};

// 防抖处理
const debounce = <F extends (...args: any[]) => any>(fn: F, delay: number): ((...args: Parameters<F>) => void) => {
    let timer: number | null = null;
    return function (this: any, ...args: Parameters<F>) {
        if (timer) clearTimeout(timer);
        timer = window.setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
};

const debouncedCalculateHeight = debounce(calculateTableHeight, 200);

// 初始化高度计算
onMounted(async () => {
    await nextTick();
    setTimeout(() => {
        calculateTableHeight();
    }, 0);

    useEventListener(window, 'resize', debouncedCalculateHeight);
});

// **全屏模式**
const isTeleportFullscreen = ref(false);
const toggleFullscreen = () => {
    isTeleportFullscreen.value = !isTeleportFullscreen.value;
};
</script>

<style lang="scss" scoped>
.data-table-container {
    @apply w-full;

    .xlt-table {
        @apply mb-4;
    }

    .xlt-pagination {
        @apply flex justify-end;
    }
}
</style>
