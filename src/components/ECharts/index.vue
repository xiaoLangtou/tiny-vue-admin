<template>
    <div id="echarts" ref="chartRef" :style="echartsStyle" />
</template>

<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core';
import type { ECElementEvent, EChartsType } from 'echarts/core';
import echarts, { type ECOption } from './config';

interface Props {
    option: ECOption;
    renderer?: 'canvas' | 'svg';
    resize?: boolean;
    theme?: object | string;
    width?: number | string;
    height?: number | string;
    onClick?: (event: ECElementEvent) => any;
}

const props = withDefaults(defineProps<Props>(), {
    renderer: 'canvas',
    resize: true,
    theme: '',
    width: '100%',
    height: '100%',
    onClick: () => {},
});

const echartsStyle = computed(() => {
    return props.width || props.height
        ? { height: props.height + 'px', width: isNaN(Number(props.width)) ? props.width : props.width + 'px' }
        : { height: '100%', width: '100%' };
});

const chartRef = ref<HTMLDivElement | HTMLCanvasElement>();
const chartInstance = ref<EChartsType>();

const draw = () => {
    if (chartInstance.value) {
        chartInstance.value.setOption(props.option, { notMerge: true });
    }
};

watch(props, () => {
    draw();
});

const handleClick = (event: ECElementEvent) => props.onClick && props.onClick(event);

const init = () => {
    if (!chartRef.value) return;
    chartInstance.value = echarts.getInstanceByDom(chartRef.value);

    if (!chartInstance.value) {
        chartInstance.value = markRaw(
            echarts.init(chartRef.value, props.theme, {
                renderer: props.renderer,
            }),
        );
        chartInstance.value.on('click', handleClick);
        draw();
    }
};

const resize = () => {
    if (chartInstance.value && props.resize) {
        console.log('resize');
        chartInstance.value.resize({ animation: { duration: 300 } });
    }
};

const debouncedResize = useDebounceFn(resize, 300, { maxWait: 800 });

onMounted(() => {
    nextTick(() => init());
    window.addEventListener('resize', debouncedResize);
});

onActivated(() => {
    if (chartInstance.value) {
        chartInstance.value.resize();
    }
});

onBeforeUnmount(() => {
    chartInstance.value?.dispose();
    window.removeEventListener('resize', debouncedResize);
});

defineExpose({
    getInstance: () => chartInstance.value,
    resize,
    draw,
});

defineOptions({
    name: 'ECharts',
});
</script>
