<template>
    <div class="setting-drawer-box">
        <custom-drawer
            v-model:open="drawerVisible"
            title="应用配置"
            confirm-button-text="复制配置"
            :confirm-loading="confirmLoading"
            @cancel="handleCancel"
            @confirm="handleConfirm"
        >
            <!-- 配置说明 -->
            <a-alert
                message="配置拷贝"
                description="应用配置可实时预览效果，但只是临时生效，要想真正应用于项目，可以点击下方的「复制配置」按钮，并将配置粘贴到 src/global/settings.ts 文件中。"
                type="info"
                show-icon
                class="mb-4"
            />

            <!-- 主题设置 -->
            <section class="theme-section">
                <a-divider>颜色主题风格</a-divider>
                <div class="theme-controls flex flex-col gap-4">
                    <!-- 明暗主题切换 -->
                    <div class="theme-mode flex justify-center">
                        <a-radio-group
                            v-model:value="appStore.layoutSetting.theme"
                            button-style="solid"
                            @change="toggleDarkMode"
                        >
                            <a-radio-button value="light">
                                <div class="flex items-center gap-2">
                                    <Sun class="h-4 w-4" />
                                    明亮
                                </div>
                            </a-radio-button>
                            <a-radio-button value="dark">
                                <div class="flex items-center gap-2">
                                    <Moon class="h-4 w-4" />
                                    暗黑
                                </div>
                            </a-radio-button>
                        </a-radio-group>
                    </div>

                    <!-- 主题色选择 -->
                    <div class="theme-colors flex justify-center flex-wrap gap-4 p-4 rounded-lg">
                        <div
                            v-for="color in colorsItems"
                            :key="color"
                            class="color-item"
                            :class="{
                                'color-item-active': appStore.themeConfig.token?.colorPrimary === color,
                            }"
                            @click="toggleColorPrimary(color)"
                        >
                            <div class="color-preview" :style="{ backgroundColor: color }"></div>
                        </div>
                    </div>

                    <!-- 圆角设置 -->
                    <div class="radius-setting flex items-center justify-between">
                        <span>圆角系数</span>
                        <a-radio-group
                            v-model:value="appStore.layoutSetting.borderRadius"
                            button-style="solid"
                            @change="toggleRadius(appStore.layoutSetting.borderRadius)"
                        >
                            <a-radio-button v-for="radius in [0, 3, 6, 9, 12, 16]" :key="radius" :value="radius">
                                {{ radius }}
                            </a-radio-button>
                        </a-radio-group>
                    </div>
                </div>
            </section>

            <!-- 布局模式设置 -->
            <section class="layout-section">
                <a-divider>导航栏模式</a-divider>
                <div class="layout-grid grid grid-cols-3 gap-6 p-2">
                    <div
                        v-for="(item, index) in layoutModes"
                        :key="index"
                        class="layout-option"
                        :class="{
                            'layout-option-active': appStore.layoutSetting.layout === item.value,
                        }"
                        @click="toggleLayoutMode(item.value)"
                    >
                        <div class="layout-preview">
                            <div class="preview-content">
                                <div v-if="item.value !== 'side'" class="preview-header"></div>
                                <div class="preview-body">
                                    <div v-if="item.value !== 'top'" :class="['preview-sidebar', item.leftClass]"></div>
                                    <div :class="['preview-main', item.rightClass]"></div>
                                </div>
                            </div>
                        </div>
                        <div class="layout-label">{{ item.label }}</div>
                    </div>
                </div>
            </section>
        </custom-drawer>
    </div>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store/module';
import { Moon, Sun } from 'lucide-vue-next';

defineOptions({
    name: 'SettingDrawer',
});

const appStore = useAppStore();
const colorPrimary = computed(() => appStore.themeConfig.token?.colorPrimary);

const colorsItems = ref([
    '#121314',
    '#6366f1',
    '#10b981',
    '#22c55e',
    '#3b82f6',
    '#f5222d',
    '#f97316',
    '#f59e0b',
    '#14b8a6',
    '#F43F5E',
]);

const layoutModes = ref([
    {
        label: '侧边栏模式',
        value: 'side',
        leftClass: 'w-1/4',
        rightClass: 'flex-1',
    },
    {
        label: '顶部模式',
        value: 'top',
        leftClass: 'hidden',
        rightClass: 'w-full',
    },
    {
        label: '混合模式',
        value: 'mix',
        leftClass: 'w-4',
        rightClass: 'flex-1',
    },
]);

const toggleLayoutMode = (mode: string) => {
    // 保存当前抽屉状态
    const currentDrawerState = drawerVisible.value;
    appStore.toggleLayout(mode);
    // 确保抽屉状态保持不变
    drawerVisible.value = currentDrawerState;
};

const drawerVisible = ref(false);

const confirmLoading = ref(false);

const open = () => {
    drawerVisible.value = true;
};

const handleCancel = () => {
    drawerVisible.value = false;
};

const toggleColorPrimary = (color: string) => {
    appStore.toggleColorPrimary(color);
};

const toggleRadius = (radius: number) => {
    appStore.toggleBorderRadius(radius);
};
const toggleDarkMode = () => {
    appStore.toggleTheme(appStore.layoutSetting.theme);
};
const handleConfirm = () => {
    confirmLoading.value = true;
    setTimeout(() => {
        confirmLoading.value = false;
        drawerVisible.value = false;
    }, 2000);
};

defineExpose({
    open,
});
</script>

<style lang="scss" scoped>
.setting-drawer-box {
    --color-item-active: v-bind(colorPrimary);

    .theme-colors {
        @apply bg-gray-50 dark:bg-gray-800;
    }

    .color-item {
        @apply w-12 h-12 rounded-full cursor-pointer relative transition-transform duration-300;
        @apply flex items-center justify-center p-1;
        @apply shadow-sm hover:shadow-md hover:scale-110 hover:z-10;
        @apply border-2 border-gray-200 dark:border-gray-600;

        &-active {
            @apply border-[var(--color-item-active)] scale-110;
        }

        .color-preview {
            @apply w-full h-full rounded-full;
        }
    }

    .layout-option {
        @apply cursor-pointer p-2 rounded-lg border transition-all duration-300;
        @apply border-dashed border-gray-300 dark:border-gray-600;
        @apply hover:border-[var(--color-item-active)];

        &-active {
            @apply border-[var(--color-item-active)];
        }

        .layout-preview {
            @apply relative w-full aspect-[16/9] rounded overflow-hidden;
            @apply bg-gray-50 dark:bg-gray-800;

            .preview-content {
                @apply w-full h-full flex flex-col;

                .preview-header {
                    @apply h-3 w-full bg-[var(--color-item-active)];
                    @apply border-b border-gray-200 dark:border-gray-600;
                }

                .preview-body {
                    @apply flex-1 flex;

                    .preview-sidebar {
                        @apply bg-[var(--color-item-active)];
                        @apply border-r border-gray-200 dark:border-gray-600;
                    }

                    .preview-main {
                        @apply bg-gray-100 dark:bg-gray-900;
                    }
                }
            }
        }

        .layout-label {
            @apply mt-2 text-center text-xs;
        }
    }
}

@keyframes shake {
    0%,
    100% {
        transform: translateX(0) scale(1.1);
    }
    25% {
        transform: translateX(-3px) scale(1.1);
    }
    75% {
        transform: translateX(3px) scale(1.1);
    }
}

.hover\:animate-shake:hover {
    animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}
</style>
