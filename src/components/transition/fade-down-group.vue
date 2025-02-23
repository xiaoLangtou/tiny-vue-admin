<!--
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-23 14:20:23
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-02-23 14:25:46
 * @FilePath: src/components/transition/fade-down-group.vue
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 -->
<script lang="ts" setup>
import { findIdx } from '@/utils';

let count = 0;
const onBeforeEnter = (el: HTMLElement) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(-20px)';
    el.style.transition = 'all 300ms ease-in-out';
    count += 1;
};

const onEnter = (el: HTMLElement, done: () => void) => {
    const delay = Math.min(findIdx(el) * 150, 500);
    setTimeout(() => {
        el.style.transform = 'translateY(0px)';
        el.style.opacity = '1';
        el.addEventListener('transitionend', done);
    }, delay);
};
</script>

<template>
    <transition-group name="fade-slide-top-bottom" appear @before-appear="onBeforeEnter" @appear="onEnter">
        <slot />
    </transition-group>
</template>

<style lang="scss">
.fade-slide-top-bottom-enter-active {
    transition: all 300ms ease-out;
}

.fade-slide-top-bottom-leave-active {
    transition: all 300ms ease-out;
}

.fade-slide-top-bottom-enter-from {
    transform: translateY(-20px);
    opacity: 0;
}

.fade-slide-top-bottom-leave-to {
    transform: translateY(20px);
    opacity: 0;
}
</style>
