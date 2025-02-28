<!--
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-23 14:15:46
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-02-28 10:04:03
 * @FilePath: src/layout/components/layout-page.vue
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 -->
<template>
    <div class="page-container">
        <router-view v-slot="{ Component, route }">
            <FadeInLeft>
                <component :is="Component" :key="route.fullPath" />
            </FadeInLeft>
        </router-view>
    </div>
</template>

<script setup lang="ts">
import { FadeInLeft } from '@/components';
</script>
<style lang="scss" scoped>
.page-container {
    --page-footer-height: 48px;
    --page-header-height: 64px;
    height: calc(100vh - var(--page-header-height) - var(--page-footer-height));
    @apply w-full overflow-auto p-4;
}
</style>
