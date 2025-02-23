<template>
    <span v-if="prefix.includes('icon-')" class="ali-icon" v-bind="$attrs">
        <i :class="['iconfont', `${iconModel.modelValue}`]"></i>
    </span>

    <component
        :is=" Svgs[modelValue as keyof typeof Svgs] &&Svgs[iconModel.modelValue as keyof typeof Svgs]()"
    ></component>
</template>

<script setup lang="ts">
import Svgs from '@opentiny/vue-icon';
import "@/assets/iconfont/iconfont.css";
const iconModel = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
});
defineOptions({
    name: 'IconView',
});

const prefix = computed(() => {
    return iconModel.modelValue ? (iconModel.modelValue.startsWith('icon-') ? 'icon-' : 'ele-') : '';
});
</script>

<style scoped lang="scss"></style>
