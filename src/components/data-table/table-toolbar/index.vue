<template>
    <div class="table-toolbar">
        <!-- 左侧按钮区 -->
        <div class="left-section">
            <slot name="buttons">
                <a-button type="primary" class="xlt-flex-center !gap-0" @click="emit('add')">
                    <template #icon>
                        <Plus class="w-4 h-4" />
                    </template>
                    {{ addBtnText }}
                </a-button>
            </slot>
        </div>

        <!-- 右侧功能区 -->
        <div class="right-section">
            <slot name="toolbar"></slot>
            <a-tooltip v-if="showRefresh" title="刷新">
                <a-button :icon="h(RotateCw({ size: 18 }, {} as any))" class="action-button" @click="emit('refresh')" />
            </a-tooltip>
            <a-tooltip v-if="showFullscreen" title="全屏">
                <a-button
                    :icon="h(isFullscreen ? Shrink({ size: 18 }, {} as any) : Expand({ size: 18 }, {} as any))"
                    class="action-button"
                    @click="emit('fullscreen')"
                />
            </a-tooltip>
            <a-popover v-if="showColumnSetting" trigger="click" placement="bottomRight">
                <template #content>
                    <div class="column-setting-menu">
                        <div class="column-setting-header">
                            <a-checkbox
                                v-model:checked="checkAll"
                                :indeterminate="indeterminate"
                                @change="onCheckAllChange"
                            >
                                全选
                            </a-checkbox>
                            <a-button size="small" @click="handleResetColumns">重置</a-button>
                        </div>

                        <a-checkbox-group
                            v-model:value="selectedColumnKeys"
                            class="flex flex-col w-full"
                            @change="handleSelectChange"
                        >
                            <div v-for="column in columns" :key="column.key" class="column-setting-item">
                                <div class="flex items-center justify-between w-full">
                                    <a-checkbox :value="column.key">
                                        {{ column.title }}
                                    </a-checkbox>
                                    <a-tooltip :title="getFixedTooltip(column)">
                                        <span>
                                            <component
                                                :is="getFixedIcon(column)"
                                                class="w-4 h-4 cursor-pointer"
                                                @click="toggleColumnFixed(column)"
                                            />
                                        </span>
                                    </a-tooltip>
                                </div>
                            </div>
                        </a-checkbox-group>
                    </div>
                </template>
                <a-button :icon="h(Settings({ size: 18 }, {} as any))" class="action-button" />
            </a-popover>
            <a-tooltip v-if="showImport" title="导入">
                <a-button :icon="h(Upload({ size: 18 }, {} as any))" class="action-button" @click="emit('import')" />
            </a-tooltip>
            <a-tooltip v-if="showExport" title="导出">
                <a-button :icon="h(Download({ size: 18 }, {} as any))" class="action-button" @click="emit('export')" />
            </a-tooltip>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    AlignEndVertical,
    AlignStartVertical,
    Download,
    Expand,
    Pin,
    Plus,
    RotateCw,
    Settings,
    Shrink,
    Upload,
} from 'lucide-vue-next';
import { h } from 'vue';

interface TableColumn {
    key: string;
    title: string;
    visible?: boolean;
    fixed?: 'left' | 'right' | null;

    [key: string]: any;
}

const props = withDefaults(
    defineProps<{
        columns?: TableColumn[];
        showRefresh?: boolean;
        showColumnSetting?: boolean;
        showImport?: boolean;
        showExport?: boolean;
        showFullscreen?: boolean;
        isFullscreen?: boolean;
        addBtnText?: string;
    }>(),
    {
        columns: () => [],
        showRefresh: true,
        showColumnSetting: true,
        showImport: false,
        showExport: false,
        showFullscreen: true,
        isFullscreen: false,
        addBtnText: '新增',
    },
);

