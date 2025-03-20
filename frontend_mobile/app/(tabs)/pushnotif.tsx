import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import warningIcon from '../../assets/images/warning.jpg';

const PushNotificationModal = () => {
  const [modalVisible, setModalVisible] = useState(true);

  const [fontsLoaded] = useFonts({
    PoppinsBold: require('../../assets/fonts/Poppins-Bold.ttf'),
    PoppinsRegular: require('../../assets/fonts/Poppins-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="darkred" />
          </TouchableOpacity>
          <Image source={warningIcon} style={styles.warningIcon} />
          <Text style={styles.title}>DARURAT!</Text>
          <Text style={styles.message}>
            Dibutuhkan bantuan pendonor dengan
            <Text style={styles.highlight}> golongan darah B rhesus (+) </Text>
            untuk pasien di
            <Text style={styles.highlight}> Rumah Sakit Borromeus Bandung </Text>
            secepatnya!
          </Text>
          <View style={styles.detailsContainer}>
            <Text style={styles.detailText}><Text style={styles.bold}>Golongan darah:</Text> B</Text>
            <Text style={styles.detailText}><Text style={styles.bold}>Rhesus:</Text> +</Text>
            <Text style={styles.detailText}><Text style={styles.bold}>Alamat:</Text> RS. Borromeus, Jl. Ir. H. Djuanda No 100, Jawa Barat</Text>
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Bantu Donor</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  warningIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontFamily: 'PoppinsBold',
    color: 'darkred',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    fontFamily: 'PoppinsRegular',
    textAlign: 'center',
    marginBottom: 10,
  },
  highlight: {
    fontFamily: 'PoppinsBold',
    color: 'darkred',
  },
  detailsContainer: {
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  detailText: {
    fontSize: 14,
    fontFamily: 'PoppinsRegular',
    marginBottom: 5,
  },
  bold: {
    fontFamily: 'PoppinsBold',
  },
  button: {
    backgroundColor: 'darkred',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'PoppinsBold',
    color: '#fff',
  },
});

export default PushNotificationModal;
