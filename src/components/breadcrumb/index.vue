<template>
    <a-breadcrumb>
        <template #separator>
            <ChevronRight :size="16"></ChevronRight>
        </template>
        <a-breadcrumb-item v-for="(crumb, index) in items" :key="index" :to="{ path: '' }">
            <a v-if="crumb.path" href=""> {{ crumb.name }}</a>
            <span v-else> {{ crumb.name }}</span>
        </a-breadcrumb-item>
    </a-breadcrumb>
</template>

<script lang="ts" setup>
import { ChevronRight } from 'lucide-vue-next';

defineProps({
    items: {
        type: Array as PropType<{ name: string; path?: string }[]>,
        default: () => [],
    },
});

defineOptions({
    name: 'Breadcrumb',
});
</script>

<style scoped lang="scss">
.ant-breadcrumb {
    ol {
        li {
            @apply flex items-center;
        }
    }
}
</style>
