import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile() {
  const router = useRouter();
  const [iduser, setIduser] = useState<number | null>(null);
  const [userData, setUserData] = useState({ name: "", email: "" });

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone_number: "",
    address: "",
    city: "",
    province: "",
    role: "user",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await fetch("https://backend-setetesharapandesktop.up.railway.app/users/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setUserData({ name: data.username || data.name, email: data.email });
          setForm({
            name: data.username || data.name,
            email: data.email,
            phone_number: data.phone_number || "",
            address: data.address || "",
            city: data.city || "",
            province: data.province || "",
            role: data.role || "user",
          });
          setIduser(data.iduser);
        } else {
          console.warn("Gagal mengambil data user:", data);
        }
      } catch (error) {
        console.error("Error fetch user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      if (!iduser) {
        alert("ID user tidak ditemukan.");
        return;
      }

      const token = await AsyncStorage.getItem("token");
      const response = await fetch(`https://backend-setetesharapandesktop.up.railway.app/api/user/profile/${iduser}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Update error:", errorData);
        Alert.alert("Gagal", "Gagal memperbarui profil.");
        return;
      }

      Alert.alert("Berhasil", "Profil berhasil diperbarui!");
    } catch (error) {
      console.error("Error saat update profil:", error);
      Alert.alert("Error", "Terjadi kesalahan saat memperbarui profil.");
    }
  };

  const handleLogout = async () => {
    try {
      // Hapus token dari AsyncStorage
      await AsyncStorage.removeItem("token");
      
      // Log untuk debugging
      console.log("Token berhasil dihapus, melakukan navigasi ke halaman index");
      
      // Navigasi ke halaman utama
      // Coba salah satu dari opsi berikut, tergantung struktur router Anda
      router.replace("/");
      // Jika opsi di atas tidak berfungsi, coba opsi berikut:
      // router.replace("index");
      // router.replace("/(app)");
      // router.replace("/(auth)");
    } catch (error) {
      console.error("Error saat logout:", error);
      Alert.alert("Error", "Terjadi kesalahan saat keluar dari aplikasi.");
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

          <Text style={styles.name}>{userData.name}</Text>
          <Text style={styles.email}>{userData.email}</Text>

          <View style={styles.form}>
            {["name", "email", "phone_number", "address", "city", "province"].map((field) => (
              <View style={styles.inputGroup} key={field}>
                <Text style={styles.label}>
                  {field === "name"
                    ? "Nama"
                    : field === "email"
                    ? "Email"
                    : field === "phone_number"
                    ? "Nomor Telepon"
                    : field === "address"
                    ? "Alamat"
                    : field === "city"
                    ? "Kota/Kabupaten"
                    : "Provinsi"}
                </Text>
                <TextInput
                  placeholder={`Masukkan ${field}`}
                  style={styles.input}
                  placeholderTextColor="#aaa"
                  value={(form as any)[field]}
                  onChangeText={(text) => setForm({ ...form, [field]: text })}
                />
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.updateButton} onPress={handleUpdateProfile}>
            <Text style={styles.updateButtonText}>Ubah Profil</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
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