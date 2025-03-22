import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function KetersediaanDonor() {
  const router = useRouter();
  const [tanggal, setTanggal] = useState("");
  const [waktu, setWaktu] = useState("");

  const handleSubmit = () => {
    router.push("/home"); // Navigasi ke halaman home
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.headerTitle}>Ketersediaan Donor</Text>

      {/* Subheader */}
      <Text style={styles.subheader}>
        Silakan tentukan jadwal kedatanganmu untuk donor darah di rumah sakit.
      </Text>

      {/* Form Container */}
      <View style={styles.formContainer}>
        {/* Tanggal Kedatangan */}
        <Text style={styles.inputLabel}>Tanggal Kedatangan</Text>
        <TouchableOpacity style={styles.inputField}>
          <View style={styles.inputContent}>
            <Text style={styles.inputPlaceholder}>Pilih Tanggal</Text>
          </View>
        </TouchableOpacity>

        {/* Waktu Kedatangan */}
        <Text style={styles.inputLabel}>Waktu Kedatangan</Text>
        <TouchableOpacity style={styles.inputField}>
          <View style={styles.inputContent}>
            <Text style={styles.inputPlaceholder}>Pilih Waktu</Text>
          </View>
        </TouchableOpacity>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={() => router.push("/home")}>
          <Text style={styles.submitButtonText}>Kirim</Text>
        </TouchableOpacity>

      </View>

      {/* Bottom Illustrations */}
      <View style={styles.illustrationsContainer}>
        <Image
          source={require("../../assets/images/Vaccine.png")}
          style={styles.vaccineImage}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8E1616",
    paddingHorizontal: 20,
    paddingTop: 35,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 60,
    textAlign: "center",
    marginBottom: 20,
  },
  subheader: {
    fontSize: 14,
    color: "#fff",
    marginTop: 10,
    marginBottom: 40,
    lineHeight: 24,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    width: "100%",
    marginTop: 10,
    alignItems: "flex-start",
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginTop: 10,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  inputField: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    width: "100%",
  },
  inputContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputPlaceholder: {
    color: "#999",
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#8E1616",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    width: "100%",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  illustrationsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    width: "100%",
  },
  vaccineImage: {
    width: 350,
    height: 350,
    resizeMode: "contain",
    marginBottom: -10,
    marginRight: -50,
  },
});
