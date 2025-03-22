import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require("../../assets/images/logo.png")} style={styles.logo} />
      
      {/* Title */}
      <Text style={styles.title}>SetetesHarapan</Text>

      {/* Info Box */}
      <View style={styles.infoBox}>
        <Text style={styles.heading}>Setetes Darah, Sejuta Harapan!</Text>
        <Text style={styles.description}>
          Satu aksi kecil bisa memberi harapan besar. Yuk, jadi pendonor untuk bantu mereka yang membutuhkan!
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => router.push("/login")}>
          <Text style={styles.buttonText}>Donor Sekarang</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 200, // 50% dari lebar layar
    height: 200, // 25% dari tinggi layar
    resizeMode: "contain",
    marginTop: 120
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#8E1616",
    marginTop: 30,
    textAlign: "center",
  },
  infoBox: {
    backgroundColor: "#8E1616",
    borderRadius: 30,
    padding: 20,
    marginTop: 50,
    width: "120%", // 90% dari layar agar fleksibel
    maxWidth: 405, // Maksimal 400px agar tidak terlalu besar di layar lebar
    alignItems: "center",
    height: "50%"
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginTop: 70
  },
  description: {
    fontSize: 15,
    color: "#fff",
    textAlign: "center",
    marginVertical: 10,
    marginTop: 40
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 13,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 40,
  },
  buttonText: {
    color: "#8E1616",
    fontWeight: "bold",
    fontSize: 16,
  },
});
