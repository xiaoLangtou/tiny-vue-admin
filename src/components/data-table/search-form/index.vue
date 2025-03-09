<!--
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-27 23:49:07
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-03-09 14:17:16
 * @FilePath: src/components/data-table/search-form/index.vue
 * @Description: 搜索表单
 -->
<template>
    <div class="xlt-container">
        <a-form ref="formRef" name="advanced_search" class="ant-advanced-search-form" :model="formState">
            <a-row :gutter="24">
                <template v-for="(slotName, index) in slotNames" :key="index">
                    <a-col v-show="expand || (collapseLimit && index < collapseLimit)" :span="8">
                        <slot :name="slotName"></slot>
                    </a-col>
                </template>
            </a-row>
            <a-row>
                <a-col :span="24" class="flex items-center justify-end gap-2" style="text-align: right">
                    <slot name="actions">
                        <a-button type="primary" @click="searchEvent(formState)">搜索</a-button>
                        <a-button @click="resetEvent(formState)">重置</a-button>
                    </slot>
                    <a v-if="showCollapse" class="flex items-center" style="font-size: 12px" @click="expand = !expand">
                        <template v-if="expand">
                            <LucideChevronUp :size="14" />
                        </template>
                        <template v-else>
                            <ChevronDown :size="14" />
                        </template>
                        {{ expand ? '收起' : '展开' }}
                    </a>
                </a-col>
            </a-row>
        </a-form>
    </div>
</template>

<script setup lang="ts">
import { LucideChevronUp, ChevronDown } from 'lucide-vue-next';
import { FormState, SearchField } from '@/composables/common/useSearchForm';

const props = defineProps({
    formState: {
        type: Object as PropType<FormState<SearchField[]>>,
        default: () => ({}),
    },
    collapseLimit: {
        type: Number as PropType<number>,
        default: 3,
    },
    showCollapse: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    searchEvent: {
        type: Function as PropType<(formState: FormState<SearchField[]>) => void>,
        default: () => {},
    },
    resetEvent: {
        type: Function as PropType<(formState: FormState<SearchField[]>) => void>,
        default: () => {},
    },
});
// 动态生成插槽名的类型定义
type SlotNames = keyof FormState<SearchField[]> extends string ? keyof FormState<SearchField[]> : never;

defineSlots<{
    [K in SlotNames]: (payload: any) => any;
}>();

const expand = ref(false);

const slots = useSlots();

const slotNames = Object.keys(slots).filter((name) => name !== 'actions');

defineOptions({
    name: 'SearchForm',
});
</script>
