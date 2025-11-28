import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Post } from "../services/postService";
import { homeStyle as styles } from "../styles/homeStyle";


interface PostsListProps {
  posts: Post[];
  count: number;
  refreshing: boolean;
  onRefresh: () => void;
  onLoadMore: () => void;
  loadingMore: boolean;
  formatDate: (dateString: string) => string;
  title?: string;
  userId?: number;
  onDelete?: (id: number) => void;
  deletingId?: number | null;
}

export function PostsList({
  posts,
  count,
  refreshing,
  onRefresh,
  onLoadMore,
  loadingMore,
  formatDate,
  title = "Posts",
  userId,
  onDelete,
  deletingId,
}: PostsListProps) {
  const renderItem = ({ item }: { item: Post }) => {
    const isOwner = userId !== undefined && item.authorId === userId;
    const isDeleting = deletingId === item.id;

    return (
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

        <View style={styles.cardFooter}>
          <Text style={styles.cardMeta}>
            {item.author?.name} — {formatDate(item.createdAt)}
          </Text>

          {isOwner && onDelete && (
            <TouchableOpacity
              onPress={() => onDelete(item.id)}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <ActivityIndicator size="small" />
              ) : (
                <Text style={styles.deleteIcon}>🗑️</Text>
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const renderFooter = () =>
    loadingMore ? (
      <View style={styles.footerLoading}>
        <ActivityIndicator />
      </View>
    ) : null;

  if (posts.length === 0) {
    return (
      <>
        <Text style={styles.title}>
          {title} ({count})
        </Text>
        <Text style={styles.emptyText}>Nenhum post encontrado.</Text>
      </>
    );
  }

  return (
    <>
      <Text style={styles.title}>
        {title} ({count})
      </Text>

      <FlatList
        data={posts}
        keyExtractor={(item, index) =>
          item.id ? String(item.id) : `post-${index}`
        }
        contentContainerStyle={styles.listContent}
        renderItem={renderItem}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.2}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </>
  );
}
