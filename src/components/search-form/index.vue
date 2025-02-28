<!--
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-27 23:49:07
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-02-28 10:12:54
 * @FilePath: src/components/search-form/index.vue
 * @Description: 搜索表单
 -->
<template>
    <div class="xlt-search-box">
        <a-form
            ref="formRef"
            name="advanced_search"
            class="ant-advanced-search-form"
            :model="formState"
            @finish="handleFinish"
        >
            <a-row :gutter="24">
                <template v-for="(field, index) in fields" :key="index">
                    <a-col v-show="expand || (collapseLimit && index < collapseLimit)" :span="8">
                        <a-form-item :name="field.name" :label="field.label" :rules="field.rules">
                            <slot :name="field.name" :field="field">
                                <a-input v-model:value="formState[field.name]" :placeholder="`请输入${field.label}`" />
                            </slot>
                        </a-form-item>
                    </a-col>
                </template>
            </a-row>
            <a-row>
                <a-col :span="24" style="text-align: right">
                    <slot name="actions">
                        <a-button type="primary" html-type="submit">搜索</a-button>
                        <a-button style="margin: 0 8px" @click="handleReset">重置</a-button>
                    </slot>
                    <a v-if="showCollapse" style="font-size: 12px" @click="expand = !expand">
                        <template v-if="expand">
                            <UpOutlined />
                        </template>
                        <template v-else>
                            <DownOutlined />
                        </template>
                        {{ expand ? '收起' : '展开' }}
                    </a>
                </a-col>
            </a-row>
        </a-form>
    </div>
</template>

<script setup lang="ts">
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue';
import type { FormInstance } from 'ant-design-vue';

interface SearchField {
    name: string;
    label: string;
    rules?: any[];

    [key: string]: any;
}

type SearchFormSlots = {
    [K in SearchField['name']]: (props: { field: SearchField }) => any;
} & {
    actions: () => any;
};

const props = defineProps<{
    fields: SearchField[];
    collapseLimit?: number;
    showCollapse?: boolean;
}>();

const emit = defineEmits<{
    (e: 'search', values: any): void;
    (e: 'reset'): void;
}>();

defineSlots<SearchFormSlots>();

const expand = ref(false);
const formRef = ref<FormInstance>();
const formState = reactive<Record<string, any>>({});

const handleFinish = (values: any) => {
    emit('search', values);
};

const handleReset = () => {
    formRef.value?.resetFields();
    emit('reset');
};

defineExpose({
    formRef,
    formState,
});
</script>

<style scoped lang="scss">
.xlt-search-box {
    --xlt-search-box-bg: theme('colors.bg.darkLayout');
    @apply bg-white dark:bg-[var(--xlt-search-box-bg)] pt-2 pl-2 pr-2 pb-2 rounded-lg;
}
</style>
