import { useRouter } from "expo-router";
import { CircleChevronLeft, Plus } from 'lucide-react-native';
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { CreatePostSheet } from "../src/components/createPost";
import { PostsList } from "../src/components/postList";
import { useAuth } from "../src/hooks/useAuth";
import { useCreatePost } from "../src/hooks/useCreatePost";
import {
  deletePostService,
  getMyPostsService,
  type Post,
} from "../src/services/postService";
import { profileStyle as styles } from "../src/styles/profileStyle";


export default function ProfileScreen() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [myPosts, setMyPosts] = useState<Post[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }, []);

  async function loadMyPosts(isRefresh = false) {
    try {
      if (!isRefresh) {
        setLoadingPosts(true);
      }
      const posts = await getMyPostsService();
      setMyPosts(posts);
    } catch (error: any) {
      console.log("Erro ao carregar meus posts:", error?.response?.data || error);
    } finally {
      setLoadingPosts(false);
      setRefreshing(false);
    }
  }

  async function handleRefresh() {
    setRefreshing(true);
    await loadMyPosts(true);
  }

  async function handleDeletePost(postId: number) {
    await deletePostService(postId);
    setMyPosts((prev) => prev.filter((p) => p.id !== postId));
  }

  function handleBack() {
    router.push("/home");
  }

  const {
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
  } = useCreatePost({
    onCreated: () => loadMyPosts(true),
  });

  useEffect(() => {
    if (!authLoading && user) {
      loadMyPosts();
    } else if (!authLoading && !user) {
      setLoadingPosts(false);
    }
  }, [authLoading, user]);

  if (authLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Carregando dados...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>
          Você não está autenticado. Faça login para ver seu perfil.
        </Text>
      </View>
    );
  }

  if (loadingPosts) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" />
        <Text style={styles.loadingText}>Carregando seus posts...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <View style={styles.profileHeaderRow}>
          <Text style={styles.title}>Meu perfil</Text>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <CircleChevronLeft />
            <Text style={styles.backButtonText}>Voltar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.userInfoBox}>
          <Text style={styles.userInfoLabel}>Nome</Text>
          <Text style={styles.userInfoValue}>{user.name}</Text>

          <Text style={[styles.userInfoLabel, { marginTop: 8 }]}>E-mail</Text>
          <Text style={styles.userInfoValue}>{user.email}</Text>
        </View>


      </View>

      <PostsList
        posts={myPosts}
        count={myPosts.length}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        onLoadMore={() => { }}
        loadingMore={false}
        formatDate={formatDate}
        title="Meus posts"
        userId={user.id}
        onDelete={handleDeletePost}
      />

      <TouchableOpacity style={styles.fab} onPress={openSheet}>
        <Plus />
      </TouchableOpacity>


      <CreatePostSheet
        visible={sheetVisible}
        onClose={closeSheet}
        postTitle={postTitle}
        postContent={postContent}
        onChangeTitle={setPostTitle}
        onChangeContent={setPostContent}
        postImage={postImage}
        onPickImage={pickImage}
        onCreatePost={handleCreatePost}
        creating={creating}
      />
    </View>
  );
}
