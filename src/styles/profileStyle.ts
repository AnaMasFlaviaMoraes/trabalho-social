import { StyleSheet } from "react-native";

export const profileStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    backgroundColor: "#F5DBD8",
  },
  profileCard: {
    backgroundColor: "#df93c6ff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },

  profileHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
  },

  userInfoBox: {
    marginTop: 8,
  },

  userInfoLabel: {
    fontSize: 13,
    color: "#777",
  },

  userInfoValue: {
    fontSize: 15,
    color: "#333",
    fontWeight: "500",
  },

  backButton: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
  },

  backButtonText: {
    marginLeft: 6,
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },

  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    marginTop: 8,
    fontSize: 14,
    color: "#555",
  },
  userInfoText: {
    fontSize: 16,
    marginBottom: 4,
    color: "#333",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    marginTop: 8,
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
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  cardContent: {
    fontSize: 14,
    color: "#555",
  },
  cardMeta: {
    marginTop: 8,
    fontSize: 12,
    color: "#888",
    fontStyle: "italic",
  },
  emptyText: {
    marginTop: 8,
    fontSize: 14,
    color: "#777",
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#df93c6ff",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  fabText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 4,
  },
  sheetOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  sheetContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  sheetContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: -2 },
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  sheetInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  sheetButton: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  sheetButtonText: {
    textAlign: "center",
  },
  sheetCreateButton: {
    backgroundColor: "#1E88E5",
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  sheetCreateButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
