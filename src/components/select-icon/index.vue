<template>
    <div class="icon-box xlt-flex-center">
        <a-tag :color="token.colorPrimary" class="xlt-flex-center">
            <template #icon>
                <icon-view :model-value="`Lucide-${activeIcon}`"></icon-view>
            </template>
        </a-tag>
        <a-select
            v-model:value="activeIcon"
            placeholder="请选择或者搜索图标"
            show-search
            allow-clear
            :filter-option="false"
            :options="filteredIcons"
            :loading="loading"
            @search="handleSearch"
            @change="handleCurrentChange"
        >
            <template #option="{ value, label }">
                <div class="flex items-center">
                    <icon-view :model-value="`Lucide-${value}`"></icon-view>
                    <span style="font-weight: bold">{{ label }}</span>
                </div>
            </template>
        </a-select>
    </div>
</template>

<script setup lang="ts">
import * as LucideIcons from 'lucide-vue-next';
import IconView from '@/components/icon-view/index.vue';
import { useAntdToken } from '@/composables';

const { token } = useAntdToken();

defineOptions({
    name: 'SelectIcon',
});

const iconModel = defineModel<string>({ default: '' });
const activeIcon = computed({
    get: () => (iconModel.value ? iconModel.value.replace('Lucide-', '') : undefined),
    set: (value) => {
        iconModel.value = value ? `Lucide-${value}` : '';
    },
});
const loading = ref(false);

// **全部 Lucide 图标名称**
const allIcons = Object.keys(LucideIcons)
    .filter((key) => key !== 'createLucideIcon' && key !== 'icons')
    .map((key) => ({
        value: key,
        label: key,
    }));

// **搜索关键字**
const searchQuery = ref('');
const filteredIcons = ref(allIcons.slice(0, allIcons.length / 2)); // 默认显示前 20 个

// **搜索处理**
const handleSearch = (query: string) => {
    searchQuery.value = query;
    loading.value = true;

    setTimeout(() => {
        if (!query) {
            filteredIcons.value = allIcons.slice(0, allIcons.length / 2); // 没有输入时默认显示前 20 个
        } else {
            filteredIcons.value = allIcons.filter((icon) => icon.label.toLowerCase().includes(query.toLowerCase()));
        }
        loading.value = false;
    }, 200);
};

// **用户选择图标**
const handleCurrentChange = (value: string) => {
    iconModel.value = value ? `Lucide-${value}` : '';
};
</script>

<style scoped lang="scss">
.icon-box {
    width: 100%;

    .icon-view-box {
        @apply w-8 h-8;

        span {
            @apply mr-0;
        }
    }

    .xlt-flex-center {
        @apply w-8 h-8;

        :deep(span) {
            @apply mr-0;
        }
    }
}
</style>
