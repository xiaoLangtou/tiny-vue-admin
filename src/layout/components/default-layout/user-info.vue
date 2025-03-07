<!--
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-03-07 13:17:52
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-03-07 13:42:27
 * @FilePath: src/layout/components/default-layout/user-info.vue
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 -->
<template>
    <a-card class="user-panel">
        <div class="user-panel-content">
            <a-avatar :src="Image" :size="45"></a-avatar>
            <div v-if="!menuStore.isCollapsed" class="ml-2 flex flex-col gap-1">
                <div class="text-sm text-black font-bold dark:text-gray-400">
                    <span>Edward</span>
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400">
                    <span> 755197142@qq.com</span>
                </div>
            </div>
        </div>
    </a-card>
</template>

<script setup lang="ts">
import Image from '@/assets/images/img.png';
import { useMenuStore } from '@/store/module';

const menuStore = useMenuStore();
</script>

<style scoped lang="scss">
.user-panel {
    --user-panel-bg-light: rgba(239, 237, 240, 0.6);
    --user-panel-bg-dark: rgb(31, 32, 34);
    @apply bg-[var(--user-panel-bg-light)] dark:bg-[var(--user-panel-bg-dark)] p-0;

    :deep(.ant-card-body) {
        @apply p-0;
    }
}

.user-panel-content {
    @apply flex  items-center pl-2 pr-2 pt-3 pb-3;
}
</style>
