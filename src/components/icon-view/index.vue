<template>
    <span v-if="modelValue.startsWith('icon-')" class="ali-icon" v-bind="$attrs">
        <i :class="['iconfont', `${iconModel.modelValue}`]"></i>
    </span>
    <component
        :is=" Svgs[modelValue as keyof typeof Svgs] &&Svgs[iconModel.modelValue as keyof typeof Svgs]()"
        v-else
    ></component>
</template>

<script setup lang="ts">
import Svgs from '@opentiny/vue-icon';
import { Icon } from 'lucide-vue-next';
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
