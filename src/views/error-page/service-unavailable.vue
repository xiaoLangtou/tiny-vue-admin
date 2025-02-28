<template>
    <ErrorPage
        errorCode="503"
        title="服务暂时不可用"
        message="抱歉，服务器当前无法处理您的请求。我们的技术团队正在努力修复，请稍后再试。"
        icon="pi pi-server"
        type="unavailable"
    />
</template>

<script lang="ts" setup>
import ErrorPage from './error-page.vue';
</script>
