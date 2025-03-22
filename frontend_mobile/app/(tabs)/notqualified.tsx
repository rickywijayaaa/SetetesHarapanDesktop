import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Qualified() {
  return (
    <LinearGradient colors={["#8E1616", "#FFFFFF"]} style={styles.container}>
      <View style={styles.content}>
        <Image source={require("../../assets/images/unqualified.png")} style={styles.checkmark} />

        {/* Pesan Kualifikasi */}
        <Text style={styles.title}>Maaf!</Text>
        <Text style={styles.subtitle}>Saat ini kamu belum memenuhi syarat untuk menjadi pendonor darah.</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  },
  content: {
    alignItems: "center",
  },
  checkmark: {
    width: 230,
    height: 230,
    marginBottom: 20,
    marginTop: -60,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000",
  },
  subtitle: {
    fontSize: 17,
    textAlign: "center",
    color: "#000",
    marginTop: 15,
  },
});
