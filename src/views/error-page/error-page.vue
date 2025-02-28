<template>
    <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
        <div class="max-w-lg w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg">
            <div class="text-center space-y-6">
                <!-- 错误图标 -->
                <div class="mx-auto h-50 w-50 flex items-center justify-center rounded-full">
                    <img :src="iconBgColor" class="h-50 w-50" :class="iconTextColor" :alt="errorCode" />
                </div>

                <!-- 错误代码 -->
                <h1
                    class="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                >
                    {{ errorCode }}
                </h1>

                <!-- 错误标题 -->
                <h2 class="text-2xl font-semibold text-gray-900">
                    {{ title }}
                </h2>

                <!-- 错误信息 -->
                <p class="text-gray-500 text-lg">
                    {{ message }}
                </p>

                <!-- 操作按钮 -->
                <div class="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <TinyButton type="primary" @click="goHome">返回首页</TinyButton>
                    <TinyButton @click="contactSupport">联系支持 </TinyButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue';
import { useRouter } from 'vue-router';
import NotFound from '@/assets/images/404.svg';
import Forbidden from '@/assets/images/403.svg';
import ServiceUnavailable from '@/assets/images/503.svg';

const props = defineProps({
    errorCode: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        default: 'error',
    },
});

const router = useRouter();

// 根据错误类型计算图标背景颜色
const iconBgColor = computed(() => {
    const colors: Record<string, string> = {
        error: NotFound,
        forbidden: Forbidden,
        unavailable: ServiceUnavailable,
    };
    return colors[props.type] || colors.error;
});

// 根据错误类型计算图标颜色
const iconTextColor = computed(() => {
    const colors: Record<string, string> = {
        error: 'text-red-600',
        forbidden: 'text-yellow-600',
        unavailable: 'text-blue-600',
    };
    return colors[props.type] || colors.error;
});

const goHome = () => {
    router.push('/');
};

const contactSupport = () => {
    // 实现联系支持的逻辑
    console.log('Contact support');
};
</script>
