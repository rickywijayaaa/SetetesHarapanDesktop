import React from "react";
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profil</Text>
      </View>

      {/* Profile Picture */}
      <View style={styles.profileContainer}>
        <Image source={{ uri: "https://via.placeholder.com/100" }} style={styles.profileImage} />
        <Text style={styles.profileName}>John Doe</Text>
        <Text style={styles.profileEmail}>john.doe@gmail.com</Text>
      </View>

      {/* Form Fields */}
      <View style={styles.formContainer}>
        <TextInput style={styles.input} value="John" editable={false} placeholder="Nama Awal" />
        <TextInput style={styles.input} value="Doe" editable={false} placeholder="Nama Akhir" />
        <TextInput style={styles.input} value="john.doe@gmail.com" editable={false} placeholder="Email" />
        <TextInput style={styles.input} value="3602041211870001" editable={false} placeholder="NIK" />
        <TextInput style={styles.input} value="23/08/2003" editable={false} placeholder="Tanggal Lahir" />
        <TextInput style={styles.input} value="081122334455" editable={false} placeholder="Nomor Telepon" />
        <TextInput style={styles.input} value="Kota Bandung" editable={false} placeholder="Kota/Kabupaten" />
        <TextInput style={styles.input} value="Jawa Barat" editable={false} placeholder="Provinsi" />
      </View>

      {/* Buttons */}
      <TouchableOpacity style={styles.updateButton}>
        <Text style={styles.updateButtonText}>Ubah Profil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Keluar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingBottom: 20,
  },
  header: {
    width: "100%",
    backgroundColor: "#8E1616",
    paddingTop: 50,
    paddingBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: 20,
    top: 50,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  profileContainer: {
    alignItems: "center",
    marginTop: -50,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "white",
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  profileEmail: {
    fontSize: 14,
    color: "gray",
  },
  formContainer: {
    width: "90%",
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#8E1616",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: "#F8F8F8",
  },
  updateButton: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#8E1616",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 10,
    alignSelf: "center",
    width: "90%",
    alignItems: "center",
  },
  updateButtonText: {
    color: "#8E1616",
    fontWeight: "bold",
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: "#8E1616",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 10,
    alignSelf: "center",
    width: "90%",
    alignItems: "center",
  },
  logoutButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
