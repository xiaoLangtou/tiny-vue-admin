<!--
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-23 14:16:37
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-02-23 14:25:46
 * @FilePath: src/components/transition/fade-slide.vue
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 -->
<template>
    <transition name="left-slide-fade" appear>
        <slot />
    </transition>
</template>

<style lang="scss">
.left-slide-fade-enter-active {
    transition: all 300ms ease-out;
}

.left-slide-fade-leave-active {
    transition: all 300ms ease-out;
}

.left-slide-fade-enter-from {
    transform: translateX(-20px);
    opacity: 0;
}

.left-slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}
</style>
