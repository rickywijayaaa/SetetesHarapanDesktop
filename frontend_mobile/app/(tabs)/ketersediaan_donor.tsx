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
            {/* <Image
              source={require("../../assets/images/calendar-icon.png")}
              style={styles.inputIcon}
            /> */}
            <Text style={styles.inputPlaceholder}>Pilih Tanggal</Text>
          </View>
        </TouchableOpacity>

        {/* Waktu Kedatangan */}
        <Text style={styles.inputLabel}>Waktu Kedatangan</Text>
        <TouchableOpacity style={styles.inputField}>
          <View style={styles.inputContent}>
            {/* <Image
              source={require("../../assets/images/clock-icon.png")}
              style={styles.inputIcon}
            /> */}
            <Text style={styles.inputPlaceholder}>Pilih Waktu</Text>
          </View>
        </TouchableOpacity>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton}>
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
    alignItems: "center", // Center content horizontally
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 20,
    textAlign: "center", // Center text
  },
  subheader: {
    fontSize: 16,
    color: "#fff",
    marginTop: 10,
    marginBottom: 30,
    lineHeight: 24,
    textAlign: "center", // Center text
    paddingHorizontal: 20,
  },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    width: "100%",
    marginTop: 10,
    alignItems: "flex-start", // Align form items to the left inside the container
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginTop: 10,
    marginBottom: 10,
    alignSelf: "flex-start", // Align label to the left
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
  inputIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    tintColor: "#999",
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
    width: "100%", // Make button full width
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center", // Center text
  },
  illustrationsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end", // Align to the right
    alignItems: "flex-end",
    width: "100%",
  },
  vaccineImage: {
    width: 350, // Increased size
    height: 350, // Increased size
    resizeMode: "contain",
    marginBottom: -10,
    marginRight:-50,
  },
});
