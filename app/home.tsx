import { showMessage } from "@/src/utils/showMessage";
import { useRouter } from "expo-router";
import { Plus } from 'lucide-react-native';
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CreatePostSheet } from "../src/components/createPost";
import { HomeHeader } from "../src/components/homeHeader";
import { PostsList } from "../src/components/postList";
import { useAuth } from "../src/hooks/useAuth";
import { useCreatePost } from "../src/hooks/useCreatePost";
import {
  deletePostService,
  getPostsService,
  Post,
} from "../src/services/postService";
import { homeStyle as styles } from "../src/styles/homeStyle";

export default function HomeScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const [posts, setPosts] = useState<Post[]>([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }, []);

  async function loadPosts(pageToLoad: number, isRefresh = false) {
    try {
      if (pageToLoad === 1 && !isRefresh) {
        setLoadingInitial(true);
      }
      if (pageToLoad > 1) {
        setLoadingMore(true);
      }

      const data = await getPostsService({ page: pageToLoad, limit });

      setCount(data.count);

      if (pageToLoad === 1) {
        setPosts(data.posts);
      } else {
        setPosts((prev) => [...prev, ...data.posts]);
      }

      const totalLoaded =
        (pageToLoad === 1 ? 0 : posts.length) + data.posts.length;

      setHasMore(totalLoaded < data.count && data.posts.length > 0);
      setPage(pageToLoad);
    } catch (error: any) {
      console.log("Erro ao carregar posts:", error?.response?.data || error);
      showMessage("Erro ao carregar posts.");
    } finally {
      setLoadingInitial(false);
      setLoadingMore(false);
      setRefreshing(false);
    }
  }

  async function handleDeletePost(postId: number) {
    const confirm =
      Platform.OS === "web"
        ? window.confirm("Tem certeza que deseja excluir este post?")
        : await new Promise<boolean>((resolve) => {
          Alert.alert(
            "Excluir post",
            "Tem certeza que deseja excluir este post?",
            [
              { text: "Cancelar", style: "cancel", onPress: () => resolve(false) },
              { text: "Excluir", style: "destructive", onPress: () => resolve(true) },
            ]
          );
        });

    if (!confirm) return;

    try {
      setDeletingId(postId);
      await deletePostService(postId);

      setPosts((prev) => prev.filter((p) => p.id !== postId));
      setCount((prev) => Math.max(prev - 1, 0));
      showMessage("Post excluído com sucesso.", "success");

    } catch (error: any) {
      showMessage(`Erro ao excluir post. ${error?.response?.data}`);
    } finally {
      setDeletingId(null);
    }
  }

  useEffect(() => {
    loadPosts(1);
  }, []);

  function handleLoadMore() {
    if (loadingMore || loadingInitial || !hasMore) return;
    loadPosts(page + 1);
  }

  function handleRefresh() {
    setRefreshing(true);
    setHasMore(true);
    loadPosts(1, true);
  }

  function handleGoToUsers() {
    setMenuOpen(false);
    router.push("/users");
  }

  function handleGoToProfile() {
    setMenuOpen(false);
    router.push("/profile");
  }

  async function handleLogout() {
    try {
      setLoading(true);
      await logout();
      setTimeout(() => {
        router.replace("/");
      }, 800);
    } catch (error) {
      console.log("Erro no logout:", error);
      if (Platform.OS === "web") {
        window.alert("Erro ao sair.");
      } else {
        Alert.alert("Erro", "Erro ao sair.");
      }
      setLoading(false);
    }
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
    onCreated: () => loadPosts(1, true),
  });

  if (loadingInitial) {
    return (
      <View style={styles.initialLoadingContainer}>
        <ActivityIndicator size="large" />
        <Text style={styles.initialLoadingText}>Carregando posts...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HomeHeader
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((prev) => !prev)}
        onGoToUsers={handleGoToUsers}
        onGoToProfile={handleGoToProfile}
        onLogout={handleLogout}
      />

      <PostsList
        posts={posts}
        count={count}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        onLoadMore={handleLoadMore}
        loadingMore={loadingMore}
        formatDate={formatDate}
        userId={user?.id}
        onDelete={handleDeletePost}
        deletingId={deletingId}

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
      {loading && (
        <View style={styles.logoutOverlay}>
          <ActivityIndicator size="large" />
          <Text style={styles.logoutText}>Saindo...</Text>
        </View>
      )}
    </View>
  );
}
