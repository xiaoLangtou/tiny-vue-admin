<!--
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-23 14:19:29
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-02-23 14:25:46
 * @FilePath: src/components/transition/fade-down.vue
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 -->
<template>
    <transition name="fade-slide-top-bottom" appear>
        <slot />
    </transition>
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
