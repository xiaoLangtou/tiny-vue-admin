<template>
    <ErrorPage
        error-code="404"
        title="页面未找到"
        message="抱歉，您访问的页面不存在或已被移除。请检查URL是否正确，或返回首页。"
        icon="pi pi-exclamation-circle"
        type="error"
    />
</template>

<script lang="ts" setup>
import ErrorPage from './error-page.vue';
</script>
