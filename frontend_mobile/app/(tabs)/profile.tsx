import React, { useState } from "react";
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
import { useRouter } from "expo-router";
import API from "../../constants/api";

export default function Profile() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone_number: "",
    address: "",
    city: "",
    province: "",
    role: "user",
  });

  const handleUpdateProfile = async () => {
    try {
      const iduser = 1; // Ganti sesuai user login
      const response = await API.put(`/user/profile/${iduser}`, form);
      alert("Profil berhasil diperbarui!");
    } catch (error) {
      console.error(error);
      alert("Gagal memperbarui profil");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#8E1616" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <FontAwesome name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profil</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.card}>
          <View style={styles.profilePicWrapper}>
            <Image
              source={require("../../assets/images/avatar1.png")}
              style={styles.profilePic}
            />
          </View>

          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.email}>john.doe@gmail.com</Text>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nama</Text>
              <TextInput
                placeholder="John Doe"
                style={styles.input}
                placeholderTextColor="#aaa"
                value={form.name}
                onChangeText={(text) => setForm({ ...form, name: text })}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                placeholder="john.doe@gmail.com"
                style={styles.input}
                placeholderTextColor="#aaa"
                value={form.email}
                onChangeText={(text) => setForm({ ...form, email: text })}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nomor Telepon</Text>
              <TextInput
                placeholder="081234567890"
                style={styles.input}
                placeholderTextColor="#aaa"
                value={form.phone_number}
                onChangeText={(text) => setForm({ ...form, phone_number: text })}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Alamat</Text>
              <TextInput
                placeholder="Jl. Merdeka No. 123"
                style={styles.input}
                placeholderTextColor="#aaa"
                value={form.address}
                onChangeText={(text) => setForm({ ...form, address: text })}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Kota/Kabupaten</Text>
              <TextInput
                placeholder="Kota Bandung"
                style={styles.input}
                placeholderTextColor="#aaa"
                value={form.city}
                onChangeText={(text) => setForm({ ...form, city: text })}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Provinsi</Text>
              <TextInput
                placeholder="Jawa Barat"
                style={styles.input}
                placeholderTextColor="#aaa"
                value={form.province}
                onChangeText={(text) => setForm({ ...form, province: text })}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.updateButton} onPress={handleUpdateProfile}>
            <Text style={styles.updateButtonText}>Ubah Profil</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => router.replace("/index")}
          >
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
    paddingTop: 60,
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