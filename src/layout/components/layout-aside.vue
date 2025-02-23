<!--
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-22 16:54:28
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-02-23 13:14:31
 * @FilePath: src/layout/components/layout-aside.vue
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 -->
<template>
    <div class="layout-aside bg-slate-0 relative">
        <div class="aside-top">
            <div class="aside-logo flex items-center justify-center gap-2">
                <img src="@/assets/images/logo.svg" alt="" />
                <span class="aside-title"> XLT Admin </span>
            </div>
            <div class="aside-menu">
                <Suspense>
                    <Menu></Menu>
                </Suspense>
            </div>
        </div>
        <div class="aside-setting absolute bottom-0 h-14 w-full border-t border-t-stone-100">
            <div class="setting-box">
                <tiny-switch show-text>
                    <template #open>
                        <span><component :is="IconHeartempty()"></component>Light</span>
                    </template>
                    <template #close>
                        <span><component :is="IconHeartempty()"></component>Dark</span>
                    </template>
                </tiny-switch>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { IconHeartempty } from '@opentiny/vue-icon';

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
    box-shadow: 4px 0 6px rgba(0, 0, 0, 0.1);

    .aside-logo {
        width: 100%;
        box-sizing: border-box;
        padding: 10px 15px;

        img {
            width: 50px;
            height: 50px;
        }
    }
}
</style>
