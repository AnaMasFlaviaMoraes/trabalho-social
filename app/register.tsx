import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import {
  CreateUserPayload,
  createUserService,
} from "../src/services/userService";
import { registerStyles as styles } from "../src/styles/registerStyles";

export default function RegisterScreen() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

 async function handleRegister() {
  if (!name || !email || !password) {
    Alert.alert("Atenção", "Preencha nome, e-mail e senha.");
    return;
  }

  const payload: CreateUserPayload = { name, email, password };

  try {
    setLoading(true);
    const user = await createUserService(payload);
    console.log("Usuário criado:", user);

    const successMessage = "Usuário criado com sucesso!";

    if (Platform.OS === "android") {
      ToastAndroid.show(successMessage, ToastAndroid.SHORT);
    } else if (Platform.OS === "web") {
      window.alert(successMessage);
    } else {
      Alert.alert("Sucesso", successMessage);
    }

    setTimeout(() => {
      router.replace("/");
    }, 800);

  } catch (error: any) {
    console.log(error?.response.data.error);

    const errorMessage =
      error?.response?.data.error || "Erro ao criar usuário. Tente novamente.";

    if (Platform.OS === "android") {
      ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
    } else if (Platform.OS === "web") {
      window.alert(errorMessage);
    } else {
      Alert.alert("Sucesso", errorMessage);
    }
    
  } finally {
    setLoading(false);
  }
}

  return (
    <>
    <View style={styles.container}>
      <Text style={styles.title}>Criar conta</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        autoCapitalize="none"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Registrar</Text>
        )}
      </TouchableOpacity>
    </View>
    <Link href="/" style={{ textAlign: "center" }}>
            Voltar para o login
    </Link>
    </>
  );
}
