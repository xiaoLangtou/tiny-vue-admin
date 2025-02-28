<template>
    <div v-if="visible" class="loading-container">
        <div class="loading-content">
            <div class="loading-spinner">
                <div class="loading-logo">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" class="loading-icon">
                        <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 36c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16z" />
                    </svg>
                </div>
                <div class="loading-progress">
                    <div class="loading-bar"></div>
                </div>
                <div class="loading-text">加载中...</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    visible: {
        type: Boolean,
        default: true
    }
});

defineOptions({
    name: 'Loading'
});
</script>

<style lang="scss" scoped>
.loading-container {
    @apply fixed top-0 left-0 w-full h-full bg-white z-50 flex justify-center items-center;

    /* 暗黑模式 */
    @apply dark:bg-gray-900 dark:text-white;
}

.loading-content {
    @apply text-center;
}

.loading-spinner {
    @apply flex flex-col items-center gap-4;
}

.loading-logo {
    @apply w-16 h-16 animate-spin;

    .loading-icon {
        @apply w-full h-full fill-indigo-600; /* 默认主色 */
        /* 暗黑模式下的颜色 */
        @apply dark:fill-indigo-400;
    }
}

.loading-progress {
    @apply w-48 h-1 bg-indigo-200 rounded-full overflow-hidden;
}

.loading-bar {
    @apply w-2/5 h-full bg-indigo-600 rounded-full animate-[progress_1.5s_ease-in-out_infinite];
    /* 暗黑模式下的进度条颜色 */
    @apply dark:bg-indigo-400;
}

.loading-text {
    @apply text-black text-sm;
    /* 暗黑模式下的文本颜色 */
    @apply dark:text-white;
}

@keyframes progress {
    0% {
        transform: translateX(-100%);
    }
    100% {
        transform: translateX(350%);
    }
}
</style>
