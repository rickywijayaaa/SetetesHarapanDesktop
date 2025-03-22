import React from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const events = [
    {
      id: "1",
      title: "Donor Darah PMI Bandung",
      location: "Balai Kota Bandung",
      date: "20 September 2025",
      time: "08:00 - 12:00",
      image: require("../../assets/images/donor_poster.png"),
      page: "/informasidonor1",
    },
    {
      id: "2",
      title: "Aksi Donor Sehat",
      location: "GSG Universitas Indonesia",
      date: "25 September 2025",
      time: "09:00 - 13:00",
      image: require("../../assets/images/donor_poster.png"),
      page: "/informasidonor1",
    },
    {
      id: "3",
      title: "Donor Darah Peduli Sesama",
      location: "Mall Kota Kasablanka",
      date: "30 September 2025",
      time: "10:00 - 14:00",
      image: require("../../assets/images/donor_poster.png"),
      page: "/informasidonor1",
    },
      {
      id: "4",
      title: "Blood Donation Drive",
      location: "Hotel Grand Hyatt Jakarta",
      date: "5 Oktober 2025",
      time: "11:00 - 15:00",
      image: require("../../assets/images/donor_poster.png"),
      page: "/informasidonor1",
    },
    {
      id: "5",
      title: "Donor Bersama HMIF ITB",
      location: "CC Timur ITB",
      date: "15 September 2025",
      time: "07:30 - 10:30",
      image: require("../../assets/images/donor_poster.png"),
      page: "/informasidonor1"
      },
  ];

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appName}>SetetesHarapan</Text>
      </View>
      <Text style={styles.greeting}>Halo, Nasywaa Anggun!</Text>
      <View style={styles.statsContainer}>
        <Text style={styles.stats}>Points: 580</Text>
        <Text style={styles.stats}>Local Rank: #1,438</Text>
        <Text style={styles.stats}>Region Rank: #56</Text>
      </View>
      <Text style={styles.sectionTitle}>Kegiatan Donor Darah</Text>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.eventImage} />
            <View>
              <Text style={styles.eventTitle}>{item.title}</Text>
              <Text style={styles.eventDetails}>{item.location}</Text>
              <Text style={styles.eventDetails}>{item.date}</Text>
              <Text style={styles.eventDetails}>{item.time}</Text>
            </View>
          </View>
        )}
      />
      <View style={styles.navbar}>
        <Ionicons name="home" size={24} color="red" />
        <Ionicons name="search" size={24} color="gray" />
        <Ionicons name="water" size={24} color="gray" />
        <Ionicons name="chatbox" size={24} color="gray" />
        <Ionicons name="person" size={24} color="gray" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  header: {
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "red",
  },
  appName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  greeting: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  stats: {
    fontSize: 14,
    fontWeight: "bold",
    color: "red",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
  card: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#f9f9f9",
    marginVertical: 5,
    borderRadius: 8,
  },
  eventImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  eventDetails: {
    fontSize: 12,
    color: "gray",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "gray",
  },
});
