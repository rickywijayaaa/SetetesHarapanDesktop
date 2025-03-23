import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router'; // Import useRouter for navigation
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons'; // for close button icon
import axios from 'axios'; // Import axios for HTTP requests
import warningIcon from '../../assets/images/warning.jpg'; // Your image path

export default function PesanScreen() {
  const [selectedTab, setSelectedTab] = useState('All');
  const [selectedNotification, setSelectedNotification] = useState(null); // For handling modal visibility
  const [notifications, setNotifications] = useState([]); // State to hold fetched notifications
  const [fontsLoaded] = useFonts({
    PoppinsBold: require('../../assets/fonts/Poppins-Bold.ttf'),
    PoppinsRegular: require('../../assets/fonts/Poppins-Regular.ttf'),
  });
  const router = useRouter();
  const avatars = [
    require('../../assets/images/profile1.jpg'),
    require('../../assets/images/profile2.jpg'),
    require('../../assets/images/profile3.jpg'),
    require('../../assets/images/profile4.jpg'),
    require('../../assets/images/profile5.jpg'),
  ];

  // Fetch notifications from the backend
  const fetchNotifications = async () => {
    try {
      const response = await axios.get('https://backend-setetesharapandesktop.up.railway.app/api/notification');
      setNotifications(response.data); // Set fetched data to notifications state
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    fetchNotifications(); // Fetch notifications when the component mounts
  }, []);

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  const handlePress = (item) => {
    // Mark notification as read when clicked
    item.is_read = true;
    // Update the state of the notification to reflect it is read
    setSelectedNotification(item); // Show modal when a notification is clicked
    // Optionally, send an update request to the backend to mark the notification as read
    axios.put(`https://backend-setetesharapandesktop.up.railway.app/api/notifications/${item.idnotification}/read`);
  };

  const handleCloseModal = () => {
    setSelectedNotification(null); // Close the modal
  };

  const handleDonatePress = () => {
    // Navigate to the "Kuesioner" screen after clicking "Bantu Donor"
    setSelectedNotification(null); // Close modal
    router.push('/kuesioner'); // Assuming navigation to /kuesioner
  };

  // Function to return the avatar image source based on the index
  const getAvatar = (index) => {
    const avatarIndex = index % 5; // Cycle through 5 images
    return avatars[avatarIndex]; // Return the correct avatar based on index
  };

  // Filter notifications based on the selected tab
  const filteredNotifications = notifications.filter((notification) => {
    if (selectedTab === 'Unread') {
      return !notification.is_read;
    }
    if (selectedTab === 'Read') {
      return notification.is_read;
    }
    return true; // For 'All' tab, return all notifications
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifikasi</Text>
      <View style={styles.tabContainer}>
        {['All', 'Unread', 'Read'].map((tab) => (
          <TouchableOpacity key={tab} onPress={() => setSelectedTab(tab)}>
            <Text style={[styles.tab, selectedTab === tab && styles.activeTab]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredNotifications}
        keyExtractor={(item) => item.idnotification.toString()} // Ensure correct key for unique ids
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => handlePress(item)} // Show modal when clicked
            style={styles.messageContainer}
          >
            <Image source={getAvatar(index)} style={styles.avatar} /> {/* Dynamically assigned avatar */}
            <View style={styles.messageContent}>
              <Text style={styles.sender}>
                {`Segera butuh donor darah ${item.golongan_darah} ${item.rhesus} di ${item.address}`}
              </Text>
              <Text style={styles.message} numberOfLines={1} ellipsizeMode="tail">
                {item.message}
              </Text>
              <Text style={styles.time}>
                {new Date(item.created_at).toLocaleString("en-GB", {
                  hour: "2-digit", minute: "2-digit", day: "2-digit", month: "2-digit", year: "2-digit"
                })}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Modal for Push Notification */}
      {selectedNotification && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={selectedNotification !== null}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.overlay}>
            <View style={styles.modalContainer}>
              <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="darkred" />
              </TouchableOpacity>
              <Image source={warningIcon} style={styles.warningIcon} />
              <Text style={styles.title}>DARURAT!</Text>
              <Text style={styles.message}>
                Dibutuhkan bantuan pendonor dengan
                <Text style={styles.highlight}> {selectedNotification.golongan_darah} rhesus ({selectedNotification.rhesus}) </Text>
                untuk pasien di
                <Text style={styles.highlight}> Rumah Sakit Borromeus Bandung </Text>
                secepatnya!
              </Text>
              <View style={styles.detailsContainer}>
                <Text style={styles.detailText}><Text style={styles.bold}>Golongan darah:</Text> {selectedNotification.golongan_darah}</Text>
                <Text style={styles.detailText}><Text style={styles.bold}>Rhesus:</Text> {selectedNotification.rhesus}</Text>
                <Text style={styles.detailText}><Text style={styles.bold}>Deadline:</Text> {new Date(selectedNotification.deadline).toLocaleString()}</Text>
                <Text style={styles.detailText}><Text style={styles.bold}>Alamat:</Text> {selectedNotification.address}</Text>
              </View>
              <TouchableOpacity style={styles.button} onPress={handleDonatePress}>
                <Text style={styles.buttonText}>Bantu Donor</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 70,
  },
  header: {
    fontSize: 28,
    fontFamily: 'PoppinsBold',
    textAlign: 'center',
    color: '#a00',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15,
  },
  tab: {
    fontSize: 18,
    fontFamily: 'PoppinsRegular',
    marginHorizontal: 15,
    color: 'gray',
  },
  activeTab: {
    color: '#a00',
    borderBottomWidth: 2,
    borderBottomColor: '#a00',
  },
  messageContainer: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  messageContent: {
    flex: 1,
  },
  sender: {
    fontSize: 18,
    fontFamily: 'PoppinsBold',
  },
  message: {
    fontSize: 16,
    fontFamily: 'PoppinsRegular',
    color: '#555',
  },
  time: {
    fontSize: 14,
    fontFamily: 'PoppinsRegular',
    color: 'gray',
  },
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
