<template>
    <div class="demo-container">
        <tiny-container pattern="fashion" :aside-width="240">
            <div class="demo-center">Main</div>
            <template #header>
                <div class="demo-center">Header</div>
            </template>
            <template #aside>
                <layout-aside></layout-aside>
            </template>
            <template #footer>
                <div class="demo-center">Footer</div>
            </template>
        </tiny-container>
    </div>
</template>

<script setup lang="jsx">
import LayoutAside from '@/layout/components/layout-aside.vue';
</script>

<style lang="scss" scoped></style>
