<!--
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-03-01 17:04:03
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-03-01 17:27:43
 * @FilePath: src/components/custom-modal/index.vue
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 -->
<template>
    <a-modal v-bind="$attrs" :wrap-style="{ overflow: 'hidden' }">
        <template #footer>
            <slot name="footer"></slot>
        </template>
        <template #title>
            <div ref="modalRef" class="w-full cursor-move">{{ modalTitle }}</div>
        </template>
        <template #cancelText>
            <slot name="cancelText"></slot>
        </template>
        <template #okText>
            <slot name="okText"></slot>
        </template>
        <template #closeIcon>
            <slot name="closeIcon">
                <X :size="20" />
            </slot>
        </template>
        <template #modalRender="{ originVNode }">
            <div :style="transformStyle">
                <component :is="originVNode" />
            </div>
        </template>
        <slot name="default"></slot>
    </a-modal>
</template>

<script setup lang="ts">
import { CSSProperties } from 'vue';
import { X } from 'lucide-vue-next';

defineProps({
    modalTitle: {
        type: String as PropType<string>,
        default: '标题',
    },
});
const modalRef = ref<HTMLElement>();
const { x, y, isDragging } = useDraggable(modalRef);

const startX = ref<number>(0);
const startY = ref<number>(0);
const startedDrag = ref(false);
const transformX = ref(0);
const transformY = ref(0);
const preTransformX = ref(0);
const preTransformY = ref(0);
const dragRect = ref({ left: 0, right: 0, top: 0, bottom: 0 });

watch([x, y], () => {
    if (!startedDrag.value) {
        startX.value = x.value;
        startY.value = y.value;
        const bodyRect = document.body.getBoundingClientRect();
        const titleRect = modalRef.value?.getBoundingClientRect();
        dragRect.value.right = bodyRect.width - (titleRect?.width ?? 0);
        dragRect.value.bottom = bodyRect.height - (titleRect?.height ?? 0);
        preTransformX.value = transformX.value;
        preTransformY.value = transformY.value;
    }
    startedDrag.value = true;
});
watch(isDragging, () => {
    if (!isDragging) {
        startedDrag.value = false;
    }
});

watchEffect(() => {
    if (startedDrag.value) {
        transformX.value =
            preTransformX.value + Math.min(Math.max(dragRect.value.left, x.value), dragRect.value.right) - startX.value;
        transformY.value =
            preTransformY.value + Math.min(Math.max(dragRect.value.top, y.value), dragRect.value.bottom) - startY.value;
    }
});

const transformStyle = computed<CSSProperties>(() => {
    return {
        transform: `translate(${transformX.value}px, ${transformY.value}px)`,
    };
});
</script>

<style scoped lang="scss">
:deep(.ant-modal .ant-modal-close) {
    @apply text-white dark:text-black;
}
</style>
