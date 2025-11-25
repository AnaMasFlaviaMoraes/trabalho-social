import { StyleSheet } from "react-native";

export const homeStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
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
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  cardContent: {
    fontSize: 14,
    color: "#555",
  },
  cardImage: {
    width: "100%",
    height: 180,
    borderRadius: 8,
    marginBottom: 8,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 32,
    fontSize: 16,
    color: "#777",
  },
  cardMeta: {
  marginTop: 8,
  fontSize: 12,
  color: "#888",
  fontStyle: "italic",
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
