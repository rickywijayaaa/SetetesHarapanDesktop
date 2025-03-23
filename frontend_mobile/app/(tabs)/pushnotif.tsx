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
import { useRouter } from 'expo-router';
import warningIcon from '../../assets/images/warning.jpg';

const notifications = [
  { id: 1, title: 'Darurat! Butuh Pendonor', message: 'Golongan darah B+ diperlukan di RS Borromeus' },
  { id: 2, title: 'Update Aplikasi', message: 'Versi terbaru telah tersedia' }
];

const NotificationList = () => {
  const [selectedNotification, setSelectedNotification] = useState(null);
  const router = useRouter();

  const handlePress = (notif) => {
    if (notif.id === 1) {
      setSelectedNotification(notif);
    } else {
      alert('Notifikasi lainnya diklik');
    }
  };

  return (
    <View style={styles.container}>
      {notifications.map((notif) => (
        <TouchableOpacity key={notif.id} style={styles.notification} onPress={() => handlePress(notif)}>
          <Text style={styles.title}>{notif.title}</Text>
          <Text style={styles.message}>{notif.message}</Text>
        </TouchableOpacity>
      ))}

      {selectedNotification && <PushNotificationModal onClose={() => setSelectedNotification(null)} />}
    </View>
  );
};

const PushNotificationModal = ({ onClose }) => {
  const [modalVisible, setModalVisible] = useState(true);
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    PoppinsBold: require('../../assets/fonts/Poppins-Bold.ttf'),
    PoppinsRegular: require('../../assets/fonts/Poppins-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  const handleClosePress = () => {
    setModalVisible(false);
    setTimeout(() => {
      onClose();
      router.push('/home');
    }, 300);
  };

  const handleDonatePress = () => {
    setModalVisible(false);
    setTimeout(() => {
      onClose();
      router.push('/kuesioner');
    }, 300);
  };

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={handleClosePress}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={handleClosePress} style={styles.closeButton}>
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
          <TouchableOpacity style={styles.button} onPress={handleDonatePress}>
            <Text style={styles.buttonText}>Bantu Donor</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  notification: { padding: 15, backgroundColor: '#f8f9fa', marginBottom: 10, borderRadius: 8 },
  title: { fontSize: 16, fontWeight: 'bold' },
  message: { fontSize: 14, color: '#555' },
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
  closeButton: { position: 'absolute', top: 10, right: 10 },
  warningIcon: { width: 50, height: 50, marginBottom: 10 },
  highlight: { fontFamily: 'PoppinsBold', color: 'darkred' },
  detailsContainer: { width: '100%', paddingHorizontal: 10, marginBottom: 20 },
  detailText: { fontSize: 14, fontFamily: 'PoppinsRegular', marginBottom: 5 },
  bold: { fontFamily: 'PoppinsBold' },
  button: {
    backgroundColor: 'darkred',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: { fontSize: 16, fontFamily: 'PoppinsBold', color: '#fff' },
});

export default NotificationList;
