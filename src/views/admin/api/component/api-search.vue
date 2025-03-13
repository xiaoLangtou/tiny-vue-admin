<!--
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-03-09 11:55:18
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-03-12 16:57:06
 * @FilePath: src/views/admin/api/component/api-search.vue
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 -->
<template>
    <search-form :form-state="formState" :search-event="handleSearch" :reset-event="handleReset">
        <template #path>
            <a-form-item label="接口路径" name="path">
                <a-input v-model:value="formState.path"></a-input>
            </a-form-item>
        </template>
        <template #method>
            <a-form-item label="请求方式" name="method">
                <a-select v-model:value="formState.method">
                    <a-select-option v-for="(item, index) in HTTP_METHOD" :key="index" :value="item"
                        >{{ item }}({{ HttpMethodCN[item] }})
                    </a-select-option>
                </a-select>
            </a-form-item>
        </template>
        <template #tags>
            <a-form-item label="所属分组" name="tags">
                <a-input v-model:value="formState.tags"></a-input>
            </a-form-item>
        </template>
        <template #description>
            <a-form-item label="接口描述" name="description">
                <a-input v-model:value="formState.description"></a-input>
            </a-form-item>
        </template>
    </search-form>
</template>

<script setup lang="ts">
import { useSearchForm } from '@/composables';
import { HTTP_METHOD, HttpMethodCN } from '@/global/enums';

const emit = defineEmits(['search', 'reset']);

const { formState, handleSearch, handleReset } = useSearchForm(
    {
        fields: ['path', 'method', 'tags', 'description'] as const,
    },
    emit,
);
</script>
