import { Menu } from 'lucide-react-native';
import React from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { homeStyle as styles } from "../styles/homeStyle";

interface HomeHeaderProps {
  menuOpen: boolean;
  onToggleMenu: () => void;
  onGoToUsers: () => void;
  onGoToProfile: () => void;
  onLogout: () => void;
}

export function HomeHeader({
  menuOpen,
  onToggleMenu,
  onGoToUsers,
  onGoToProfile,
  onLogout

}: HomeHeaderProps) {
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>FEED </Text>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={onToggleMenu}
        >
          <Menu />
        </TouchableOpacity>
      </View>

      {menuOpen && (
        <Pressable
          style={styles.menuOverlay}
          onPress={onToggleMenu}
        />
      )}

      {menuOpen && (
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={onGoToUsers}>
            <Text style={styles.menuItemText}>Listar usuários</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={onGoToProfile}>
            <Text style={styles.menuItemText}>Meu perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={onLogout}>
            <Text style={styles.menuItemText}>Sair</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}
