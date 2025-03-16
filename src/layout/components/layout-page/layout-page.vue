<!--
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-23 14:15:46
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-03-15 12:23:50
 * @FilePath: src/layout/components/layout-page/layout-page.vue
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 -->
<template>
    <div class="page-container">
        <router-view v-slot="{ Component, route }">
            <template v-if="Component">
                <component :is="Component" :key="route.fullPath" />
            </template>
        </router-view>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    // 面包屑高度
    breadcrumbHeight: {
        type: String,
        default: '0px',
    },
});

const breadcrumbHeight = computed(() => {
    return props.breadcrumbHeight;
});
</script>
<style lang="scss" scoped>
.page-container {
    //--page-footer-height: theme('height.16');
    --page-header-height: 64px;
    --breadcrumnb-height: v-bind(breadcrumbHeight);
    --page-content-height: calc(100vh - var(--page-header-height) - var(--breadcrumnb-height));
    height: var(--page-content-height);
    @apply w-full overflow-auto p-3;
}
</style>
