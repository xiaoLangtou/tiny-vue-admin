<template>
    <ErrorPage
        errorCode="403"
        title="访问被拒绝"
        message="抱歉，您没有权限访问此页面。如果您认为这是一个错误，请联系系统管理员。"
        icon="pi pi-lock"
        type="forbidden"
    />
</template>

<script setup>
import ErrorPage from './error-page.vue';
</script>
