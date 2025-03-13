<template>
    <teleport to="body" :disabled="!isFullscreen">
        <FadeDown>
            <div :class="isFullscreen ? 'teleport-container' : ''">
                <slot></slot>
            </div>
        </FadeDown>
    </teleport>
</template>

<script lang="ts" setup>
import FadeDown from '../transition/fade-down.vue';

defineProps({
    isFullscreen: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
});

defineOptions({
    name: 'TeleportFullscreen',
});
</script>

<style lang="scss" scoped>
.teleport-container {
    @apply fixed w-[100vw] h-[100vh] z-[9999] top-0 left-0  w-full h-full p-5 bg-white dark:bg-black;
}
</style>
