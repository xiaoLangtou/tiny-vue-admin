<!--
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-03-03 17:06:41
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-03-12 16:46:30
 * @FilePath: src/layout/components/header-right-bar/index.vue
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 -->
<template>
    <div class="header-right-bar">
        <fade-down>
            <div class="header-right-bar-item">
                <!-- 搜索 -->
                <!-- <xlt-search-bar /> -->
                <!-- 全屏 -->
                <div ref="fullscreenRef" class="fullscreen-wrapper">
                    <a-tooltip :title="isFullscreen ? '退出全屏' : '全屏'">
                        <a-button
                            type="text"
                            class="flex justify-center items-center"
                            :icon="h(isFullscreen ? Shrink({ size: 18 }, {} as any) : Expand({ size: 18 }, {} as any))"
                            @click="toggle"
                        />
                    </a-tooltip>
                </div>
                <!-- 主题切换 -->

                <theme-toggle />

                <!-- 导航栏设置 -->
                <a-button type="text" class="setting-button" @click="open">
                    <template #icon>
                        <Settings :size="18"></Settings>
                    </template>
                </a-button>
                <!-- 头像信息-->
                <a-dropdown>
                    <a-avatar class="cursor-pointer" :size="32">U</a-avatar>
                    <template #overlay>
                        <a-menu>
                            <a-menu-item key="profile">
                                <template #icon>
                                    <User class="w-4 h-4" />
                                </template>
                                个人信息
                            </a-menu-item>
                            <a-menu-item key="settings">
                                <template #icon>
                                    <Settings class="w-4 h-4" />
                                </template>
                                设置
                            </a-menu-item>
                            <a-menu-divider />
                            <a-menu-item key="logout">
                                <template #icon>
                                    <LogOut class="w-4 h-4" />
                                </template>
                                退出登录
                            </a-menu-item>
                        </a-menu>
                    </template>
                </a-dropdown>
            </div>
        </fade-down>
    </div>
</template>

<script setup lang="ts">
import { ThemeToggle } from '@/components';
import { Expand, LogOut, Settings, Shrink, User } from 'lucide-vue-next';
import { useAppStore } from '@/store/module';
import FadeDown from '@/components/transition/fade-down.vue';
import { h } from 'vue';

const emit = defineEmits(['setting']);
const el = ref<HTMLElement | null>(null);
const appStore = useAppStore();
const colorPrimary = computed(() => appStore.themeConfig.token?.colorPrimary);
const { isFullscreen, toggle } = useFullscreen(el);

defineOptions({
    name: 'HeaderRightBar',
});

const open = () => {
    emit('setting');
};
</script>

<style scoped lang="scss">
.header-right-bar {
    --color-item-active: v-bind(colorPrimary);
    @apply h-full flex items-center;

    &-item {
        @apply flex items-center gap-2;
    }

    .setting-button {
        @apply flex items-center justify-center;

        &:before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            border: 1px solid var(--color-item-active);
            transition: all 0.5s;
            animation: clippath 3s infinite linear;
            border-radius: 4px;
            opacity: 1;
        }

        &::after {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            border: 1px solid var(--color-item-active);
            transition: all 0.5s;
            animation: clippath 3s infinite -1.5s linear;
            border-radius: 4px;
            opacity: 1;
        }
    }
}

@keyframes clippath {
    0%,
    100% {
        clip-path: inset(0 0 90% 0);
    }

    25% {
        clip-path: inset(0 90% 0 0);
    }
    50% {
        clip-path: inset(90% 0 0 0);
    }
    75% {
        clip-path: inset(0 0 0 90%);
    }
}
</style>
