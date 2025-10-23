import axios from "axios";

export class MeteoAPI {
    static async fetchWeatherFromCoords(coords) {
        const url = `https://api.open-meteo.com/v1/forecast`
            + `?latitude=${coords.lat}&longitude=${coords.lng}`
            + `&timezone=auto`
            + `&current=temperature_2m,weather_code,wind_speed_10m`
            + `&daily=sunrise,sunset,wind_speed_10m_max,temperature_2m_max`;

        const {data} = await axios.get(url, {timeout: 10000});
        return data;
    }

    static async fetchCityFromCoords(coords) {
        const cityUrl =
            `https://nominatim.openstreetmap.org/reverse?` +
            `lat=${coords.lat}&lon=${coords.lng}&format=json`;

        const {data} = await axios.get(cityUrl, {
            timeout: 10000,
            headers: {
                "User-Agent": "MyMeteoApp/1.0 (dev.meteo@test.fr)"
            }
        });

        return data.address.town;
    }
}