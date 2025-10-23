import axios from "axios";

export class MeteoAPI {
    static async fetchWeatherFromCoords(coords) {
        // const url =
        //     `https://api.open-meteo.com/v1/forecast` +
        //     `?latitude=${coords.lat}` +
        //     `&longitude=${coords.lng}` +
        //     `&daily=weather_code,temperature_2m_max,sunrise,sunset,wind_speed_10m_max` +
        //     `&timezone=auto` +
        //     `&current=true`;
        //     // `&current_weather=true`;

        // const url = `https://api.open-meteo.com/v1/forecast` +
        //     `?latitude=${coords.lat}&longitude=${coords.lng}` +
        //     `&timezone=auto` +
        //     `&current=temperature_2m` +
        //     `&daily=weather_code,sunrise,sunset,wind_speed_10m_max,temperature_2m_max`;
        const url = `https://api.open-meteo.com/v1/forecast`
            + `?latitude=${coords.lat}&longitude=${coords.lng}`
            + `&timezone=auto`
            + `&current=temperature_2m,weather_code`
            + `&daily=sunrise,sunset,wind_speed_10m_max,temperature_2m_max`;

        const { data } = await axios.get(url, { timeout: 10000 });
        return data;
    }
}