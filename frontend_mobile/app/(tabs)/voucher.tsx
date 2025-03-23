import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

export default function Voucher() {
  const router = useRouter();
  const [points, setPoints] = useState(0);
  const [iduser, setIduser] = useState<number | null>(null);

  useEffect(() => {
    const fetchUserPoints = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const res = await fetch("https://backend-setetesharapandesktop.up.railway.app/users/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        const data = await res.json();
        if (res.ok) {
          setPoints(data.total_points || 0);
          setIduser(data.iduser || null);
        } else {
          console.warn("Gagal fetch user:", data);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchUserPoints();
  }, []);

  const handleClaimVoucher = async () => {
    if (points < 50) {
      Alert.alert("Gagal", "Poin kamu tidak cukup untuk klaim voucher.");
      return;
    }

    try {
      const newPoints = points - 50;
      const token = await AsyncStorage.getItem("token");

      const res = await fetch(`https://backend-setetesharapandesktop.up.railway.app/api/user/points/${iduser}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ total_points: newPoints }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Gagal update:", data);
        Alert.alert("Gagal", "Terjadi kesalahan saat klaim voucher.");
        return;
      }

      setPoints(newPoints); // update state lokal juga
      Alert.alert("Berhasil", "Kamu berhasil claim voucher dan total points berkurang sebanyak 50!");
    } catch (err) {
      console.error("Claim error:", err);
      Alert.alert("Gagal", "Terjadi kesalahan saat klaim voucher.");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#8E1616" }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={{ flex: 1, textAlign: "center", color: "#fff", fontSize: 22, fontWeight: "bold" }}>
          Voucher
        </Text>
      </View>

      <View style={styles.card}>
        <View style={styles.barIndicator} />

        <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30 }}>
          <Text style={styles.title}>Voucher Potongan Harga</Text>

          <View style={styles.voucherInfo}>
            <Image
              source={require("../../assets/images/voucher.png")}
              style={styles.voucherImage}
              resizeMode="contain"
            />
            <View style={{ flex: 1, marginLeft: 15 }}>
              <Text style={styles.bold}>Masa Berlaku:</Text>
              <Text style={styles.normal}>15 September 2025</Text>
              <Text style={[styles.bold, { marginTop: 10 }]}>Nominal:</Text>
              <Text style={styles.normal}>Potongan Rp 25.000,-</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Ketentuan Lain:</Text>
          {[
            "Voucher hanya dapat digunakan 1 kali per transaksi.",
            "Tidak dapat digabungkan dengan promo atau diskon lainnya.",
            "Tidak dapat ditukar dengan uang tunai atau produk lainnya.",
            "Jika transaksi dibatalkan, voucher tidak dapat digunakan kembali.",
            "Hanya berlaku di platform atau toko resmi yang bekerja sama dengan Nestlé Health Science.",
          ].map((item, index) => (
            <View key={index} style={styles.bulletItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>{item}</Text>
            </View>
          ))}

          <Text style={styles.sectionTitle}>Hak Penyelenggara:</Text>
          {[
            "Nestlé Health Science berhak mengubah atau menghentikan promo tanpa pemberitahuan sebelumnya.",
            "Jika ditemukan penyalahgunaan, pihak penyelenggara berhak membatalkan transaksi atau menonaktifkan voucher.",
          ].map((item, index) => (
            <View key={index} style={styles.bulletItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>{item}</Text>
            </View>
          ))}

          <TouchableOpacity style={styles.button} onPress={handleClaimVoucher}>
            <Text style={styles.buttonText}>Pilih Voucher</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 100,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 50,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  barIndicator: {
    width: 60,
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 3,
    alignSelf: "center",
    marginVertical: 10,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#8E1616",
    marginBottom: 20,
    marginTop: 30,
  },
  voucherInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  voucherImage: {
    width: width * 0.4,
    height: 120,
    borderRadius: 10,
  },
  bold: {
    fontWeight: "bold",
    color: "#000",
  },
  normal: {
    color: "#333",
    fontSize: 14,
    marginTop: 2,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000",
    marginTop: 10,
    marginBottom: 10,
  },
  bulletItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  bullet: {
    marginRight: 8,
    fontSize: 16,
    color: "#000",
  },
  bulletText: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
  button: {
    marginTop: 30,
    backgroundColor: "#8E1616",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
