<template>
    <div class="layout">
        <tiny-container :aside-width="asideWidth" :pattern="pattern">
            <template #header>
                <tiny-layout class="w-full h-full px-3 box-border">
                    <LayoutHeader />
                </tiny-layout>
            </template>
            <template #aside>
                <tiny-layout class="w-full h-full">
                    <layout-aside></layout-aside>
                </tiny-layout>
            </template>
            <tiny-layout class="layout-content">
                <layout-page />
            </tiny-layout>
            <template #footer>
                <tiny-layout>
                    <div class="layout-footer">
                        <Footer />
                    </div>
                </tiny-layout>
            </template>
        </tiny-container>
    </div>
</template>

<script lang="ts" setup>
// 初始化默认主题
import { LayoutAside, LayoutPage, LayoutHeader } from './components';
import { useMenuStore } from '@/store/module';

const menuStore = useMenuStore();

const asideWidth = computed(() => (menuStore.isCollapsed ? 80 : 220));

const pattern = ref('fashion');
</script>

<style scoped lang="scss">
.layout {
    width: 100%;
    height: 100%;
}

.menu-wrapper {
    width: inherit;
    height: 92vh;
    margin-top: v-bind(top);
    overflow-x: hidden;
    overflow-y: auto;
}

.global-setting {
    position: fixed;
    top: 280px;
    right: 0;
    z-index: 99;
    width: 30px;
    height: 30px;
}

.layout :deep(.tiny-container .tiny-container__aside) {
    z-index: 100;
    background: #fff;
    border-left: 1px solid #ccc;
}

.layout :deep(.tiny-container .tiny-container__main) {
    color: #ccc;
    background-color: #f5f6f7;
}

.layout :deep(.layout-content) {
    height: 100%;
    padding: 0 10px;
    overflow: hidden;
}

.layout :deep(.tiny-container .tiny-container__footer) {
    display: flex;
    justify-content: center;
    padding-top: 15px;
    background-color: #f5f6f7;
}

// 组件无法固定非message的modal类型距离顶部距离
:deep(.tiny-modal__box) {
    top: 8px !important;
}

:deep(.tiny-tabs--top) {
    padding: 0 16px;
}

.theme-box {
    position: fixed;
    top: 88%;
    right: 30px;
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    background-color: #fff;
    border-radius: 100%;
    cursor: pointer;

    img {
        display: block;
        width: inherit;
        height: inherit;
    }
}
</style>
