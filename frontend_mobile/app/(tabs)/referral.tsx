import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert, Clipboard, StatusBar, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from "expo-font";
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from "expo-router";

const ReferralScreen = () => {
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    PoppinsBold: require("../../assets/fonts/Poppins-Bold.ttf"),
    PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
  });

  const referralCode = '6BB5C4';

  const handleCopy = () => {
    Clipboard.setString(referralCode);
    Alert.alert('Copied!', 'Referral code has been copied to clipboard');
  };

  const ReferralCard = ({ message }) => (
    <View style={styles.card}>
      <Text style={styles.cardMessage}>{message}</Text>
      <View style={styles.codeContainer}>
        <Text style={styles.code}>{referralCode}</Text>
        <TouchableOpacity onPress={handleCopy} style={styles.copyButton}>
          <MaterialIcons name="content-copy" size={24} color="#991b1b" />
        </TouchableOpacity>
      </View>
      <View style={styles.shareSection}>
        <Text style={styles.sharePrompt}>Yuk, bagikan kodemu sekarang</Text>
        <TouchableOpacity style={styles.shareButton}>
          <Text style={styles.shareText}>Bagikan Kode</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (!fontsLoaded) return null;

  return (
    <LinearGradient colors={['#f8e7e7', '#b91c1c']} style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        </View>

        <Text style={styles.head}>
          Kode Referral
        </Text>

        <Text style={styles.title}>
          Bagikan kode referral kepada temanmu{"\n"}dan dapatkan banyak hadiah yang menarik!
        </Text>

        <ReferralCard message="Ajak temanmu untuk download aplikasi!" />
        <ReferralCard message="Ajak temanmu untuk donor darah!" />
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    paddingTop: 15,
    paddingBottom: 10,
  },
  backButton: {
    marginLeft: 20,
    marginTop: 10,
    padding: 5,
  },
  head: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 26,
    fontFamily: 'PoppinsBold',
    color: '#8e1616',
    marginBottom: 20,
    lineHeight: 30,
  },
  title: {
    textAlign: 'center',
    marginTop: 15,
    fontSize: 16,
    fontFamily: 'PoppinsBold',
    color: '#333',
    marginBottom: 50,
    lineHeight: 26,
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 30,
    padding: 15,
    borderRadius: 20,
    elevation: 2,
  },
  cardMessage: {
    fontSize: 14,
    marginBottom: 15,
    fontFamily: 'PoppinsBold',
    color: '#8e1616',
    textAlign: 'center',
  },
  codeContainer: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#991b1b',
    borderStyle: 'dashed',
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  code: {
    fontSize: 20,
    fontFamily: 'PoppinsBold',
    flex: 1,
    textAlign: 'center'
  },
  copyButton: {
    padding: 5,
    position: 'absolute',
    right: 10,
  },
  shareSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  sharePrompt: {
    fontFamily: 'PoppinsRegular',
    fontSize: 12,
    color: '#000',
    flex: 1,
  },
  shareButton: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#991b1b',
  },
  shareText: {
    color: '#991b1b',
    fontFamily: 'PoppinsBold',
    fontSize: 12,
  },
});

export default ReferralScreen;