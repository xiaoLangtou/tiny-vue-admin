<!--
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-22 16:54:28
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-02-25 17:42:33
 * @FilePath: src/layout/components/layout-aside.vue
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 -->
<template>
    <div class="layout-aside bg-slate-0 relative">
        <div class="aside-top">
            <div class="aside-logo flex items-center justify-center gap-2">
                <img src="@/assets/images/logo.svg" alt="" />
                <span v-if="!menuStore.isCollapsed" class="aside-title"> XLT Admin </span>
            </div>
            <div class="aside-menu">
                <Suspense>
                    <Menu :is-collapsed="menuStore.isCollapsed"></Menu>
                </Suspense>
            </div>
        </div>
        <div class="aside-setting absolute bottom-0 h-16 w-full border-t border-t-stone-100">
            <div class="setting-box h-full flex items-center justify-center gap-3">
                <theme-toggle></theme-toggle>
                <span class="w-6 h-6 bg-gray-100 flex items-center justify-center rounded-full cursor-pointer">
                    <CircleHelp :size="18" :stroke-width="2.25" absoluteStrokeWidth />
                </span>
                <span class="w-6 h-6 bg-gray-100 flex items-center justify-center rounded-full cursor-pointer">
                    <ArrowLeft :size="18" :stroke-width="2.25" absoluteStrokeWidth />
                </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { CircleHelp, ArrowLeft } from 'lucide-vue-next';
import { useMenuStore } from '@/store/module';

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
    border-right: 1px solid #f0f0f0;

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
        height: calc(100vh - 50px - 64px);
        overflow: hidden auto;
    }

    .setting-box {
        display: flex;
        background-color: #ffffff;
        padding: 0 8px;
        box-sizing: border-box;
    }
}
</style>
