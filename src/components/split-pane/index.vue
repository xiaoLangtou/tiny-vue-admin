<template>
    <div
        ref="rootRef"
        class="ca-split-panel"
        :class="{
            'is-vertical': vertical,
            'is-resizing': resizing,
            'is-collapse': isCollapse,
            'is-responsive': isResponsive,
            'is-mobile': isMobile,
        }"
        :style="customStyle"
    >
        <div class="container" :style="sideStyle">
            <div ref="sideRef" class="ca-split-panel__side">
                <div class="ca-split-panel__content">
                    <slot name="left"></slot>
                </div>
            </div>
            <!-- 竖线和折叠按钮 -->
            <div class="divider-container">
                <div v-show="!isCollapse" class="divider"></div>
                <div
                    v-if="allowCollapse"
                    class="ca-split-panel__collapse-trigger"
                    :class="{
                        'is-collapse': isCollapse,
                        'is-mobile': isMobile,
                    }"
                    @click="toggleCollapse"
                >
                    <div class="ca-split-panel__collapse-trigger-icon">
                        <LucideChevronRight v-if="isCollapse" :size="20" />
                        <LucideChevronLeft v-else :size="20" />
                    </div>
                </div>
            </div>
        </div>

        <div class="ca-split-panel__main" :style="mainStyle">
            <div class="ca-split-panel__main-content">
                <slot name="main"></slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { LucideChevronLeft, LucideChevronRight } from 'lucide-vue-next';

/**
 * 组件属性定义
 */
const props = withDefaults(
    defineProps<{
        size?: string | number;
        minSize?: number;
        maxSize?: number;
        customStyle?: any;
        bodyStyle?: any;
        allowCollapse?: boolean;
        collapse?: boolean;
        vertical?: boolean;
        reverse?: boolean;
        responsive?: boolean;
    }>(),
    {
        size: '20%',
        minSize: 200,
        maxSize: 800,
        allowCollapse: true,
        collapse: false,
        vertical: false,
        reverse: false,
        responsive: true,
    },
);

const emit = defineEmits(['update:collapse']);

// DOM 引用
const rootRef = ref<HTMLElement | null>(null);
const sideRef = ref<HTMLElement | null>(null);

// 状态管理
// eslint-disable-next-line vue/no-setup-props-destructure
const isCollapse = ref(props.collapse);
const resizing = ref(false);
const resizedSize = ref<string | null>(null);
const isMobile = ref(false);

// 将 size 属性转换为带单位的尺寸值
const normalizedSize = computed(() => {
    if (typeof props.size === 'string') {
        if (props.size.includes('%') || props.size.includes('px')) {
            return props.size;
        }
    }
    return `${props.size}px`;
});

// 计算侧边栏样式
const sideStyle = computed(() => ({
    [props.vertical ? 'height' : 'width']: isCollapse.value
        ? '0'
        : isMobile.value
        ? '100%'
        : resizedSize.value || normalizedSize.value,
    transition: 'all 0.5s ease',
    position: isMobile.value ? 'absolute' : 'relative',
    zIndex: isMobile.value ? 10 : 3,
}));

// 计算主内容区域样式
const mainStyle = computed(() => ({
    transition: 'padding 0.5s ease',
    flex: 1,
}));

// 判断是否启用响应式布局
const isResponsive = computed(() => {
    if (!props.responsive) return false;
    return window.innerWidth < 768;
});

// 切换折叠状态
const toggleCollapse = () => {
    isCollapse.value = !isCollapse.value;
    emit('update:collapse', isCollapse.value);
};

// 检查是否为移动端设备
const checkMobile = useDebounceFn(() => {
    isMobile.value = window.innerWidth <= 768;
}, 300);

// 组件挂载时初始化
onMounted(() => {
    checkMobile(); // 初次判断
    useResizeObserver(rootRef, () => {
        checkMobile();
    });
});
</script>

<style lang="scss" scoped>
.ca-split-panel {
    display: flex;
    overflow: hidden;
    width: 100%;
    height: 100%;
    position: relative;
    background: var(--color-bg-2);
    z-index: 1000;

    .container {
        display: flex;
        height: 100%;
        z-index: 1;
    }

    .divider-container {
        position: relative;

        .divider {
            width: 2px;
            height: 100%;
            @apply bg-gray-100 dark:bg-gray-700;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

    &.is-vertical {
        flex-direction: column;
    }

    &__side {
        display: flex;
        flex-direction: row;
        flex-shrink: 0;
        flex: 1;
        background: var(--color-bg-1);
        overflow: hidden;
        transition: transform 0.5s ease, width 0.5s ease;
    }

    &__content {
        padding: 10px;
    }

    &__main {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        background: var(--color-bg-1);
        padding: 10px;
        z-index: 1;
    }

    .ca-split-panel__collapse-trigger-icon {
        border-radius: 50%;
        z-index: 2;
        width: 100%;
        height: 100%;
        @apply bg-gray-100 dark:bg-gray-700;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    &__collapse-trigger {
        align-items: center;
        cursor: pointer;
        width: 28px;
        height: 28px;
        border-radius: 15px;
        justify-content: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%);
        z-index: 3;
    }

    &.is-collapse {
        .ca-split-panel__side {
            width: 0;
        }

        .ca-split-panel__collapse-trigger {
            transform: translateX(0%);
        }
    }

    &.is-mobile {
        .ca-split-panel__side {
            height: 100%;
            width: 100%;
            background: var(--color-bg-1);
            z-index: 2;
        }

        .divider {
            width: 0;
            margin: 0;
            background: none;
        }

        .ca-split-panel__collapse-trigger {
            z-index: 12;
            transform: translateX(-100%);

            &.is-collapse {
                left: 10px;
                right: auto;
            }
        }

        &.is-collapse .ca-split-panel__collapse-trigger {
            transform: translateX(0%);
        }
    }
}
</style>
