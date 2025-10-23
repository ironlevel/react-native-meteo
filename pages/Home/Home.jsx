import {s} from "./Home.style";
import {Text, View} from "react-native"
import {requestForegroundPermissionsAsync, getCurrentPositionAsync} from "expo-location"
import React, {useEffect, useState} from "react";
import {MeteoAPI} from "../../api/meteo";
import {Txt} from "../../components/Txt/Txt";
import {MeteoBasic} from "../../components/MeteoBasic/MeteoBasic";
import {getWeatherInterpretation} from "../../services/meteo-service";
import {MeteoAdvanced} from "../../components/MeteoAdvanced/MeteoAdvanced";
import {useNavigation} from "@react-navigation/native";
import {Container} from "../../components/Container/Container";
import {Searchbar} from "../../components/Searchbar/Searchbar";

export function Home() {
    const [coords, setCords] = useState();
    const [weather, setWeather] = useState();
    const [city, setCity] = useState();
    const nav  = useNavigation();
    const currentWeather = weather?.current;

    useEffect(() => {
        getUserCords();
    }, []);

    useEffect(() => {
        if (coords) {
            fetchWeather(coords);
            fetchCity(coords);
        }
    }, [coords]);

    async function getUserCords() {
        let {status} = await requestForegroundPermissionsAsync();
        if (status === "granted") {
            const location = await getCurrentPositionAsync();
            setCords({
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            });
        } else {
            // Si il refuse les permissions alors on lui met la ville de Paris par défaut
            setCords({lat: "48.85", lng: "2.35"});
        }
    }

    async function fetchWeather(coordinates) {
        const weatherResponse = await MeteoAPI.fetchWeatherFromCoords(coordinates);
        setWeather(weatherResponse);
    }

    async function fetchCity(coordinates) {
        const cityResponse = await MeteoAPI.fetchCityFromCoords(
            coordinates
        );
        setCity(cityResponse);
    }

    function goToForecastPage() {
        nav.navigate("Forecast", {city, ...weather.daily});
    }

    return currentWeather ? (
        <Container>
            <View style={s.meteo_basic}>
                <MeteoBasic
                    temperature={Math.round(currentWeather?.temperature_2m)}
                    city={city}
                    interpretation={getWeatherInterpretation(currentWeather.weather_code)}
                    onPress={goToForecastPage}
                />
            </View>
            <View style={s.searchbar_container}>
                <Searchbar />
            </View>
            <View style={s.meteo_advanced}>

                <MeteoAdvanced
                    wind={currentWeather.wind_speed_10m}
                    dusk={weather.daily.sunrise[0].split("T")[1]}
                    dawn={weather.daily.sunset[0].split("T")[1]}
                />
            </View>
        </Container>
    ) : null;
}