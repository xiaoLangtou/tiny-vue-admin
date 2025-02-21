<template>
    <div class="login-container flex items-center justify-center">
        <div class="login-card w-full flex overflow-hidden">
            <div class="login-left flex items-center justify-center overflow-hidden relative">
                <img src="@/assets/images/login-bg.svg" alt="Welcome Illustration" class="illustration" />
            </div>

            <div class="login-right flex flex-col justify-center">
                <div class="content-wrapper">
                    <div class="login-header">
                        <h1>欢迎回来</h1>
                        <p class="subtitle">请使用您的账号密码登录系统</p>
                    </div>
                    <tiny-form ref="ruleFormRef" :model="createData" label-position="top">
                        <tiny-form-item label="用户名" prop="username">
                            <tiny-input v-model="createData.username"></tiny-input>
                        </tiny-form-item>
                        <tiny-form-item label="密码" prop="password">
                            <tiny-input v-model="createData.password" type="password" show-password></tiny-input>
                        </tiny-form-item>
                        <div class="flex w-full items-center justify-between mb-4">
                            <div class="flex align-items-center">
                                <tiny-checkbox v-model="checked" name="tiny-checkbox">记住我</tiny-checkbox>
                            </div>
                            <a href="#" class="font-medium text no-underline hover:underline">忘记密码？</a>
                        </div>
                        <tiny-button type="primary" style="width:100%">登录</tiny-button>
                    </tiny-form>
                </div>
            </div>
        </div>
        <Toast position="top-center" />
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'

const ruleFormRef = ref()


const createData = reactive({
    username: '',
    password: '',
    password2: ''
})
</script>

<style lang="scss" scoped>
@use './login.scss';
</style>
