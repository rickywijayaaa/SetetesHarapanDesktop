// (tabs)/_layout.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { Stack, usePathname } from "expo-router";
import Navbar from "../../components/Navbar";

export default function TabsLayout() {
  const pathname = usePathname();

  // Array of paths where navbar should be shown
  const navbarPaths = [
    "/home",
    "/pencarian_stok",
    "/kegiatan_donor",
    "/pesan",
    "/profile",
  ];

  // Check if the current path is one where navbar should be shown
  const shouldShowNavbar = navbarPaths.some((path) => pathname === path);

  return (
    <View style={styles.container}>
      <Stack screenOptions={{ headerShown: false }} />
      {shouldShowNavbar && <Navbar />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
