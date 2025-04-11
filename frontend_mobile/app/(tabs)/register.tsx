import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    nik: "",
    birthdate: "",
    phoneNumber: "",
    city: "",
    province: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmInfo, setConfirmInfo] = useState(false);
  const [hasReferral, setHasReferral] = useState(false);
  const [referralCode, setReferralCode] = useState("");

  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidView}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>Daftar</Text>
          <Text style={styles.subtitle}>Bergabunglah dengan SetetesHarapan</Text>

          {/* Input Fields */}
          {[
            { label: "Nama Awal", placeholder: "John", field: "firstName" },
            { label: "Nama Akhir", placeholder: "Doe", field: "lastName" },
            { label: "Email", placeholder: "john.doe@gmail.com", field: "email" },
            { label: "NIK", placeholder: "3602041211870001", field: "nik" },
            { label: "Tanggal Lahir", placeholder: "23/08/2003", field: "birthdate" },
            { label: "Nomor Telepon", placeholder: "081122334455", field: "phoneNumber" },
            { label: "Kota/Kabupaten", placeholder: "Kota Bandung", field: "city" },
            { label: "Provinsi", placeholder: "Jawa Barat", field: "province" },
          ].map(({ label, placeholder, field }) => (
            <View key={field} style={styles.inputGroup}>
              <Text style={styles.label}>{label}</Text>
              <TextInput
                style={styles.input}
                placeholder={placeholder}
                value={(formData as any)[field]}
                onChangeText={(text) => handleChange(field, text)}
              />
            </View>
          ))}

          {/* Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="••••••••••••••••••••••"
                secureTextEntry={!showPassword}
                value={formData.password}
                onChangeText={(text) => handleChange("password", text)}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons name={showPassword ? "eye" : "eye-off"} size={24} color="#888" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="••••••••••••••••••••••"
                secureTextEntry={!showConfirmPassword}
                value={formData.password}
                onChangeText={(text) => handleChange("password", text)}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Ionicons name={showConfirmPassword ? "eye" : "eye-off"} size={24} color="#888" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Referral Code */}
          <View style={styles.inputGroup}>
            <TouchableOpacity style={styles.checkboxRow} onPress={() => setHasReferral(!hasReferral)}>
              <View style={styles.checkbox}>{hasReferral && <View style={styles.checkboxInner} />}</View>
              <Text style={styles.label}>Saya punya kode referral</Text>
            </TouchableOpacity>
            {hasReferral && (
              <TextInput
                style={[styles.input, { marginTop: 10 }]}
                placeholder="Masukkan kode referral"
                value={referralCode}
                onChangeText={setReferralCode}
              />
            )}
          </View>

          {/* Confirmation Checkbox */}
          <View style={styles.confirmContainer}>
            <TouchableOpacity style={styles.checkbox} onPress={() => setConfirmInfo((prev) => !prev)}>
              {confirmInfo && <View style={styles.checkboxInner} />}
            </TouchableOpacity>
            <Text style={styles.termsText}>
              Saya menyatakan bahwa semua informasi yang saya berikan adalah benar
            </Text>
          </View>

          {/* Button */}
          <TouchableOpacity style={styles.button} onPress={() => router.push("/riwayat_kesehatan")}>
            <Text style={styles.buttonText}>Daftar</Text>
          </TouchableOpacity>

          {/* Login Redirect */}
          <View style={styles.loginLinkContainer}>
            <Text style={styles.loginText}>Sudah punya akun? </Text>
            <TouchableOpacity onPress={() => router.push("/login")}>
              <Text style={styles.loginLink}>Masuk</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  keyboardAvoidView: { flex: 1 },
  scrollContainer: { paddingHorizontal: 20, paddingVertical: 40 },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#8E1616",
    textAlign: "center",
    marginBottom: 5,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 50,
    marginTop: 20,
  },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 14, color: "#666", marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 12,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    alignItems: "center",
  },
  passwordInput: { flex: 1, padding: 12, fontSize: 16 },
  eyeIcon: { padding: 10 },
  button: {
    backgroundColor: "#8E1616",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  loginLinkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  
  loginText: { fontSize: 14, color: "#333", marginTop: 10 },
  
  loginLink: { fontSize: 14, color: "#8E1616", fontWeight: "500", marginTop: 10 },
  confirmContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    marginTop: 10,
    marginBottom: 30,
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
  checkboxInner: { width: 24, height: 24, backgroundColor: "#8E1616" },
  termsText: { flex: 1, fontSize: 14, color: "#333", textAlign: "justify" },
  checkboxRow: { flexDirection: "row", alignItems: "center" },
});
