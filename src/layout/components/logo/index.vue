<!--
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-03-04 10:08:00
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-03-04 15:43:41
 * @FilePath: src/layout/components/logo/index.vue
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 -->
<template>
    <div class="aside-logo flex items-center justify-center gap-2">
        <img src="../../../assets/images/logo.svg" alt="" />
        <h2 v-if="appStore.layoutSetting.layout === 'mix'|| !menuStore.isCollapsed " class="aside-title">
            {{ globalSetting.title }}
        </h2>
    </div>
</template>

<script setup lang="ts">
import globalSetting from '@/global/setting';

import { useMenuStore, useAppStore } from '@/store/module';

const menuStore = useMenuStore();
const appStore = useAppStore();

defineOptions({
    name: 'Logo',
});
</script>

<style scoped lang="scss">
.aside-logo {
    width: 100%;
    box-sizing: border-box;
    padding: 10px 15px;

    img {
        width: 50px;
        height: 50px;
    }
}
</style>
