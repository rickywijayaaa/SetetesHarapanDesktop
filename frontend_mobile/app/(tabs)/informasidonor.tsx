import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export default function DetailDonorEvent() {
  const router = useRouter();

  return (
    <ScrollView>
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <FontAwesome name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
        <View style={styles.contentContainer}>
          <Text style={styles.eventTitle}>Donor Bersama HMIF ITB</Text>
          <Image source={require("../../assets/images/donor_poster.png")} style={styles.poster} />
          <Text style={styles.eventDetail}><Text style={styles.bold}>Tempat:</Text> CC Timur ITB</Text>
          <Text style={styles.eventDetail}><Text style={styles.bold}>Tanggal:</Text> 15 September 2025</Text>
          <Text style={styles.eventDetail}><Text style={styles.bold}>Waktu:</Text> 07:30 - 10:30</Text>
          <Text style={styles.description}>
            Mari berpartisipasi dalam aksi kemanusiaan dengan mendonorkan darah! Kegiatan ini diadakan sebagai bentuk kepedulian terhadap sesama, di mana setiap tetes darah yang Anda sumbangkan dapat menyelamatkan nyawa.
          </Text>
          <Text style={styles.description}>
            Jangan lewatkan kesempatan untuk berbagi dan membantu mereka yang membutuhkan. Pastikan Anda dalam kondisi sehat dan memenuhi syarat untuk donor darah. Ayo datang dan jadilah bagian dari kebaikan ini!
          </Text>
          <Text style={styles.description}>Syarat Donor Darah:</Text>
          <Text style={styles.requirements}>- Usia 17-60 tahun</Text>
          <Text style={styles.requirements}>- Berat badan minimal 45kg</Text>
          <Text style={styles.requirements}>- Sehat jasmani dan rohani</Text>
          <Text style={styles.requirements}>- Tekanan darah normal</Text>
          <Text style={styles.requirements}>- Tidak sedang sakit</Text>
          <TouchableOpacity style={styles.button} onPress={() => router.push("/kuesioner")}>
            <Text style={styles.buttonText}>Daftar Donor Darah</Text>
          </TouchableOpacity>
        </View>
        </SafeAreaView>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8E1616",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    padding: 5,
    width: 40,
  },
  contentContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    margin: 20,
  },
  poster: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginBottom: 40,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#8E1616",
    textAlign: "center",
    marginBottom: 30,
    marginTop: 10,
  },
  eventDetail: {
    fontSize: 14,
    color: "#333",
    marginBottom: 15,
  },
  bold: {
    fontWeight: "bold",
  },
  description: {
    fontSize: 13,
    color: "#555",
    textAlign: "justify",
    marginBottom: 10,
    marginTop: 10,
    lineHeight: 20
  },
  requirements: {
    fontSize: 13,
    color: "#555",
    lineHeight: 20,
  },
  button: {
    backgroundColor: "#8E1616",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    margin: 0,
    marginTop: 40,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});