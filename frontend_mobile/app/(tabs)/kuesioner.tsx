import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from "react-native";
import { TextInput } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";


export default function RiwayatKesehatan() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
    q6: "",
    q7: "",
    q8: "",
    q9: "",
    q10: "",
    q11: "",
    q12: "",
    q13: "",
    q14: "",
  });

  const [confirmInfo, setConfirmInfo] = useState(false);
  const [privacyPolicy, setPrivacyPolicy] = useState(false);
  const [dataUser, setDataUser] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Header ikut scroll */}
      <ImageBackground
        source={require("../../assets/images/bgx.png")} // Ganti path sesuai file gambar
        style={styles.headerBackground}
        resizeMode="cover"
      >
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <FontAwesome name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Kuesioner Donor Darah</Text>
        <Text style={styles.headerSubtitle}>Cek kesehatanmu sebelum donor!</Text>
      </ImageBackground>

        {/* Pertanyaan */}
        {[
        { key: "q1", question: "Apakah Anda merasa sehat dan bugar hari ini?" },
        { key: "q2", question: "Apakah Anda sedang mengonsumsi antibiotik?" },
        { key: "q3", question: "Apakah Anda sering mengonsumsi alkohol dalam jumlah berlebihan?" },
        { key: "q4", question: "Apakah Anda pernah menggunakan narkoba dalam bentuk suntikan?" },
        { key: "q5", subtitle: "Dalam 48 jam terakhir", question: "Apakah Anda sedang mengonsumsi aspirin atau obat yang mengandung aspirin?" },
        { key: "q6", subtitle: "Dalam 1 minggu terakhir", question: "Apakah Anda mengalami sakit kepala dan demam secara bersamaan?"},
        { key: "q7", subtitle: "Dalam 6 minggu terakhir", question: "(Wanita) Apakah Anda sedang hamil?"},
        { key: "q8", question: "Apakah Anda pernah menjalani operasi besar?"},
        { key: "q9", subtitle: "Dalam 8 minggu terakhir", question: "Apakah Anda telah mendonorkan darah lengkap?"},
        { key: "q10", question: "Apakah Anda menerima vaksinasi atau suntikan lainnya?"},
        { key: "q11", question: "Apakah Anda pernah kontak dengan orang yang menerima vaksinasi smallpox?"},
        { key: "q12", subtitle: "Dalam 12 minggu terakhir", question: "Apakah Anda pernah menerima transfusi darah?"},
        { key: "q13", question: "Apakah Anda pernah melakukan tindik atau tato?"},
        { key: "q14", subtitle: "Dalam 16 minggu terakhir", question: "Apakah Anda telah mendonorkan 2 kantong sel darah merah melalui proses aferesis?"},
        ].map(({ key, subtitle, question }) => (
          
        <View key={key} style={styles.questionContainer}>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
            <Text style={styles.question}>{question}</Text>
            <View style={styles.buttonGroup}>
            <TouchableOpacity
                style={[styles.optionButton, formData[key] === "Iya" && styles.selectedButton]}
                onPress={() => handleChange(key, "Iya")}
            >
                <Text style={styles.optionText}>Iya</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.optionButton, formData[key] === "Tidak" && styles.selectedButton]}
                onPress={() => handleChange(key, "Tidak")}
            >
                <Text style={styles.optionText}>Tidak</Text>
            </TouchableOpacity>
            </View>
        </View>
        ))}

        <View style={styles.confirmContainer}>
            <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setConfirmInfo((prev) => !prev)}
            >
            {confirmInfo && <View style={styles.checkboxInner} />}
            </TouchableOpacity>
            <Text style={styles.termsText}>
            Saya menyatakan bahwa semua informasi yang saya berikan adalah benar
            </Text>
        </View>

        <View style={styles.privacyContainer}>
            <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setPrivacyPolicy((prev) => !prev)}
            >
            {privacyPolicy && <View style={styles.checkboxInner} />}
            </TouchableOpacity>
            <Text style={styles.termsText}>
            Saya menyetujui kebijakan privasi aplikasi ini
            </Text>
        </View>

        <View style={styles.dataContainer}>
            <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setDataUser((prev) => !prev)}
            >
            {dataUser && <View style={styles.checkboxInner} />}
            </TouchableOpacity>
            <Text style={styles.termsText}>
            Saya bersedia membagikan identitas saya kepada penerima donor.
            </Text>
        </View>


      <TouchableOpacity style={styles.button} onPress={() => router.push("/qualified")}>
        <Text style={styles.buttonText}>Simpan</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
scrollContainer: {
    paddingBottom: 20,
},
  headerBackground: {
    width: "100%",
    height: 250, // Tinggi header sesuai desain
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
    marginTop: 20,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "white",
    textAlign: "center",
  },
  backButton: {
    padding: 5,
    width: 40,
    marginRight: 300,
  },
  inputGroup: {
    padding: 20,
    marginBottom: -15,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 12,
    fontSize: 16,
  },
  questionContainer: {
    marginBottom: -15,
    padding: 20
  },
  question: {
    fontSize: 14,
    marginBottom: 15,
    textAlign: "justify",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#000",
  },  
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  optionButton: {
    backgroundColor: "#e0e0e0",
    padding: 10,
    borderRadius: 5,
    width: "45%",
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: "#8B0000",
  },
  optionText: {
    color: "#fff",
  },
  privacyContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    padding: 20,
    marginTop: -30,
  },
  confirmContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    marginTop: 10,
    padding: 20
  },
  dataContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    padding: 20,
    marginTop: -30,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxInner: {
    width: 16,
    height: 16,
    backgroundColor: "#8E1616",
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    textAlign: "justify",
  },
  button: {
    backgroundColor: "#8E1616",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 60,
    marginTop: -10,
    marginLeft: 20,
    marginRight: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

