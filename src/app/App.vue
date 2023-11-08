<script setup lang="ts">
import { ref } from "vue";
import { Header } from "@/widgets/Header";
import type { Weather } from "@/shared/types/weather";

const weather = ref<Weather | null>(null);

const fetchWeather = async () => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=39.34&lon=10.99&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}`);
        
        console.log(response);
        weather.value = await response.json();
    } catch (error) {
        console.log(error);
    }
};
</script>

<template>
    <div class="app">
        <Header/>
    </div>
</template>

<style>

</style>