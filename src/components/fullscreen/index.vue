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
                :icon="h(Shrink({ size: 18 }, {} as any))"
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

defineProps({
    isFullscreen: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
});

defineOptions({
    name: 'FullscreenWrapper',
});

const emit = defineEmits(['exitFullscreen']);

const exitFullscreen = () => {
    emit('exitFullscreen');
};
</script>

<style lang="scss" scoped>
.fullscreen-container {
    position: relative;
    width: 100%;
    height: 100%;
}

.exit-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 1000;
}
</style>
