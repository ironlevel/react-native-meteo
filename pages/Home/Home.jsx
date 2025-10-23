import {s} from "./Home.style";
import {Text, View} from "react-native"
import {requestForegroundPermissionsAsync, getCurrentPositionAsync} from "expo-location"
import {useEffect, useState} from "react";
import {MeteoAPI} from "../../api/meteo";

export function Home() {
    const [coords, setCords] = useState();
    const [weather, setWeather] = useState();

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

    return (
        <>
            <View style={s.meteo_basic}>
                <Text style={{fontSize: 60, color: "white"}}>Hello</Text>
            </View>
            <View style={s.searchbar_container}/>
            <View style={s.meteo_advanced}/>
        </>
    );
}