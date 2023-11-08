<script setup lang="ts">
import { computed, onMounted, reactive, watch } from "vue";
import { Header } from "@/widgets/Header";
import type { Weather } from "@/shared/types/weather";
import RainFallIcon from "@/shared/assets/icons/rain-fall.svg";
import WindIcon from "@/shared/assets/icons/wind.svg";
import HumidityIcon from "@/shared/assets/icons/humidity.svg";
import type { UserGeolocation } from "@/shared/types/geolocation";
import { Loader } from "@/shared/ui/Loader";

const state = reactive<{
    currentWeather: Weather | null,
    geolocation: UserGeolocation | null,
}>({
    currentWeather: null,
    geolocation: null,
});

const getGeolocation = async () => {
    try {
        const response = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${import.meta.env.VITE_IP_GEOLOCATION_API_KEY}`);
        
        state.geolocation = await response.json();
    } catch (error) {
        console.log(error);
    }
};

const fetchWeather = async () => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${state.geolocation?.latitude}&lon=${state.geolocation?.longitude}&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}&units=metric`);
        
        state.currentWeather = await response.json();
    } catch (error) {
        console.log(error);
    }
};

const currentDate = computed(() => {
    if (state.currentWeather) {
        return new Intl.DateTimeFormat("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
        }).format(new Date());
        
    } else {
        return null;
    }
});

watch(() => state.geolocation, () => {
    fetchWeather();
});

onMounted(() => {
    getGeolocation();
});
</script>

<template>
    <div class="app">
        <Header/>
        
        <main v-if="state.currentWeather" class="main">
            <section class="city">
                <div class="container">
                    <h1 class="name">
                        {{ state.currentWeather?.name }}, <br>
                        {{ state.geolocation?.country_name }}
                    </h1>
                    <time class="day">{{ currentDate }}</time>
                </div>
            </section>
            <section class="detail">
                <div class="container">
                    <div class="detail__wrapper">
                        <div class="detail__img-wrapper">
                            <img
                                class="detail__img"
                                :src="`https://openweathermap.org/img/wn/${state.currentWeather.weather[0].icon}@4x.png`"
                                alt=""
                            >
                        </div>
                        <div class="detail__info">
                            <h2 class="count">
                                {{ state.currentWeather?.main.temp }}
                                <span class="unit">&#8451;</span>
                            </h2>
                            <p class="description">{{ state.currentWeather?.weather[0].main }}</p>
                        </div>
                    </div>
                </div>
            </section>
            <section class="info">
                <div class="container">
                    <ul class="info__list">
                        <li v-if="state.currentWeather.main.rain" class="info__item">
                            <div class="info__icon info__icon--rain">
                                <RainFallIcon/>
                            </div>
                            <p class="info__type">RainFall</p>
                            <span class="info__value">{{ state.currentWeather?.rain["1h"] }}</span>
                        </li>
                        <li v-if="state.currentWeather.wind.speed" class="info__item">
                            <div class="info__icon info__icon--wind">
                                <WindIcon/>
                            </div>
                            <p class="info__type">Wind</p>
                            <span class="info__value">{{ state.currentWeather?.wind.speed }}m/s</span>
                        </li>
                        <li v-if="state.currentWeather.main.humidity" class="info__item">
                            <div class="info__icon info__icon--humidity">
                                <HumidityIcon/>
                            </div>
                            <p class="info__type">Humidity</p>
                            <span class="info__value">{{ state.currentWeather?.main.humidity }}%</span>
                        </li>
                    </ul>
                </div>
            </section>
        </main>
        <Loader v-else/>
    </div>
</template>

<style>
.city {
    padding-block: var(--space-xs);
}

.name {
    font-size: var(--size-xxxl);
    margin-bottom: var(--size-xs);
    line-height: var(--lh-xxxl);
}

.day {
    font-size: var(--size-n);
    line-height: var(--lh-n);
    color: var(--color-dark-gray);
}

.detail {
    padding-block: var(--space-xxs);
}

.detail__wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--space-s);
}

.detail__img-wrapper {
    flex-basis: 8rem;
    position: relative;
}

.detail__img-wrapper::before {
    content: '';
    display: block;
    width: 100%;
    padding-top: 100%;
}

.detail__img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
}

.detail__info {
    flex-basis: 8rem;
}

.count {
    font-weight: 700;
    font-size: var(--size-xxb);
    line-height: var(--lh-xxb);
    display: flex;
    align-items: flex-start;
}

.description {
    font-size: var(--size-l);
}

.unit {
    font-weight: 400;
    font-size: var(--size-m);
    line-height: 1;
}

.info {
    padding-block: var(--space-n);
}

.info__list {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
}

.info__item {
    display: flex;
    align-items: center;
    padding-block: var(--space-xs);
    padding-inline: var(--space-s);
    border-radius: var(--radius-m);
    background: rgba(255, 255, 255, 0.36);
    box-shadow: inset 0 0 0 0.1rem var(--color-white-opacity);
}

.info__icon {
    flex-shrink: 0;
    margin-right: var(--space-xs);
    display: flex;
    width: 2.2rem;
    height: 2.2rem;
    border-radius: var(--radius-n);
}

.info__icon--rain {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.07), 0 9px 10px -3px rgba(23, 126, 37, 0.15);
}

.info__icon--wind {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.07), 0 9px 10px -3px rgba(192, 27, 60, 0.15);
}

.info__icon--humidity {
    box-shadow: 0 7px 10px -3px rgba(66, 160, 240, 0.25);
}

.info__icon svg {
    display: block;
    width: 100%;
    height: 100%;
}

.info__type {

}

.info__value {
    margin-left: auto;
    padding-right: var(--space-s);
}
</style>