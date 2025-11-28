import { StyleSheet } from "react-native";

export const usersStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    backgroundColor: "#F5DBD8",
  },
  header: {
    width: "100%",
    backgroundColor: "#df93c6ff",
    paddingVertical: 14,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    borderBottomWidth: 2,
    borderBottomColor: "#d1c7c7",

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },

    elevation: 3,
    marginBottom: 24
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  backButton: {
    marginTop: 36,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
  },
  backButtonText: {
    marginLeft: 6,
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  listContent: {
    paddingBottom: 24,
  },
  card: {
    borderWidth: 1,
    borderColor: "#7a7676ff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#fff",
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
