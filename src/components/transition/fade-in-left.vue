<!--
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-28 10:01:46
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-02-28 10:04:53
 * @FilePath: src/components/transition/fade-in-left.vue
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 -->
<template>
    <transition enter-active-class="animate__animated animate__fadeInLeft">
        <slot />
    </transition>
</template>

<script setup lang="ts">
import 'animate.css';
</script>

<style>
:root {
    --animate-duration: 0.5s;
}
</style>
