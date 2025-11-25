import { Link, useRouter } from "expo-router";
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Platform, Text, TextInput, TouchableOpacity, View, } from 'react-native';
import { loginService } from '../src/services/authService';
import { loginStyles as styles } from '../src/styles/loginStyles';
import { saveAuth } from "../src/utils/authStorage";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !password) {
      if (Platform.OS === "web") {
        window.alert("Preencha e-mail e senha.");
      } else {
        Alert.alert("Atenção", "Preencha e-mail e senha.");
      }
      return;
    }

    try {
      setLoading(true);
      const data = await loginService(email, password);
      console.log("Login OK:", data);

      const message = "Login realizado com sucesso!";

      await saveAuth({
        user: data.user,
        token: data.jwt,
      });

      if (Platform.OS === "web") {
        window.alert(message);
      } else {
        Alert.alert("Sucesso", message);
      }

      // 👉 depois do login, vai para a Home
      router.replace("/home");
    } catch (error: any) {
      console.log(error?.response?.data || error);
      const msg = "Não foi possível fazer login.";
      if (Platform.OS === "web") {
        window.alert(msg);
      } else {
        Alert.alert("Erro", msg);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

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
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Entrar</Text>
        )}
      </TouchableOpacity>

      <Link href="/register" style={{ marginTop: 16, textAlign: "center" }}>
        Não tem conta? <Text style={{ fontWeight: "bold" }}>Cadastre-se</Text>
      </Link>
    </View>
  );
}