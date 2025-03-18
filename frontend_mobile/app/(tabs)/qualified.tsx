import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Qualified() {
  return (
    <LinearGradient colors={["#A41E1E", "#FFFFFF"]} style={styles.container}>
      <View style={styles.content}>
        {/* Ikon Centang */}
        <Image source={require("../../assets/images/logo.png")} style={styles.checkmark} />

        {/* Pesan Kualifikasi */}
        <Text style={styles.title}>Selamat!</Text>
        <Text style={styles.subtitle}>Kamu memenuhi syarat untuk menjadi pendonor darah.</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
  },
  checkmark: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#000",
    marginTop: 5,
  },
});
