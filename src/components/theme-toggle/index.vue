<script setup lang="ts">
import { Moon, Sun } from 'lucide-vue-next';
import { useAppStore } from '@/store';
import { ThemeType } from '@/store/module/app/types';
import { isDark } from '@/store/module/app';

const appStore = useAppStore();
const { theme } = storeToRefs(appStore);
const colorPrimary = computed(() => appStore.themeConfig.token?.colorPrimary);

console.log('theme', colorPrimary.value);
/**
 * 切换主题并应用动画过渡效果。
 *
 * - 该方法支持 `ViewTransition API`，在支持的浏览器上实现圆形扩散或收缩动画。
 * - 若浏览器不支持 `startViewTransition`，则直接切换主题。
 * - 过渡动画基于鼠标点击位置，若无点击事件则默认居中展开或收缩。
 *
 * @param event - 可选的鼠标事件，决定动画的起点位置。
 * @param _theme - 目标主题，可选值为 `'light'` 或 `'dark'`。
 */
const toggleTheme = (event?: MouseEvent, _theme: ThemeType) => {
    if (_theme === theme.value) return;
    if (!document.startViewTransition) {
        appStore.toggleTheme(_theme);
        return;
    }

    const x = event?.clientX ?? innerWidth / 2;
    const y = event?.clientY ?? innerHeight / 2;
    const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const isEnteringDarkMode = _theme === 'dark';

    const transition = document.startViewTransition(() => {
        appStore.toggleTheme(_theme);
        document.documentElement.classList.toggle('dark', isDark.value);
    });

    /**
     * 监听 `transition.ready` 事件，确保页面渲染完成后执行动画过渡。
     *
     * - `clipPath` 定义了动画的裁剪路径：
     *   - 进入深色模式 (`isEnteringDarkMode`) 时，动画从 `0px` 扩展至 `endRadius`（扩散）。
     *   - 进入浅色模式时，动画从 `endRadius` 收缩至 `0px`（收缩）。
     * - 通过 `animate` 方法在 `document.documentElement` 上应用动画：
     *   - `pseudoElement` 指定过渡目标为 `::view-transition-new(root)` 或 `::view-transition-old(root)`。
     *   - `duration` 设定动画时长，`easing` 设置缓动函数。
     */
    transition.ready.then(() => {
        const clipPath = isEnteringDarkMode
            ? [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`] // 扩散
            : [`circle(${endRadius}px at ${x}px ${y}px)`, `circle(0px at ${x}px ${y}px)`]; // 收缩

        document.documentElement.animate(
            {
                clipPath,
            },
            {
                duration: 500,
                easing: 'ease-in-out',
                pseudoElement: isEnteringDarkMode ? '::view-transition-new(root)' : '::view-transition-old(root)',
            },
        );
    });
};

defineOptions({
    name: 'ThemeToggle',
});
</script>

<template>
    <div class="inline-flex p-1 rounded-full bg-gray-50 dark:bg-gray-800">
        <button
            v-for="option in ['light', 'dark']"
            :key="option"
            :class="[
                'toggle-button',
                theme === option
                    ? `active` // 当前选中状态
                    : 'not-active', // 未选中状态
            ]"
            @click="toggleTheme($event, option as unknown as ThemeType)"
        >
            <Sun v-if="option === 'light'" class="h-4 w-4" />
            <Moon v-if="option === 'dark'" class="h-4 w-4" />
        </button>
    </div>
</template>

<style lang="scss" scoped>
.transition-all {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
}

.toggle-button {
    --toggle-btn-primary: v-bind(colorPrimary);
    @apply pl-2 pr-2 py-1 rounded-full inline-flex items-center
        justify-center transition-all duration-300;
}

.active {
    @apply bg-[var(--toggle-btn-primary)] text-white shadow-md dark:bg-[var(--toggle-btn-primary)] dark:text-white;
}

.not-active {
    @apply text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600;
}
</style>
