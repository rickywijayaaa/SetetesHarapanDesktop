import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function Voucher() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: "#8E1616" }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
                  <FontAwesome name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={{ flex: 1, textAlign: "center", color: "#fff", fontSize: 22, fontWeight: "bold" }}>
          Voucher
        </Text>
      </View>

      {/* Content */}
      <View style={styles.card}>
        <View style={styles.barIndicator} />

        <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30 }}>
          <Text style={styles.title}>Voucher Potongan Harga</Text>

          {/* Voucher image and info */}
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

          {/* Terms */}
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

          {/* Rights */}
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

          {/* Button */}
          <TouchableOpacity style={styles.button}>
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
  profile: {
    width: 35,
    height: 35,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#fff",
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
