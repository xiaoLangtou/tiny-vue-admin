<!--
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-03-04 16:47:07
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-03-04 23:11:28
 * @FilePath: src/views/system/dict/index.vue
 * @Description: 字典管理
 -->
<template>
    <div class="xlt-container h-full">
        <SplitPane v-model:collapse="isCollapsed" size="300px" :min-size="200" :max-size="600">
            <!-- 左侧内容 -->
            <template #left>
                <div class="w-full">
                    <dict-type></dict-type>
                </div>
            </template>

            <!-- 右侧主要内容 -->
            <template #main>
                <dict-data dict-type=""></dict-data>
            </template>
        </SplitPane>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { SplitPane } from '@/components';
import { useAppStore } from '@/store';
import DictType from '@/views/system/dict/component/dict-type.vue';
import DictData from '@/views/system/dict/component/dict-data.vue';

const isCollapsed = ref(false);

const appStore = useAppStore();
</script>

<style scoped>
.panel-left {
    padding: 16px;
    background-color: red;
    height: 100%;
}

.panel-main {
    padding: 16px;
    height: 100%;
}
</style>
