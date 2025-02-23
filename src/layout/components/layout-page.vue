<!--
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-23 14:15:46
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-02-23 14:22:23
 * @FilePath: src/layout/components/page-layout.vue
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 -->
<template>
    <router-view v-slot="{ Component, route }">
        <transition-fade-slide mode="out-in" appear>
            <component :is="Component" :key="route.fullPath" />
        </transition-fade-slide>
    </router-view>
</template>

<script lang="ts" setup>
import transitionFadeSlide from '@/components/transition/fade-slide.vue';
</script>
