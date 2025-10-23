import {s} from "./Home.style";
import {Text, View} from "react-native"
import {requestForegroundPermissionsAsync, getCurrentPositionAsync} from "expo-location"
import React, {useEffect, useState} from "react";
import {MeteoAPI} from "../../api/meteo";
import {Txt} from "../../components/Txt/Txt";
import {MeteoBasic} from "../../components/MeteoBasic/MeteoBasic";
import {getWeatherInterpretation} from "../../services/meteo-service";

export function Home() {
    const [coords, setCords] = useState();
    const [weather, setWeather] = useState();
    const currentWeather = weather?.current;

    useEffect(() => {
        getUserCords();
    }, []);

    useEffect(() => {
        if (coords) {
            fetchWeather(coords);
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

    console.log(coords);
    console.log(weather);
    console.log('15dsf1dsfdsf4');
    console.log(currentWeather);


    return currentWeather ? (
        <>
            <View style={s.meteo_basic}>
                <MeteoBasic
                    temperature={Math.round(currentWeather?.temperature_2m)}
                    city="Todo"
                    interpretation={getWeatherInterpretation(currentWeather.weather_code)}
                />
            </View>
            <View style={s.searchbar_container}/>
            <View style={s.meteo_advanced}/>
        </>
    ) : null;
}