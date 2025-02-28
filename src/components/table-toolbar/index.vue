<template>
    <div class="table-toolbar">
        <!-- 左侧按钮区 -->
        <div class="left-section">
            <a-button type="primary" class="add-button" @click="emit('add')">
                <template #icon>
                    <Plus class="w-4 h-4" />
                </template>
                新增
            </a-button>
            <slot name="buttons"></slot>
        </div>

        <!-- 右侧功能区 -->
        <div class="right-section">
            <a-input-search
                v-model:value="searchValue"
                placeholder="请输入关键词搜索"
                style="width: 200px"
                @search="handleQuickSearch"
            />
            <a-button
                type="primary"
                :icon="h(showAdvancedSearch? ScanEye({ size: 18 }, {} as any) :ScanSearch({ size: 18 }, {} as any))"
                class="action-button !text-white hover:!bg-primary-hover"
                @click="toggleAdvancedSearch"
            ></a-button>
            <a-tooltip title="刷新">
                <a-button
                    type="text"
                    :icon="h(RotateCw({ size: 18 }, {} as any))"
                    class="action-button"
                    @click="emit('refresh')"
                />
            </a-tooltip>
            <a-tooltip title="全屏">
                <a-button
                    type="text"
                    :icon="h(Expand({ size: 18 }, {} as any))"
                    class="action-button"
                    @click="emit('fullscreen')"
                />
            </a-tooltip>
            <a-tooltip title="列设置">
                <a-button
                    type="text"
                    :icon="h(Settings({ size: 18 }, {} as any))"
                    class="action-button"
                    @click="emit('columnSetting')"
                />
            </a-tooltip>
            <a-tooltip title="导入">
                <a-button
                    type="text"
                    :icon="h(Upload({ size: 18 }, {} as any))"
                    class="action-button"
                    @click="emit('import')"
                />
            </a-tooltip>
            <a-tooltip title="导出">
                <a-button
                    type="text"
                    :icon="h(Download({ size: 18 }, {} as any))"
                    class="action-button"
                    @click="emit('export')"
                />
            </a-tooltip>
        </div>
    </div>
</template>

<script setup lang="ts">
import { h, ref } from 'vue';
import {
    Download,
    Minimize,
    Plus,
    RotateCw,
    Settings,
    Upload,
    ChevronDown,
    ScanSearch,
    ScanEye,
    Expand,
} from 'lucide-vue-next';

const emit =
    defineEmits<
        (
            e:
                | 'add'
                | 'refresh'
                | 'fullscreen'
                | 'columnSetting'
                | 'import'
                | 'export'
                | 'quickSearch'
                | 'toggleAdvancedSearch',
            ...args: any[]
        ) => void
    >();

const searchValue = ref('');
const showAdvancedSearch = ref(false);

const handleQuickSearch = (value: string) => {
    emit('quickSearch', value);
};

const toggleAdvancedSearch = () => {
    showAdvancedSearch.value = !showAdvancedSearch.value;
    emit('toggleAdvancedSearch', showAdvancedSearch.value);
};

defineOptions({
    name: 'TableToolbar',
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

    .add-button {
        @apply flex items-center;
    }

    .right-section {
        @apply flex items-center gap-1;

        .action-button {
            flex: 0 0 30px;
            @apply flex items-center justify-center text-text-secondary dark:text-text-darkSecondary hover:text-primary hover:bg-primary-light dark:hover:bg-primary-dark/20;
            @apply transition-colors duration-300;

            &:hover {
                @apply text-primary-hover dark:text-primary-hover;
            }
        }

        :deep(.ant-input-group-addon .ant-btn) {
            @apply flex items-center justify-center;
        }
    }
}

@media (max-width: 640px) {
    .table-toolbar {
        @apply flex-col gap-4;

        .left-section,
        .right-section {
            @apply w-full justify-center;
        }

        .quick-search {
            @apply w-full;
        }
    }
}
</style>
