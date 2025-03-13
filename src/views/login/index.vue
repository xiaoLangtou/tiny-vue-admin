<template>
    <div class="login-container flex items-center justify-center min-h-screen bg-gray-50 dark:bg-bg-dark p-4">
        <div
            class="login-card w-full max-w-5xl bg-white dark:bg-bg-darkContainer rounded-2xl shadow-lg flex overflow-hidden"
        >
            <div
                class="login-left hidden md:flex md:w-1/2 items-center justify-center overflow-hidden relative bg-gradient-to-br from-primary/10 to-primary/30 dark:from-primary-dark/10 dark:to-primary-dark/30"
            >
                <img
                    src="@/assets/images/login-bg.svg"
                    alt="Welcome Illustration"
                    class="illustration w-4/5 h-auto animate-float"
                />
            </div>

            <div class="login-right w-full md:w-1/2 p-8 md:p-12">
                <div class="max-w-md mx-auto">
                    <div class="login-header mb-8">
                        <h1 class="text-3xl font-bold mb-3 text-gray-900 dark:text-white">欢迎登录</h1>
                        <p class="text-gray-600 dark:text-gray-400">请使用您的账号密码登录系统</p>
                    </div>

                    <a-form ref="loginFormRef" :model="account" :rules="loginRule" layout="vertical" class="space-y-6">
                        <a-form-item label="用户名" name="username">
                            <a-input
                                v-model:value="account.username"
                                placeholder="请输入用户名"
                                size="large"
                                class="rounded-lg"
                            >
                                <template #prefix>
                                    <UserOutlined class="text-gray-400" />
                                </template>
                            </a-input>
                        </a-form-item>

                        <a-form-item label="密码" name="password">
                            <a-input-password
                                v-model:value="account.password"
                                placeholder="请输入密码"
                                size="large"
                                class="rounded-lg"
                            >
                                <template #prefix>
                                    <LockOutlined class="text-gray-400" />
                                </template>
                            </a-input-password>
                        </a-form-item>

                        <div class="flex items-center justify-between mb-6">
                            <a-checkbox v-model:checked="checked" class="text-gray-600 dark:text-gray-400">
                                记住我
                            </a-checkbox>
                            <a
                                href="#"
                                class="text-primary hover:text-primary-hover dark:text-primary-dark dark:hover:text-primary-darkHover transition-colors"
                            >
                                忘记密码？
                            </a>
                        </div>

                        <a-button
                            type="primary"
                            size="large"
                            :loading="submitLoading"
                            class="w-full h-12 rounded-lg text-base font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                            @click="handleLogin"
                        >
                            {{ submitLoading ? '加载中...' : '登录' }}
                        </a-button>
                    </a-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { IAccount } from '@/service/interface/login';
import { useLoginStore } from '@/store/module';
import { LockOutlined, UserOutlined } from '@ant-design/icons-vue';
import type { Rule } from 'ant-design-vue/es/form';
import { reactive, ref } from 'vue';

const loginStore = useLoginStore();
const loginFormRef = ref();
const submitLoading = ref(false);
const checked = ref(false);
const account = reactive<IAccount>({
    username: '',
    password: '',
});

const loginRule = reactive<Record<string, Rule[]>>({
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
});

const handleLogin = async () => {
    try {
        await loginFormRef.value?.validate();
        submitLoading.value = true;
        await loginStore.loginAction(account);
    } catch (error) {
        console.error('Login error:', error);
    } finally {
        submitLoading.value = false;
    }
};
</script>

<style lang="scss" scoped>
.login-container {
    min-height: 100vh;
    background-size: cover;
    background-position: center;
}

.login-card {
    transition: all 0.3s ease;
}

.illustration {
    animation: float 6s ease-in-out infinite;
}

@keyframes float {
    0% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-10px);
    }
    100% {
        transform: translateY(0px);
    }
}

@media (max-width: 768px) {
    .login-card {
        margin: 1rem;
    }
}
</style>
