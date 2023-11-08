export interface Weather {
    coord: WeatherCoord;
    weather: WeatherElement[];
    base: string;
    main: WeatherMain;
    visibility: number;
    wind: WeatherWind;
    clouds: WeatherClouds;
    dt: number;
    sys: WeatherSys;
    timezone: number;
    rain: WeatherRain;
    id: number;
    name: string;
    cod: number;
}

export interface WeatherRain {
    "1h": number;
    "3h": number;
}

export interface WeatherClouds {
    all: number;
}

export interface WeatherCoord {
    lon: number;
    lat: number;
}

export interface WeatherMain {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
}

export interface WeatherSys {
    country: string;
    sunrise: number;
    sunset: number;
}

export interface WeatherElement {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface WeatherWind {
    speed: number;
    deg: number;
    gust: number;
}
