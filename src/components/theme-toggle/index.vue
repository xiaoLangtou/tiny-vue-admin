<script setup lang="ts">
import { Sun, Moon } from 'lucide-vue-next';

const theme = ref('light');

// 初始化主题
// onMounted(() => {
//     // 从 localStorage 获取保存的主题
//     const savedTheme = localStorage.getItem('theme');
//     if (savedTheme) {
//         theme.value = savedTheme;
//         applyTheme(savedTheme);
//     } else {
//         // 如果没有保存的主题，检查系统主题
//         const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
//         theme.value = prefersDark ? 'dark' : 'light';
//         applyTheme(theme.value);
//     }
// });

// 监听主题变化
watch(theme, (newTheme) => {
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
});

// 应用主题
const applyTheme = (newTheme: string) => {
    if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
};

// 切换选项
const toggleTheme = (value: string) => {
    theme.value = value;
};
</script>

<template>
    <div class="inline-flex bg-gray-100 p-1 rounded-full ">
        <button
            v-for="option in ['light', 'dark']"
            :key="option"
            :class="[
                'px-1.5 py-1 rounded-full text-sm font-medium inline-flex items-center gap-1 transition-all duration-300',
                theme === option ? 'bg-white  text-primary shadow-sm' : 'hover:text-primary/80',
            ]"
            @click="toggleTheme(option)"
        >
            <Sun  v-if="option === 'light'" class="h-4 w-4" />
            <Moon v-if="option === 'dark'" class="h-4 w-4" />
            {{ option.charAt(0).toUpperCase() + option.slice(1) }}
        </button>
    </div>
</template>

<style scoped>
.transition-all {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
}

/* 暗色模式样式 */
:root.dark {
    color-scheme: dark;
}

/* 主要颜色变量 */
:root {
    --primary: #0284c7;
}

.text-primary {
    color: var(--primary);
}

.shadow-sm {
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}
</style>
