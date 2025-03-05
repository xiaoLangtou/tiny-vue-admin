<!--
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-03-01 00:46:22
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-03-01 01:03:09
 * @FilePath: src/components/fullscreen/index.vue
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 -->
<template>
    <div class="fullscreen-container">
        <!-- 全屏按钮 -->
        <div v-if="isFullscreen" class="exit-btn">
            <a-button
                class="flex justify-center items-center"
                :icon="h(Shrink({size:18}, {} as any))"
                @click="exitFullscreen"
            ></a-button>
        </div>
        <!-- 默认插槽内容 -->
        <slot></slot>
    </div>
</template>

<script lang="ts" setup>
import { h } from 'vue';
import { Shrink } from 'lucide-vue-next';

const props = defineProps({
    isFullscreen: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    exitFullscreen: {
        type: Function as PropType<() => void>,
        default: () => {},
    },
});
</script>

<style lang="scss" scoped>
.fullscreen-fade-enter-active,
.fullscreen-fade-leave-active {
    transition: opacity 0.3s ease;
}

.fullscreen-fade-enter-from,
.fullscreen-fade-leave-to {
    opacity: 0;
}

.fullscreen-container {
    position: relative;
    width: 100%;
    @apply bg-bg-container dark:bg-bg-darkContainer pl-3 pr-3;
}

.exit-btn {
    @apply w-full flex justify-end p-4;
}
</style>
