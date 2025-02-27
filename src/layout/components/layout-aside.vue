<!--
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-22 16:54:28
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-02-27 14:03:08
 * @FilePath: src/layout/components/layout-aside.vue
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 -->
<template>
    <div class="layout-aside shadow dark:shadow-gray-700 relative">
        <div class="aside-top">
            <div class="aside-logo flex items-center justify-center gap-2">
                <img src="@/assets/images/logo.svg" alt="" />
                <span v-if="!menuStore.isCollapsed" class="aside-title"> XLT Admin </span>
            </div>
            <div class="aside-menu">
                <Menu></Menu>
            </div>
        </div>
        <TransitionFadeSlide>
            <div
                v-if="!menuStore.isCollapsed"
                class="aside-setting absolute bottom-0 h-16 w-full border-t border-t-gray-100 dark:border-t-gray-700"
            >
                <div class="setting-box h-full flex items-center justify-center gap-3">
                    <!-- 主题切换按钮 -->
                    <theme-toggle></theme-toggle>

                    <!-- 帮助图标 -->
                    <span
                        class="w-6 h-6 bg-gray-100 dark:bg-gray-700 flex items-center justify-center rounded-full cursor-pointer"
                    >
                        <CircleHelp :size="18" :stroke-width="2.25" absoluteStrokeWidth />
                    </span>

                    <!-- 返回箭头图标 -->
                    <span
                        class="w-6 h-6 bg-gray-100 dark:bg-gray-700 flex items-center justify-center rounded-full cursor-pointer"
                    >
                        <ArrowLeft :size="18" :stroke-width="2.25" absoluteStrokeWidth />
                    </span>
                </div>
            </div>
        </TransitionFadeSlide>
    </div>
</template>

<script setup lang="ts">
import { CircleHelp, ArrowLeft } from 'lucide-vue-next';
import { useMenuStore } from '@/store/module';
import { TransitionFadeSlide } from '@/components';

const menuStore = useMenuStore();

defineOptions({
    name: 'LayoutAside',
});
</script>

<style lang="scss">
.layout-aside {
    width: 100%;
    height: 100%;
    box-sizing: border-box;

    .aside-logo {
        width: 100%;
        box-sizing: border-box;
        padding: 10px 15px;

        img {
            width: 50px;
            height: 50px;
        }
    }

    .aside-menu {
        height: calc(100vh - 70px - 64px);
        overflow: hidden auto;
    }

    .setting-box {
        display: flex;
        padding: 0 8px;
        box-sizing: border-box;
    }
}
</style>
