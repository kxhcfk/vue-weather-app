<script setup lang="ts">
interface Props {}

const props = defineProps<Props>()
</script>

<template>
    <button
        :class="{
            button: true
        }"
    >
        <slot></slot>
    </button>
</template>

<style scoped>
.button {
    padding: 0;
    margin: 0;
    display: inline-flex;
    background: none;
    border: 0;
}
</style>