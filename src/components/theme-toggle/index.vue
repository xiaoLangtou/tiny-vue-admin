<script setup lang="ts">
import { Moon, Sun } from 'lucide-vue-next';
import { useAppStore } from '@/store';
import { ThemeType } from '@/store/module/app/types';
import { isDark } from '@/store/module/app';

const appStore = useAppStore();
const { theme } = storeToRefs(appStore);

const toggleTheme = (_theme: ThemeType) => {
    appStore.toggleTheme(_theme);
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
                'pl-3 pr-4 py-1 rounded-full inline-flex items-center justify-center transition-all duration-300',
                theme === option
                    ? 'bg-primary text-white shadow-md dark:bg-primary dark:text-white' // 当前选中状态
                    : 'text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600', // 未选中状态
            ]"
            @click="toggleTheme(option as unknown as ThemeType)"
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
</style>
