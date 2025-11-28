import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert, Platform } from "react-native";
import { createPostService } from "../services/postService";

interface UseCreatePostParams {
  onCreated?: () => void; 
}

export function useCreatePost({ onCreated }: UseCreatePostParams = {}) {
  const [sheetVisible, setSheetVisible] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postImage, setPostImage] = useState<any>(null);
  const [creating, setCreating] = useState(false);

  function openSheet() {
    setSheetVisible(true);
  }

  function closeSheet() {
    setSheetVisible(false);
  }

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setPostImage(result.assets[0]);
    }
  }

  async function handleCreatePost() {
    if (!postTitle.trim() || !postContent.trim()) {
      Platform.OS === "web"
        ? window.alert("Preencha título e conteúdo.")
        : Alert.alert("Atenção", "Preencha título e conteúdo.");
      return;
    }

    try {
      setCreating(true);

      console.log("Criando post:", postTitle, postContent, postImage);

      await createPostService(postTitle, postContent, postImage);

      Platform.OS === "web"
        ? window.alert("Post criado!")
        : Alert.alert("Sucesso", "Post criado!");

      // reset campos
      setPostTitle("");
      setPostContent("");
      setPostImage(null);
      setSheetVisible(false);

      // deixa a tela decidir o que fazer
      if (onCreated) {
        onCreated();
      }
    } catch (error: any) {
      console.log(error?.response?.data || error);
      Platform.OS === "web"
        ? window.alert("Erro ao criar post.")
        : Alert.alert("Erro", "Erro ao criar post.");
    } finally {
      setCreating(false);
    }
  }

  return {
    // estado
    sheetVisible,
    postTitle,
    postContent,
    postImage,
    creating,
    setPostTitle,
    setPostContent,
    openSheet,
    closeSheet,
    pickImage,
    handleCreatePost,
  };
}
