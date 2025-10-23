import {Home} from "./pages/Home/Home";
import AlataRegular from "./assets/fonts/Alata-Regular.ttf";
import {useFonts} from "expo-font";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Forecast} from "./pages/Forecast/Forecast";
import {NavigationContainer, DefaultTheme} from "@react-navigation/native";

const Stack = createNativeStackNavigator();


const navTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: "transparent",
    },
};

export default function App() {
    const [isFontLoaded] = useFonts({
        "Alata-Regular": AlataRegular
    });


    return (
        <NavigationContainer theme={navTheme}>
            {isFontLoaded ? (
                <Stack.Navigator
                    screenOptions={{
                        animation: "fade",
                        headerShown: false,
                }}
                    initialRouteName="Home">
                    <Stack.Screen name="Home" component={Home}/>
                    <Stack.Screen name="Forecast" component={Forecast}/>
                </Stack.Navigator>
            ) : null}
        </NavigationContainer>
    );
}
