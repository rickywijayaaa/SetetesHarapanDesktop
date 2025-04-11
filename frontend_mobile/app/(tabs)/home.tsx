import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [username, setUsername] = useState("...");
  const [totalPoints, setTotalPoints] = useState(0);
  const [iconStatus, setIconStatus] = useState(require("../../assets/images/iconsad.png")); 
  const router = useRouter();

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setActiveIndex(index);
  };

  useEffect(() => {
    const fetchUserAndDonorStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const userRes = await fetch("https://backend-setetesharapandesktop.up.railway.app/users/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Data user:", userRes);
        const userData = await userRes.json();
        if (!userRes.ok) throw new Error("Gagal mengambil data user");
  
        setUsername(userData.username || userData.name || "User");
        setTotalPoints(userData.total_points || 0);
  
        const iduser = userData.iduser;
        const nik = userData.nik;
  
        if (!nik) {
          console.warn("NIK tidak ditemukan");
          return;
        }
        else {
          console.log(nik);
        }
  
        const donorRes = await fetch(`https://backend-setetesharapandesktop.up.railway.app/api/user/donor-history/${iduser}`);
        const donorData = await donorRes.json();
  
        if (!donorData || !Array.isArray(donorData.donations)) {
          console.warn("Data donor tidak tersedia atau bukan array");
          return;
        }

        console.log("donorData:", donorData);

        
        const donorDates = donorData.donations
          .map((d: { tanggal_donor: string }) => new Date(d.tanggal_donor))
          .sort((a, b) => b.getTime() - a.getTime());
        

        if (donorDates.length === 0) return;
  
        const now = new Date();
        const lastDonation = donorDates[0];
        const diffMonth = (now.getFullYear() - lastDonation.getFullYear()) * 12 + now.getMonth() - lastDonation.getMonth();
  
        if (diffMonth > 4) {
          setIconStatus(require("../../assets/images/iconsad.png"));
        } else if (diffMonth >= 3) {
          setIconStatus(require("../../assets/images/iconnormal.png"));
        } else {
          setIconStatus(require("../../assets/images/iconhappy.png"));
        }
        
      } catch (err) {
        console.error("Error fetching user/donor data:", err);
      }
    };
  
    fetchUserAndDonorStatus();
  }, []);
  
  

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

      <View style={styles.greetingWrapper}>
        <Text style={styles.greetingText}>Halo, {username}!</Text>

        <View style={styles.iconWrapper}>
          <Image source={iconStatus} style={styles.happyIcon} />
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Image source={require("../../assets/images/star.png")} style={styles.statIcon} />
            <Text style={styles.statLabel}>POINTS</Text>
            <Text style={styles.statValue}>{totalPoints}</Text>
          </View>

          <View style={styles.statItem}>
            <Image source={require("../../assets/images/globe.png")} style={styles.statIcon} />
            <Text style={styles.statLabel}>JUARA NASIONAL</Text>
            <Text style={styles.statValue}>#1,438</Text>
          </View>

          <View style={styles.statItem}>
            <Image source={require("../../assets/images/region.png")} style={styles.statIcon} />
            <Text style={styles.statLabel}>JUARA KOTA</Text>
            <Text style={styles.statValue}>#56</Text>
          </View>
        </View>
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

      <Text style={styles.subtitle}>Kegiatan Donor Darah</Text>

      <View style={styles.eventsContainer}>
        {events.map((item) => (
          <View key={item.id}>{renderEventItem({ item })}</View>
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
  greetingWrapper: {
    alignItems: "center",
    paddingTop: 10,
    marginBottom: 60,
  },
  greetingText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#8E1616",
    marginBottom: 70,
  },
  iconWrapper: {
    position: "absolute",
    top: 40,
    zIndex: 3,
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 100,
    alignSelf: "center",
    shadowRadius: 3,
    elevation: 4,
  },
  happyIcon: {
    width: 110,
    height: 110,
    resizeMode: "contain",
  },
  statsContainer: {
    flexDirection: "row",
    backgroundColor: "#8E1616",
    borderRadius: 30,
    marginHorizontal: 10,
    paddingTop: 80,
    paddingBottom: 30,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "flex-start",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    width: "90%",
    overflow: "visible",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  statIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    marginBottom: 5,
  },
  statLabel: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 5,
    textAlign: "center",
  },
  statValue: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  carouselWrapper: {
    alignItems: "center",
  },
  carousel: {
    marginVertical: -45,
    marginBottom: 15,
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
    bottom: 0,
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
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 5,
    color: "#000000",
    padding: 20,
  },
  eventsContainer: {
    paddingBottom: 80,
    marginTop: -20,
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
