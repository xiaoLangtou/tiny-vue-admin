<template>
    <div class="login-container flex items-center justify-center">
        <div class="login-card w-full flex overflow-hidden dark:bg-bg-darkContainer">
            <div class="login-left flex items-center justify-center overflow-hidden relative">
                <img src="@/assets/images/login-bg.svg" alt="Welcome Illustration" class="illustration" />
            </div>

            <div class="login-right flex flex-col justify-center">
                <div class="content-wrapper">
                    <div class="login-header">
                        <h1>欢迎回来</h1>
                        <p class="subtitle">请使用您的账号密码登录系统</p>
                    </div>
                    <a-form ref="loginFormRef" :model="account" :rules="loginRule" layout="vertical">
                        <a-form-item label="用户名" name="username">
                            <a-input v-model:value="account.username" />
                        </a-form-item>

                        <a-form-item label="密码" name="password">
                            <a-input-password v-model:value="account.password" />
                        </a-form-item>

                        <div class="flex w-full items-center justify-between mb-4">
                            <div class="flex align-items-center">
                                <a-checkbox v-model:checked="checked">记住我</a-checkbox>
                            </div>
                            <a href="#" class="font-medium text-primary dark:text-primary-text no-underline hover:underline hover:text-primary-hover dark:hover:text-primary-textHover">忘记密码？</a>
                        </div>

                        <a-form-item>
                            <a-button type="primary" :loading="submitLoading" class="w-full dark:bg-primary dark:text-white dark:border-primary dark:hover:bg-primary-hover" @click="handleLogin">
                                {{ submitLoading ? '登陆中' : '登录' }}
                            </a-button>
                        </a-form-item>
                    </a-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { useLoginStore } from '@/store';
import { IAccount } from '@/service/interface/login';
import type { Rule } from 'ant-design-vue/es/form';

const loginStore = useLoginStore();
const loginFormRef = ref();
const submitLoading = ref(false);
const checked = ref(false);
const account = reactive<IAccount>({
    username: '',
    password: '',
});

const loginRule = reactive<Record<string, Rule[]>>({
    username: [{ required: true, message: '请填写用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请填写密码', trigger: 'blur' }],
});

const handleLogin = () => {
    loginFormRef.value
        ?.validate()
        .then(() => {
            console.log('account', account);
            loginStore.loginAction(account);
        })
        .catch(() => {});
};
</script>

<style lang="scss" scoped>
@use './login.scss';
</style>
