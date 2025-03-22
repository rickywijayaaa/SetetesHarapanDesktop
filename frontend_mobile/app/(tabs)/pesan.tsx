import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

const messages = [
  {
    id: '1',
    name: 'Pasien di Rumah Sakit Borromeus Bandung',
    message: 'butuh donor darah B Rhesus (+) segera!',
    time: 'Last Wednesday at 9:42 AM',
    avatar: require('../../assets/images/profile1.jpg'),
    unread: true,
  },
  {
    id: '2',
    name: 'Micky Nedry',
    message: 'mengirimkan pesan untukmu!',
    time: 'Last Wednesday at 9:42 AM',
    avatar: require('../../assets/images/profile2.jpg'),
    unread: true,
  },
  {
    id: '3',
    name: 'Nasywaa',
    message: '“Saya dan keluarga mengucapkan terima kasih yang sebesar-besarnya atas kebaikan hati Anda yang...”',
    time: 'Last Wednesday at 9:42 AM',
    avatar: require('../../assets/images/profile3.jpg'),
    unread: true,
  },
  {
    id: '4',
    name: 'Ricky',
    message: 'mengirimkan pesan untukmu!',
    time: 'Last Wednesday at 9:42 AM',
    avatar: require('../../assets/images/profile4.jpg'),
    file: 'landing_paage_ver2.fig',
    unread: true,
  },
  {
    id: '5',
    name: 'Naomi',
    message: '“Dari lubuk hati yang terdalam, saya mengucapkan terima kasih atas kepedulian da...”',
    time: 'Last Wednesday at 9:42 AM',
    avatar: require('../../assets/images/profile5.jpg'),
    favorite: true,
    unread: true,
  },
];

export default function PesanScreen() {
  const [selectedTab, setSelectedTab] = useState('All');
  const [fontsLoaded] = useFonts({
    PoppinsBold: require('../../assets/fonts/Poppins-Bold.ttf'),
    PoppinsRegular: require('../../assets/fonts/Poppins-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifikasi</Text>
      <View style={styles.tabContainer}>
        {['All', 'Unread', 'Read'].map(tab => (
          <TouchableOpacity key={tab} onPress={() => setSelectedTab(tab)}>
            <Text style={[styles.tab, selectedTab === tab && styles.activeTab]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Image source={item.avatar} style={styles.avatar} />
            <View style={styles.messageContent}>
              <Text style={styles.sender}>{item.name}</Text>
              <Text style={styles.message}>{item.message}</Text>
              {item.file && (
                <View style={styles.fileContainer}>
                  <MaterialIcons name="insert-drive-file" size={18} color="gray" />
                  <Text style={styles.fileName}>{item.file}</Text>
                </View>
              )}
              {item.favorite && (
                <TouchableOpacity style={styles.favoriteButton}>
                  <Text style={styles.favoriteText}>+ Add to favorites</Text>
                </TouchableOpacity>
              )}
              <Text style={styles.time}>{item.time}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 50,
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
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#eee',
  },
});