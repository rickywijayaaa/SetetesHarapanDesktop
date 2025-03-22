import React from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function Profile() {
  return (
    <View style={{ flex: 1, backgroundColor: "#8E1616" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity>
            <FontAwesome name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profil</Text>
          <View style={{ width: 24 }} /> {/* dummy space untuk keseimbangan */}
        </View>


        {/* White Container */}
        <View style={styles.card}>
          {/* Profile Image */}
          <View style={styles.profilePicWrapper}>
            <Image
              source={require("../../assets/images/avatar1.png")}
              style={styles.profilePic}
            />
          </View>

          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.email}>john.doe@gmail.com</Text>

          {/* Form */}
          
          <View style={styles.form}>
            {[
              { label: "Nama Awal", placeholder: "John" },
              { label: "Nama Akhir", placeholder: "Doe" },
              { label: "Email", placeholder: "john.doe@gmail.com" },
              { label: "NIK", placeholder: "1234567890123456" },
              { label: "Tanggal Lahir", placeholder: "01/01/2001" },
              { label: "Nomor Telepon", placeholder: "081234567890" },
              { label: "Kota/Kabupaten", placeholder: "Kota Bandung" },
              { label: "Provinsi", placeholder: "Jawa Barat" },
            ].map((field, index) => (
              <View key={index} style={styles.inputGroup}>
                <Text style={styles.label}>{field.label}</Text>
                <TextInput
                  placeholder={field.placeholder}
                  style={styles.input}
                  placeholderTextColor="#aaa"
                />
              </View>
            ))}
          </View>

          {/* Buttons */}
          <TouchableOpacity style={styles.updateButton}>
            <Text style={styles.updateButtonText}>Ubah Profil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Keluar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    justifyContent: "space-between",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    marginTop: 80,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 50,
  },
  profilePicWrapper: {
    alignSelf: "center",
    marginTop: -80,
    backgroundColor: "#fff",
    borderRadius: 70,
    padding: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  email: {
    textAlign: "center",
    fontSize: 14,
    color: "#777",
    marginBottom: 20,
  },
  form: {
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
  },
  updateButton: {
    borderWidth: 1,
    borderColor: "#8E1616",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#fff",
    shadowColor: "#8E1616",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  updateButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#8E1616",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