const emit = defineEmits<{
    (e: 'add'): void;
    (e: 'refresh'): void;
    (e: 'fullscreen'): void;
    (e: 'columnSetting', columnVisible: Map<string, boolean>): void;
    (e: 'resetColumns'): void;
    (e: 'columnFixed', key: string, fixed: 'left' | 'right' | null): void;
    (e: 'import'): void;
    (e: 'export'): void;
    (e: 'quickSearch'): void;
    (e: 'toggleAdvancedSearch'): void;
}>();

/**
 * 列设置相关
 */

// 固定列图标
const fixedIcons = {
    left: AlignStartVertical,
    right: AlignEndVertical,
    default: Pin,
};

// 获取固定列的提示信息
const getFixedTooltip = (item: TableColumn) => {
    return item.fixed === 'left' ? '固定在左侧' : item.fixed === 'right' ? '固定在右侧' : '不固定';
};

// 获取固定列的图标
const getFixedIcon = (item: TableColumn) => fixedIcons[item.fixed ?? 'default'];
// 当前选中的列键名
const selectedColumnKeys = ref<string[]>([]);

// 显示/隐藏结果
const columnVisibleResult = new Map();

// 全选状态
const checkAll = ref(false);
// 半选状态
const indeterminate = ref(false);

// 初始化选中的列
const initSelectedColumns = () => {
    selectedColumnKeys.value = props.columns.filter((column) => column.visible !== false).map((column) => column.key);
    updateCheckAllState();
};

// 更新全选框状态
const updateCheckAllState = () => {
    const total = props.columns.length;
    const selected = selectedColumnKeys.value.length;

    checkAll.value = selected === total;
    indeterminate.value = selected > 0 && selected < total;
};

// 全选/取消全选
const onCheckAllChange = (e: { target: { checked: boolean } }) => {
    const checked = e.target.checked;
    selectedColumnKeys.value = checked ? props.columns.map((column) => column.key) : [];

    // 更新所有列的可见性
    props.columns.forEach((column) => {
        if (columnVisibleResult.has(column.key)) {
            columnVisibleResult.set(column.key, checked);
        } else {
            columnVisibleResult.set(column.key, checked);
        }
    });
    emit('columnSetting', columnVisibleResult);
    updateCheckAllState();
};

const handleSelectChange = () => {
    props.columns.forEach((column) => {
        const visible = selectedColumnKeys.value.includes(column.key);
        if (columnVisibleResult.has(column.key)) {
            columnVisibleResult.set(column.key, visible);
        } else {
            columnVisibleResult.set(column.key, visible);
        }
    });
    emit('columnSetting', columnVisibleResult);
    updateCheckAllState();
};

// 重置列设置
const handleResetColumns = () => {
    emit('resetColumns');
    initSelectedColumns();
};

// 切换列固定状态
const toggleColumnFixed = (column: TableColumn) => {
    if (column.fixed === 'left') {
        column.fixed = 'right';
    } else if (column.fixed === 'right') {
        column.fixed = null;
    } else {
        column.fixed = 'left';
    }

    emit('columnFixed', column.key, column.fixed);
};

// 监听列变化，重新初始化选中状态
watch(
    () => props.columns,
    () => {
        initSelectedColumns();
    },
    { immediate: true },
);

defineOptions({
    name: 'TableToolbar',
    inheritAttrs: true,
});
</script>

<style lang="scss" scoped>
.table-toolbar {
    @apply flex justify-between items-center mb-4;
    @apply dark:border-border-dark transition-colors duration-300;

    .left-section {
        @apply flex items-center gap-2;

        .quick-search {
            @apply w-64;
        }

        .advanced-search-btn {
            @apply flex items-center gap-1 px-0;
        }
    }

    .right-section {
        @apply flex items-center gap-2;

        .action-button {
            @apply flex items-center justify-center;
        }
    }
}

.column-setting-menu {
    @apply flex flex-col gap-2 w-40;

    .column-setting-header {
        @apply flex items-center justify-between gap-2;
    }

    .column-setting-item {
        @apply p-1 rounded-md;
        @apply hover:bg-gray-200 dark:hover:bg-gray-700;
    }
}
</style>
