import React, { useEffect, useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { Stack, usePathname } from "expo-router";
import Navbar from "../../components/Navbar";
import SplashScreenComponent from "../../components/SplashScreen";
import * as SplashScreen from "expo-splash-screen";

if (Platform.OS !== "web") {
  SplashScreen.preventAutoHideAsync();
}

export default function TabsLayout() {
  const pathname = usePathname();
  const [isAppReady, setIsAppReady] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  // Daftar path yang akan menampilkan navbar
  const navbarPaths = [
    "/home",
    "/pencarian_stok",
    "/kegiatan_donor",
    "/pesan",
    "/rewardprofile",
  ];

  // Menentukan apakah navbar harus ditampilkan
  const shouldShowNavbar = navbarPaths.some((path) => pathname === path);

  useEffect(() => {
    const prepare = async () => {
      try {
        // Tunda splash selama 5 detik (atau sesuaikan sesuai durasi animasi Lottie)
        await new Promise((resolve) => setTimeout(resolve, 15000));
      } catch (e) {
        console.warn("Error saat prepare splash:", e);
      } finally {
        setShowSplash(false);
        setIsAppReady(true);
        if (Platform.OS !== "web") {
          await SplashScreen.hideAsync();
        }
      }
    };

    prepare();
  }, []);

  if (!isAppReady || showSplash) {
    return <SplashScreenComponent />;
  }

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
