import {StyleSheet} from "react-native";

const s = StyleSheet.create({
    clock: {
        alignItems: "flex-end",
    },
    weather_label: {
        alignSelf: "flex-end",
        transform: [{
            rotate: "-90deg"
        }],
        fontSize: 20,
    },
    image: {
        width: 90,
        height: 90,
    },
    tempature_box: {
        alignItems: "baseline",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    temperature: {
        fontSize: 150,

    }
});

export {s} ;