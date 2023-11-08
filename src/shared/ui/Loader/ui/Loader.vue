<script setup lang="ts">

</script>

<template>
    <div class="loader-wrapper">
        <div class="loader"></div>
    </div>

</template>

<style scoped>
.loader-wrapper {
    margin: auto;
}

.loader {
    width: 4.8rem;
    height: 4.8rem;
    display: block;
    margin: 2rem auto 4rem;
    box-sizing: border-box;
    position: relative;
}

.loader::after {
    content: '';
    box-sizing: border-box;
    width: 4.8rem;
    height: 4.8rem;
    left: 0;
    bottom: 0;
    position: absolute;
    border-radius: 50% 50% 0;
    border: 1.5rem solid #FFF;
    transform: rotate(45deg) translate(0, 0);
    animation: animMarker 0.4s ease-in-out infinite alternate;
}

.loader::before {
    content: '';
    box-sizing: border-box;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    top: 150%;
    width: 2.4rem;
    height: 0.4rem;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.2);
    animation: animShadow 0.4s ease-in-out infinite alternate;
}

@keyframes animMarker {
    0% {
        transform: rotate(45deg) translate(0.5rem, 0.5rem);
    }
    100% {
        transform: rotate(45deg) translate(-0.5rem, -0.5rem);
    }
}

@keyframes animShadow {
    0% {
        transform: scale(0.5);
    }
    100% {
        transform: scale(1);
    }
}
</style>