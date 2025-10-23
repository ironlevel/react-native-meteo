import { Home } from "./pages/Home/Home";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function App() {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
                <Home />
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
