import React, { useState } from "react";
import { View, Text, TextInput, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; // Import useRouter

const events = [
  {
    id: "1",
    title: "Donor Darah PMI Bandung",
    location: "Balai Kota Bandung",
    date: "20 September 2025",
    time: "08:00 - 12:00",
    image: require("../../assets/images/donor_poster.png"),
    page: "/informasidonor",
  },
  {
    id: "2",
    title: "Aksi Donor Sehat",
    location: "GSG Universitas Indonesia",
    date: "25 September 2025",
    time: "09:00 - 13:00",
    image: require("../../assets/images/donor_poster.png"),
    page: "/informasidonor",
  },
  {
    id: "3",
    title: "Donor Darah Peduli Sesama",
    location: "Mall Kota Kasablanka",
    date: "30 September 2025",
    time: "10:00 - 14:00",
    image: require("../../assets/images/donor_poster.png"),
    page: "/informasidonor",
  },
    {
    id: "4",
    title: "Blood Donation Drive",
    location: "Hotel Grand Hyatt Jakarta",
    date: "5 Oktober 2025",
    time: "11:00 - 15:00",
    image: require("../../assets/images/donor_poster.png"),
    page: "/informasidonor",
  },
  {
    id: "5",
    title: "Donor Bersama HMIF ITB",
    location: "CC Timur ITB",
    date: "15 September 2025",
    time: "07:30 - 10:30",
    image: require("../../assets/images/donor_poster.png"),
    page: "/informasidonor"
    },
];

export default function DonorActivities() {
  const [search, setSearch] = useState("");
  const router = useRouter(); // Gunakan router dari expo-router

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Kegiatan Donor Darah</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Cari Kota"
          value={search}
          onChangeText={setSearch}
        />
        <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
      </View>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(item.page)}> 
            <View style={styles.card}>
              <View style={styles.cardContent}>
                <View style={styles.textContainer}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardSubtitle}>{item.location}</Text>
                  <Text style={styles.cardSubtitle}>{item.date}</Text>
                  <Text style={styles.cardSubtitle}>{item.time}</Text>
                </View>
                <View style={styles.imageContainer}>
                  <View style={styles.circleBackground} />
                  <Image source={item.image} style={styles.cardImage} />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8E1616",
  },
  header: {
    backgroundColor: "#FFFFFF",
    padding: 60,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    alignItems: "center",
    marginBottom: 10,
  },
  headerTitle: {
    color: "#8E1616",
    fontSize: 23,
    fontWeight: "bold",
    marginTop: 20
  },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    margin: 15,
    alignItems: "center",
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
  },
  searchIcon: {
    marginLeft: 5,
  },
  card: {
    backgroundColor: "#fff",
    margin: 15,
    borderRadius: 10,
    padding: 20,
    paddingVertical: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 20,
  },
  cardSubtitle: {
    fontSize: 12,
    color: "gray",
  },
  imageContainer: {
    position: "relative",
  },
  circleBackground: {
    position: "absolute",
    width: 140,
    height: 160,
    borderRadius: 10,
    backgroundColor: "#E0E0E0",
    left: -20,
    top: -30,
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    resizeMode: "contain",
  },
});
