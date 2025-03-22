import React, { useState } from "react";
import { View, Text, Image, FlatList, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

const carouselItems = [
  { id: "1", image: require("../../assets/images/carousel1.png") },
  { id: "2", image: require("../../assets/images/carousel1.png") },
  { id: "3", image: require("../../assets/images/carousel1.png") },
];

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

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setActiveIndex(index);
  };

  const renderEventItem = ({ item }) => (
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
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Image source={require("../../assets/images/logox.png")} style={styles.headerImage} />
      </View>
      <View style={styles.carouselWrapper}>
        <ScrollView 
          horizontal 
          pagingEnabled 
          showsHorizontalScrollIndicator={false} 
          style={styles.carousel}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {carouselItems.map((item) => (
            <Image key={item.id} source={item.image} style={styles.carouselImage} />
          ))}
        </ScrollView>
        <View style={styles.indicatorContainer}>
          {carouselItems.map((_, index) => (
            <View key={index} style={[styles.indicator, activeIndex === index && styles.activeIndicator]} />
          ))}
        </View>
      </View>
      <Text style={styles.greeting}>Halo, Nasywaa Anggun!</Text>
      <View style={styles.statsCard}>
        <View style={styles.statItem}>
          <Image source={require("../../assets/images/star.png")} style={styles.icon} />
          <Text style={styles.statLabel}>POINTS</Text>
          <Text style={styles.statValue}>590</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <Image source={require("../../assets/images/globe.png")} style={styles.icon} />
          <Text style={styles.statLabel}>LOCAL RANK</Text>
          <Text style={styles.statValue}>#1,438</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <Image source={require("../../assets/images/region.png")} style={styles.icon} />
          <Text style={styles.statLabel}>REGION RANK</Text>
          <Text style={styles.statValue}>#56</Text>
        </View>
      </View>
      <Text style={styles.subtitle}>Kegiatan Donor Darah</Text>
      
      {/* Replace FlatList with map to render event items */}
      <View style={styles.eventsContainer}>
        {events.map(item => (
          <View key={item.id}>
            {renderEventItem({ item })}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    backgroundColor: "#8E1616",
    padding: 30,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    alignItems: "center",
    marginBottom: 20,
  },
  headerImage: {
    width: 230,
    height: 50,
    resizeMode: "contain",
    marginTop: 30,
  },
  carouselWrapper: {
    alignItems: "center", 
  },
  carousel: {
    marginVertical: 10,
    marginBottom: 30,
  },
  carouselImage: {
    width: width - 20,
    height: 200, 
    resizeMode: "contain",
    marginHorizontal: 10,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    bottom: 5, 
    left: 0,
    right: 0,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "gray",
    marginHorizontal: 5,
  },
  activeIndicator: {
    backgroundColor: "#8E1616",
  },
  greeting: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#8E1616",
    padding: 20,
  },
  statsCard: {
    backgroundColor: "#8E1616",
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    marginTop: -10,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    marginBottom: 5,
  },
  statLabel: {
    color: "#E0E0E0",
    fontSize: 12,
    fontWeight: "bold",
    marginVertical: 3,
    textAlign: "center",
  },
  statValue: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  divider: {
    width: 1,
    height: "70%",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    marginHorizontal: 5,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#000000",
    padding: 20,
  },
  eventsContainer: {
    paddingBottom: 80,
    marginTop: -20
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