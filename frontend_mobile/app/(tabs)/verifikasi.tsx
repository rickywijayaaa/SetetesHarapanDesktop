import React, { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

export default function VerificationScreen() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    if (text.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    
    if (text && index < otp.length - 1) {
      inputs.current[index + 1].focus();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kode Verifikasi</Text>
      <Text style={styles.subtitle}>Kami telah mengirimkan kode verifikasi ke alamat email Anda.</Text>
      
      <View style={styles.otpContainer}>
        {otp.map((value, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref)}
            style={[styles.otpInput, value ? styles.otpFilled : null]}
            keyboardType="numeric"
            maxLength={1}
            value={value}
            onChangeText={(text) => handleChange(text, index)}
          />
        ))}
      </View>
      
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Masuk</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#8E1616",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#333",
    marginTop: 20,
    textAlign: "justify"
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 50,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    textAlign: "center",
    fontSize: 18,
  },
  otpFilled: {
    borderColor: "#8E1616",
  },
  button: {
    backgroundColor: "#8E1616",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 50,
    shadowColor: "#8E1616",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
