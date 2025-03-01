<template>
    <a-drawer
        :visible="visible"
        title="列设置"
        placement="right"
        width="300"
        @close="handleClose"
    >
        <div class="column-setting">
            <!-- 重置按钮 -->
            <div class="reset-section">
                <a-button type="link" @click="handleReset">重置</a-button>
            </div>

            <!-- 列拖拽排序区域 -->
            <VueDraggable
                v-model="localColumns"
                item-key="dataIndex"
                handle=".drag-handle"
                class="column-list"
                @end="handleDragEnd"
            >
                <template #item="{ element }">
                    <div class="column-item">
                        <div class="left-section">
                            <GripVertical class="drag-handle" />
                            <a-checkbox
                                v-model:checked="element.visible"
                                @change="handleColumnVisibleChange"
                            >
                                {{ element.title }}
                            </a-checkbox>
                        </div>
                    </div>
                </template>
            </VueDraggable>
        </div>
    </a-drawer>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { GripVertical } from 'lucide-vue-next';
import { VueDraggable } from 'vue-draggable-plus';

interface ColumnItem {
    title: string;
    dataIndex: string;
    visible?: boolean
    [key: string]: any;
}

const props = defineProps<{
    visible: boolean;
    columns: ColumnItem[];
}>();

const emit = defineEmits<{
    (e: 'update:visible', visible: boolean): void;
    (e: 'columnsChange', columns: ColumnItem[]): void;
}>();


// 本地列配置
const localColumns = ref<ColumnItem[]>([]);

// 监听columns变化
watch(
    () => props.columns,
    (newColumns) => {
        localColumns.value = newColumns.map((column) => ({
            ...column,
            visible: column.visible ?? true,
        }));
    },
    { immediate: true }
);

// 处理关闭
const handleClose = () => {
    emit('update:visible', false);
};

// 处理重置
const handleReset = () => {
    localColumns.value = props.columns.map((column) => ({
        ...column,
        visible: true,
    }));
    emit('columnsChange', localColumns.value);
};

// 处理列显示状态变化
const handleColumnVisibleChange = () => {
    emit('columnsChange', localColumns.value);
};

// 处理拖拽结束
const handleDragEnd = () => {
    emit('columnsChange', localColumns.value);
};
</script>

<style lang="scss" scoped>
.column-setting {
    .reset-section {
        @apply flex justify-end mb-4;
    }

    .column-list {
        @apply space-y-2;
    }

    .column-item {
        @apply flex items-center justify-between p-2 bg-bg-container dark:bg-bg-darkContainer rounded;
        @apply border border-border dark:border-border-dark;

        .left-section {
            @apply flex items-center gap-2;

            .drag-handle {
                @apply cursor-move text-text-secondary dark:text-text-darkSecondary;
            }
        }
    }
}
</style>
