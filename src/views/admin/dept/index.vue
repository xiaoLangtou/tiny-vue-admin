<!--
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-23 15:14:03
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-03-03 11:50:30
 * @FilePath: src/views/admin/dept/index.vue
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 -->
<template>
    <div class="xlt-container h-full">
        <SplitPane v-model:collapse="isCollapsed" size="300px" :min-size="200" :max-size="600">
            <!-- 左侧内容 -->
            <template #left>
                <div class="panel-left">
                    <h3>部门管理</h3>
                    <p>这里是左侧面板的内容，可以放菜单或者其他功能。</p>
                </div>
            </template>

            <!-- 右侧主要内容 -->
            <template #main>
                <div class="panel-main">
                    <h2>API 管理</h2>
                    <p>这里是主要内容区域。</p>
                    <div class="flex items-center gap-4">
                        <span class="w-3 h-3 bg-[#6366f1]" @click="appStore.toggleColorPrimary('#6366f1')"></span>
                        <span class="w-3 h-3 bg-[#10b981]" @click="appStore.toggleColorPrimary('#10b981')"></span>
                        <span class="w-3 h-3 bg-[#22c55e]" @click="appStore.toggleColorPrimary('#22c55e')"></span>
                        <span class="w-3 h-3 bg-[#3b82f6]" @click="appStore.toggleColorPrimary('#3b82f6')"></span>
                        <span class="w-3 h-3 bg-[#f97316]" @click="appStore.toggleColorPrimary('#f97316')"></span>
                    </div>

                    <a-button type="primary">测试</a-button>
                </div>
            </template>
        </SplitPane>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { SplitPane } from '@/components';
import { useAppStore } from '@/store';

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
