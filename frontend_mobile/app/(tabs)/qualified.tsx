import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

export default function Qualified() {
  return (
    <TouchableOpacity style={{ flex: 1 }} onPress={() => router.push("/ketersediaan_donor")}>
      <LinearGradient colors={["#8E1616", "#FFFFFF"]} style={styles.container}>
        <View style={styles.content}>
          <Image source={require("../../assets/images/qualified.png")} style={styles.checkmark} />

          <Text style={styles.title}>Selamat!</Text>
          <Text style={styles.subtitle}>Kamu memenuhi syarat untuk menjadi pendonor darah.</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  content: {
    alignItems: "center",
  },
  checkmark: {
    width: 230,
    height: 230,
    marginBottom: 20,
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
