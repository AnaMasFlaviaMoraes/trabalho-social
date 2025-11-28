import { StyleSheet } from "react-native";

export const usersStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  backButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  backButtonText: {
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 24,
  },
  card: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: "#555",
  },
  role: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 32,
    fontSize: 16,
    color: "#777",
  },
  footerLoading: {
    paddingVertical: 16,
  },
  initialLoadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  initialLoadingText: {
    marginTop: 8,
    fontSize: 14,
    color: "#555",
  },
});
