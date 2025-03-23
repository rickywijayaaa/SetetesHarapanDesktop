import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

const carouselItems = [
  { id: "1", image: require("../../assets/images/voucher.png") },
  { id: "2", image: require("../../assets/images/voucher.png") },
  { id: "3", image: require("../../assets/images/voucher.png") },
];

export default function Reward2() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [username, setUsername] = useState("...");
  const [points, setPoints] = useState(0);
  const router = useRouter();
  const dropImages = [
    require("../../assets/images/drop1.png"),
    require("../../assets/images/drop2.png"),
    require("../../assets/images/drop3.png"),
    require("../../assets/images/drop.png"),
  ];

  const xpValues = [100, 500, 1000, 1500];
  const scrollRef = useRef<ScrollView | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setActiveIndex(index);
  };

  const handleAvatarPress = () => {
    router.push("/profile");
  };

  const handleNextAchievementPress = () => {
    router.push("/reward");
  };

  const handleNextVoucherPress = () => {
    router.push("/voucher");
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await fetch("https://backend-setetesharapandesktop.up.railway.app/users/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // jika pakai JWT
          },
          credentials: "include", // jika pakai session
        });

        const data = await response.json();
        if (response.ok) {
          if (data.username || data.name) {
            setUsername(data.username || data.name);
          }
          if (data.total_points !== undefined) {
            setPoints(data.total_points);
          }
        } else {
          console.warn("Gagal mendapatkan data user:", data);
        }
      } catch (err) {
        console.error("Gagal fetch user:", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <ImageBackground
      source={require("../../assets/images/backgroundoval.png")}
      resizeMode="cover"
      style={{ flex: 1, backgroundColor: "#8E1616" }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <FontAwesome name="arrow-left" size={24} color="#8E1616" />
          <TouchableOpacity onPress={handleAvatarPress}>
            <Image
              source={require("../../assets/images/avatar1.png")}
              style={[styles.profile, { borderWidth: 3, borderColor: "#fff" }]}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.dropWrapper}>
          <Text style={styles.greeting}>Hi, {username}!</Text>
          <Image style={[styles.dropIconLarge, { marginTop: 0 }]} resizeMode="contain" />
        </View>

        <View style={styles.cardWithCut}>
          <View style={styles.dropContainer}>
            <Image
              source={require("../../assets/images/drop.png")}
              style={{ width: 90, height: 110 }}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.title}>Pahlawan Donor • {points} Points</Text>

          <View style={styles.infoGridWrapper}>
            <View style={styles.infoGridBox}>
              <Image source={require("../../assets/images/points.png")} style={styles.infoIcon} resizeMode="contain" />
              <Text style={styles.infoTitle}>POINTS</Text>
              <Text style={styles.infoValue}>{points}</Text>
            </View>
            <View style={[styles.infoGridBox, styles.infoDivider]}>
              <Image source={require("../../assets/images/nasional.png")} style={styles.infoIcon} resizeMode="contain" />
              <Text style={styles.infoTitle}>JUARA NASIONAL</Text>
              <Text style={styles.infoValue}>#1,438</Text>
            </View>
            <View style={styles.infoGridBox}>
              <Image source={require("../../assets/images/kota.png")} style={styles.infoIcon} resizeMode="contain" />
              <Text style={styles.infoTitle}>JUARA KOTA</Text>
              <Text style={styles.infoValue}>#56</Text>
            </View>
          </View>

          <View style={{ position: "relative", width: "100%", alignItems: "center", marginBottom: 15 }}>
            <View style={{
              position: "absolute",
              top: 22,
              left: 0,
              right: 0,
              height: 6,
              backgroundColor: "#eee",
              borderRadius: 3,
              zIndex: 0,
            }}>
              <View style={{
                height: 6,
                width: "40%",
                backgroundColor: "#8E1616",
                borderTopLeftRadius: 3,
                borderBottomLeftRadius: 3,
              }} />
            </View>

            <View style={[styles.stepRow, { width: "100%", justifyContent: "space-between" }]}>
              {["Pendonor Muda", "Pahlawan Donor", "Duta Donor", "Patriot Donor"].map((label, index) => (
                <View key={index} style={{ alignItems: "center", zIndex: 2 }}>
                  <Image source={dropImages[index]} style={styles.stepIcon} resizeMode="contain" />
                  <Text style={[styles.stepLabel, { color: index <= 1 ? "#8E1616" : "#8E1616" }]}>{label}</Text>
                  <Text style={styles.stepXP}>{xpValues[index]} XP</Text>
                </View>
              ))}
            </View>
          </View>

          <TouchableOpacity onPress={handleNextAchievementPress}>
      <LinearGradient
        colors={["#E0C0C0", "#FFFFFF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.nextAchievementCard}
      >
        <Image
          source={require("../../assets/images/drop3.png")}
          style={{ width: 30, height: 50, marginRight: 10 }}
          resizeMode="contain"
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.nextText}>
            {(() => {
              if (points < 500) return `${500 - points} XP untuk ke pencapaianmu selanjutnya`;
              if (points < 1000) return `${1000 - points} XP untuk ke pencapaianmu selanjutnya`;
              if (points < 1500) return `${1500 - points} XP untuk ke pencapaianmu selanjutnya`;
              return `0 XP untuk ke pencapaianmu selanjutnya`;
            })()}
          </Text>
          <View style={styles.progressBarWrapper}>
            <View
              style={[
                styles.progressBarFill,
                {
                  width: (() => {
                    if (points < 500) return `${(points / 500) * 100}%`;
                    if (points < 1000) return `${((points - 500) / 500) * 100}%`;
                    if (points < 1500) return `${((points - 1000) / 500) * 100}%`;
                    return `100%`;
                  })(),
                },
              ]}
            />
          </View>
        </View>
        <FontAwesome name="chevron-right" size={18} color="#8E1616" />
      </LinearGradient>
    </TouchableOpacity>

          <TouchableOpacity onPress={handleNextVoucherPress}>
          
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
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  greeting: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  profile: {
    width: 35,
    height: 35,
    borderRadius: 20,
  },
  dropWrapper: {
    alignItems: "center",
    marginVertical: 20,
    marginTop: 70
  },
  dropIconLarge: {
    width: 80,
    height: 100,
  },
  card: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginRight: 10,
    marginLeft: 10,
    padding: 20,
    paddingBottom: 80,
  },
  cardWithCut: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginHorizontal: 10,
    paddingTop: 60, // naik biar drop muat di atas
    paddingHorizontal: 20,
    paddingBottom: 80,
    position: "relative",
    overflow: "visible",
  },
  dropContainer: {
    position: "absolute",
    top: -50,
    alignSelf: "center",
    width: 100,
    height: 100,
    backgroundColor: "transparent",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  
  title: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#8E1616",
    marginBottom: 20,
  },
  infoGridWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#8E1616",
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 30,
    width: "100%",
  },
  infoGridBox: {
    flex: 1,
    alignItems: "center",
  },
  infoDivider: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#9A3D3D",
  },
  infoIcon: {
    width: 22,
    height: 22,
    marginBottom: 6,
    tintColor: "#fff"
  },
  infoTitle: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "500",
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  stepRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  stepIcon: {
    width: 30,
    height: 40,
    marginBottom: 6,
  },
  stepLabel: {
    fontSize: 12,
    color: "#333",
    fontWeight: "500",
  },
  stepXP: {
    fontSize: 10,
    color: "#999",
  },
  nextAchievementCard: {
    borderRadius: 20,
    marginTop: -15,
    padding: 19,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  nextText: {
    color: "#8E1616",
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 6,
  },
  progressBarWrapper: {
    backgroundColor: "#E8CFCF",
    height: 6,
    borderRadius: 10,
    width: "95%",
  },
  progressBarFill: {
    backgroundColor: "#8E1616",
    height: 6,
    borderRadius: 10,
    width: "60%",
  },
  arrowButton: {
    backgroundColor: "#8E1616",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  arrowLeft: {
    position: "absolute",
    left: -10,
    top: "40%",
    zIndex: 5,
  },
  arrowRight: {
    position: "absolute",
    right: -10,
    top: "40%",
    zIndex: 5,
  },
  carouselWrapper: {
    alignItems: "center", 
    marginTop: 25,
  },
  carousel: {
    marginVertical: 10,
    marginBottom: 30,
  },
  carouselImage: {
    width: width * 0.75, 
    height: 180,         
    borderRadius: 12,
    resizeMode: "contain",
    marginHorizontal: width * 0.05, // agar berada di tengah
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
});