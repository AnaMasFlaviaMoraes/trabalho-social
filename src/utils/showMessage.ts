import { Alert, Platform, ToastAndroid } from "react-native";

export function showMessage(message: string, type: "success" | "error" = "error") {
    if (Platform.OS === "android") {
        ToastAndroid.show(message, ToastAndroid.SHORT);
        return;
    }

    if (Platform.OS === "web") {
        window.alert(message);
        return;
    }

    Alert.alert(
        type === "success" ? "Sucesso" : "Atenção",
        message
    );
}
