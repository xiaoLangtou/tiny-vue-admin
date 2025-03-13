<template>
    <span v-if="modelValue.startsWith('icon-')" class="ali-icon" v-bind="$attrs">
        <i :class="['iconfont', `${iconModel.modelValue}`]"></i>
    </span>
    <span v-if="modelValue.startsWith('Lucide-')" v-bind="$attrs">
        <component :is="formatterIcon(modelValue)" :size="16" :stroke-width="2.5"></component>
    </span>
</template>

<script setup lang="ts">
import '@/assets/iconfont/iconfont.css';
import * as LucideIcons from 'lucide-vue-next';

const iconModel = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
});
const iconsMap = LucideIcons as Record<string, any>;
const formatterIcon = (icon: string) => {
    const iconName = icon.replace('Lucide-', '');
    if (icon == 'Lucide-createLucideIcon') {
        console.log(iconName);
    }

    return iconsMap[iconName] ? markRaw(iconsMap[iconName]) : null;
};

defineOptions({
    name: 'IconView',
});
</script>
