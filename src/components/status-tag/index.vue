<script setup lang="ts">
import { useAntdToken } from '@/composables';
import { FROZEN_STATUS } from '@/global/enums.ts';

const { token } = useAntdToken();

const props = defineProps({
    value: {
        type: String as PropType<'NORMAL' | 'FROZEN' | 'default'>,
        default: 'default',
        validator: (value: string) => {
            return ['NORMAL', 'FROZEN', 'default'].includes(value);
        },
    },
});

// 生成一个颜色
const statusColor = computed(() => {
    return {
        NORMAL: token.value.colorPrimary,
        FROZEN: token.value.colorError,
        default: token.value.colorTextSecondary,
    }[props.value];
});

const statusText = computed(() => {
    return {
        NORMAL: FROZEN_STATUS.NORMAL,
        FROZEN: FROZEN_STATUS.FROZEN,
        default: '未知',
    }[props.value];
});
</script>

<template>
    <span class="inline-flex items-center px-2 py-1 text-sm rounded cursor-pointer select-none">
        <div class="w-2 h-2 rounded-full mr-1.5" :style="{ backgroundColor: statusColor }" />
        {{ statusText }}
    </span>
</template>
