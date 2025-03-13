<template>
    <div v-if="visible" class="loading-container">
        <div class="loading-content">
            <div class="loading-spinner">
                <div class="loading-logo">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" class="loading-icon">
                        <path
                            d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 36c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16z"
                        />
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
defineProps({
    visible: {
        type: Boolean,
        default: true,
    },
});

defineOptions({
    name: 'LoadingSpinner',
});
</script>

<style lang="scss" scoped>
.loading-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
}

.loading-content {
    text-align: center;
}

.loading-spinner {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.loading-logo {
    margin-bottom: 16px;
}

.loading-icon {
    width: 48px;
    height: 48px;
    animation: spin 1s linear infinite;
}

.loading-progress {
    width: 200px;
    height: 4px;
    background-color: #f0f0f0;
    border-radius: 2px;
    overflow: hidden;
    margin-bottom: 8px;
}

.loading-bar {
    width: 40%;
    height: 100%;
    background-color: #1890ff;
    border-radius: 2px;
    animation: progress 1.5s ease-in-out infinite;
}

.loading-text {
    color: #666;
    font-size: 14px;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
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
