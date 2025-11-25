import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
  RefreshControl,
  Text,
  View,
} from "react-native";
import { getPostsService, Post } from "../src/services/postService";
import { homeStyle as styles } from "../src/styles/homeStyle";

export default function HomeScreen() {
  const router = useRouter();

  const [posts, setPosts] = useState<Post[]>([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(5); 
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);

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
        // primeira página ou reload
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
      if (Platform.OS === "web") {
        window.alert("Erro ao carregar posts.");
      }
    } finally {
      setLoadingInitial(false);
      setLoadingMore(false);
      setRefreshing(false);
    }
  }

  // Carregar primeira página
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

  const renderItem = ({ item }: { item: Post }) => (
    <View style={styles.card}>
      {item.imageId && (
        <Image
          source={{ uri: item.imageId }}
          style={styles.cardImage}
          resizeMode="cover"
        />
      )}

      <Text style={styles.cardTitle}>{item.title}</Text>

      {item.content ? (
        <Text style={styles.cardContent}>{item.content}</Text>
      ) : null}

      <Text style={styles.cardMeta}>
        {item.author?.name} — {formatDate(item.createdAt)}
      </Text>
    </View>
  );

  const renderFooter = () =>
    loadingMore ? (
      <View style={styles.footerLoading}>
        <ActivityIndicator />
      </View>
    ) : null;

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
      <Text style={styles.title}>Posts ({count})</Text>

      {posts.length === 0 ? (
        <Text style={styles.emptyText}>Nenhum post encontrado.</Text>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.listContent}
          renderItem={renderItem}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.2}
          ListFooterComponent={renderFooter}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
            />
          }
        />
      )}
    </View>
  );
}