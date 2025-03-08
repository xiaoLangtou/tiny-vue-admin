<template>
    <div class="table-toolbar">
        <!-- 左侧按钮区 -->
        <div class="left-section">
            <slot name="buttons">
                <a-button type="primary" class="add-button" @click="emit('add')">
                    <template #icon>
                        <Plus class="w-4 h-4" />
                    </template>
                    {{ addBtnText }}
                </a-button>
            </slot>
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
                v-if="showSearch"
                :icon="h(showAdvancedSearch? ScanEye({ size: 18 }, {} as any) :ScanSearch({ size: 18 }, {} as any))"
                class="action-button"
                @click="toggleAdvancedSearch"
            ></a-button>
            <a-tooltip v-if="showRefresh" title="刷新">
                <a-button :icon="h(RotateCw({ size: 18 }, {} as any))" class="action-button" @click="emit('refresh')" />
            </a-tooltip>
            <a-tooltip v-if="showFullscreen" title="全屏">
                <a-button
                    :icon="h(isFullscreen?Shrink({ size: 18 }, {} as any) :Expand({ size: 18 }, {} as any))"
                    class="action-button"
                    @click="emit('fullscreen')"
                />
            </a-tooltip>
            <a-tooltip v-if="showColumnSetting" title="列设置">
                <a-button
                    :icon="h(Settings({ size: 18 }, {} as any))"
                    class="action-button"
                    @click="emit('columnSetting')"
                />
            </a-tooltip>
            <a-tooltip v-if="showImport" title="导入">
                <a-button :icon="h(Upload({ size: 18 }, {} as any))" class="action-button" @click="emit('import')" />
            </a-tooltip>
            <a-tooltip v-if="showExport" title="导出">
                <a-button :icon="h(Download({ size: 18 }, {} as any))" class="action-button" @click="emit('export')" />
            </a-tooltip>
            <slot name="toolbar"></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { h, ref } from 'vue';
import { Download, Expand, Plus, RotateCw, ScanEye, ScanSearch, Settings, Shrink, Upload } from 'lucide-vue-next';
import { tableToolbarProps, TableToolbarProps } from '../types';

const props = defineProps(tableToolbarProps);
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

const handleSearch = () => {
    emit('quickSearch', searchValue.value);
};

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
    inheritAttrs: true, // 确保继承 attrs
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
        @apply flex items-center gap-2;

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
