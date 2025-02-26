<template>
    <tiny-breadcrumb size="medium" :separator-icon="ChevronRight({ size: 16 }, {} as any)">
        <tiny-breadcrumb-item v-for="(crumb, index) in items" :key="index" :to="{ path: '' }">
            <a v-if="crumb.path" :href="crumb.path" class="item-link">
                {{ crumb.name }}
            </a>
            <span v-else class="item-span">
                {{ crumb.name }}
            </span>
        </tiny-breadcrumb-item>
    </tiny-breadcrumb>
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
.tiny-breadcrumb {
    --tv-Breadcrumb-separator-icon-color: none;
    --tv-Breadcrumb-text-color: theme('colors.gray.400');
    :deep(.tiny-breadcrumb__inner) {
        &:hover {
            text-decoration: none;

            a {
                &:hover {
                    text-decoration: none;
                }
            }
        }
    }
}

.item-link {
    text-decoration: none;
    @apply relative px-2 py-1 rounded-md transition-all text-gray-200  hover:bg-gray-100 hover:text-gray-500 text-sm;
}

.item-span {
    @apply text-gray-500 font-semibold px-2 py-1 text-sm;
}
</style>
