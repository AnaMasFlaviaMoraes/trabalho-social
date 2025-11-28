import { showMessage } from "@/src/utils/showMessage";
import { useRouter } from "expo-router";
import { CircleChevronLeft } from 'lucide-react-native';
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import {
  getUsersService,
  UserItem,
} from "../src/services/userService";
import { usersStyles as styles } from "../src/styles/userStyle";

export default function UsersScreen() {
  const router = useRouter();

  const [users, setUsers] = useState<UserItem[]>([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  async function loadUsers(pageToLoad: number, isRefresh = false) {
    try {
      if (pageToLoad === 1 && !isRefresh) {
        setLoadingInitial(true);
      }
      if (pageToLoad > 1) {
        setLoadingMore(true);
      }

      const data = await getUsersService({ page: pageToLoad, limit });
      setCount(data.count);

      if (pageToLoad === 1) {
        setUsers(data.users);
      } else {
        setUsers((prev) => [...prev, ...data.users]);
      }

      const totalLoaded =
        (pageToLoad === 1 ? 0 : users.length) + data.users.length;

      setHasMore(totalLoaded < data.count && data.users.length > 0);
      setPage(pageToLoad);
    } catch (error: any) {
      console.log("Erro ao carregar usuários:", error?.response?.data || error);
      showMessage("Erro ao carregar usuários.");
    } finally {
      setLoadingInitial(false);
      setLoadingMore(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadUsers(1);
  }, []);

  function handleLoadMore() {
    if (loadingMore || loadingInitial || !hasMore) return;
    loadUsers(page + 1);
  }

  function handleRefresh() {
    setRefreshing(true);
    setHasMore(true);
    loadUsers(1, true);
  }

  function handleBack() {
    router.back();
  }

  const renderItem = ({ item }: { item: UserItem }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.email}>{item.email}</Text>
      {item.role && <Text style={styles.role}>Papel: {item.role}</Text>}
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
        <Text style={styles.initialLoadingText}>Carregando usuários...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Usuários ({count})</Text>

        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <CircleChevronLeft />
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>

      {users.length === 0 ? (
        <Text style={styles.emptyText}>Nenhum usuário encontrado.</Text>
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item, index) =>
            item.id !== undefined && item.id !== null
              ? String(item.id)
              : item.email
                ? `email-${item.email}`
                : `index-${index}`
          }
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
