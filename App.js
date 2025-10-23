import {Home} from "./pages/Home/Home";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {s} from "./App.style";
import {ImageBackground} from "react-native";
import backgroundImg from "./assets/background.png";
import AlataRegular from "./assets/fonts/Alata-Regular.ttf";
import {useFonts} from "expo-font";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Forecast} from "./pages/Forecast/Forecast";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

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
            <ImageBackground source={backgroundImg} style={s.image_background} imageStyle={s.img}>
                <SafeAreaProvider>
                    <SafeAreaView style={s.container}>
                        {
                            isFontLoaded ? (
                                <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Home">
                                    <Stack.Screen name="Home" component={Home} />
                                    <Stack.Screen name="Forecast" component={Forecast} />
                                </Stack.Navigator>
                            ) : null
                        }
                    </SafeAreaView>
                </SafeAreaProvider>
            </ImageBackground>
        </NavigationContainer>
    );
}
