import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { createPostService } from "../services/postService";
import { showMessage } from "../utils/showMessage";

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
      showMessage("Preencha título e conteúdo.")
      return;
    }

    try {
      setCreating(true);

      console.log("Criando post:", postTitle, postContent, postImage);

      await createPostService(postTitle, postContent, postImage);

      showMessage("Post criado com sucesso!");

      // reset campos
      setPostTitle("");
      setPostContent("");
      setPostImage(null);
      setSheetVisible(false);

      if (onCreated) {
        onCreated();
      }
    } catch (error: any) {
      console.log(error?.response?.data || error);
      showMessage("Erro ao criar post!")
    } finally {
      setCreating(false);
    }
  }

  return {
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
