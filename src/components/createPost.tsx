import React from "react";
import {
    Image,
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { homeStyle as styles } from "../styles/homeStyle";

interface CreatePostSheetProps {
  visible: boolean;
  onClose: () => void;
  postTitle: string;
  postContent: string;
  onChangeTitle: (text: string) => void;
  onChangeContent: (text: string) => void;
  postImage: any;
  onPickImage: () => void;
  onCreatePost: () => void;
  creating: boolean;
}

export function CreatePostSheet({
  visible,
  onClose,
  postTitle,
  postContent,
  onChangeTitle,
  onChangeContent,
  postImage,
  onPickImage,
  onCreatePost,
  creating,
}: CreatePostSheetProps) {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.sheetOverlay} onPress={onClose} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.sheetContainer}
      >
        <View style={styles.sheetContent}>
          <Text style={styles.sheetTitle}>Criar Post</Text>

          <TextInput
            style={styles.sheetInput}
            placeholder="Título"
            value={postTitle}
            onChangeText={onChangeTitle}
          />

          <TextInput
            style={[styles.sheetInput, { height: 100 }]}
            placeholder="Conteúdo"
            multiline
            value={postContent}
            onChangeText={onChangeContent}
          />

          <TouchableOpacity style={styles.sheetButton} onPress={onPickImage}>
            <Text style={styles.sheetButtonText}>
              {postImage ? "Trocar imagem" : "Escolher imagem"}
            </Text>
          </TouchableOpacity>

          {postImage && (
            <Image
              source={{ uri: postImage.uri }}
              style={{
                width: "100%",
                height: 120,
                marginVertical: 8,
                borderRadius: 8,
              }}
            />
          )}

          <TouchableOpacity
            style={styles.sheetCreateButton}
            onPress={onCreatePost}
            disabled={creating}
          >
            <Text style={styles.sheetCreateButtonText}>
              {creating ? "Criando..." : "Criar Post"}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
