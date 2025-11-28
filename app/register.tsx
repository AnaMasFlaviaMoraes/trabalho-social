import { showMessage } from "@/src/utils/showMessage";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View
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
      showMessage("Preencha todos os campos.");
      return;
    }

    if (!validatePassword(password)) {
      showMessage("Senha inválida \n A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    const payload: CreateUserPayload = { name, email, password };

    try {
      setLoading(true);
      const user = await createUserService(payload);
      console.log("Usuário criado:", user);

      showMessage("Usuário criado com sucesso!", "success");

      setTimeout(() => {
        router.replace("/");
      }, 800);

    } catch (error: any) {
      console.log(error?.response.data.details);

      showMessage(error?.response?.data.error || "Erro ao criar usuário. Tente novamente.");

    } finally {
      setLoading(false);
    }
  }


  function handleGoToLogin() {
    router.replace("/");
  }

  function validatePassword(password: string) {
    const hasMinLength = password.length >= 6;

    return hasMinLength;
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
        <TouchableOpacity style={styles.backLink} onPress={handleGoToLogin}>
          <Text style={styles.backLinkText}>Voltar para o login</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
