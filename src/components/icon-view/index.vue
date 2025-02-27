<template>
    <span v-if="modelValue.startsWith('icon-')" class="ali-icon" v-bind="$attrs">
        <i :class="['iconfont', `${iconModel.modelValue}`]"></i>
    </span>
</template>

<script setup lang="ts">
import '@/assets/iconfont/iconfont.css';

const iconModel = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
});
defineOptions({
    name: 'IconView',
});
</script>
