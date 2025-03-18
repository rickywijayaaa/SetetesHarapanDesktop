import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from "react-native";
import { TextInput } from "react-native";
import { useRouter } from "expo-router";

export default function RiwayatKesehatan() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    gender: "",
    bloodType: "",
    rhesus: "",
    chronicDisease: "",
    anemia: "",
    hivHepatitis: "",
  });

  const [confirmInfo, setConfirmInfo] = useState(false);
  const [privacyPolicy, setPrivacyPolicy] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Header ikut scroll */}
      <ImageBackground
        source={require("../../assets/images/bg.png")} // Ganti path sesuai file gambar
        style={styles.headerBackground}
        resizeMode="cover"
      >
        <Text style={styles.headerTitle}>Riwayat Kesehatan</Text>
        <Text style={styles.headerSubtitle}>Isi riwayat kesehatan sesuai kondisimu!</Text>
      </ImageBackground>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Jenis Kelamin</Text>
        <TextInput
        style={styles.input}
        placeholder="Laki-laki"
        placeholderTextColor="#888"
        value={formData.gender}
        onChangeText={(text) => handleChange("gender", text)}
        />
        </View>

        <View style={styles.inputGroup}>
        <Text style={styles.label}>Golongan Darah</Text>
        <TextInput
        style={styles.input}
        placeholder="A"
        placeholderTextColor="#888"
        value={formData.bloodType}
        onChangeText={(text) => handleChange("bloodType", text)}
        />
        </View>

        <View style={styles.inputGroup}>
        <Text style={styles.label}>Rhesus</Text>
        <TextInput
        style={styles.input}
        placeholder="+"
        placeholderTextColor="#888"
        value={formData.rhesus}
        onChangeText={(text) => handleChange("rhesus", text)}
        />
        </View>

        {/* Pertanyaan */}
        {[
          { key: "chronicDisease", question: "Apakah Anda memiliki penyakit kronis seperti jantung, diabetes, hipertensi, atau gangguan darah?" },
          { key: "anemia", question: "Apakah Anda pernah mengalami anemia atau kekurangan hemoglobin?" },
          { key: "hivHepatitis", question: "Apakah Anda pernah terdiagnosis HIV/AIDS, hepatitis B/C, atau sifilis?" },
        ].map(({ key, question }) => (
          <View key={key} style={styles.questionContainer}>
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


      <TouchableOpacity style={styles.button} onPress={() => router.push("/home")}>
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
  },
  headerSubtitle: {
    fontSize: 14,
    color: "white",
    textAlign: "center",
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

