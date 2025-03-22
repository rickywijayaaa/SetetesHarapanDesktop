import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground } from "react-native";


const { width } = Dimensions.get("window");
const screenWidth = Dimensions.get("window").width;

const leaderboardData = [
  { id: 1, name: "Ricky Wijaya", points: 2569, avatar: require("../../assets/images/avatar1.png") },
  { id: 2, name: "Naomi August", points: 1469, avatar: require("../../assets/images/avatar2.png") },
  { id: 3, name: "Micky Mouse", points: 1053, avatar: require("../../assets/images/avatar3.png") },
  { id: 4, name: "Nasywaa Anggun", points: 590, avatar: require("../../assets/images/avatar4.png") },
  { id: 5, name: "Athena Antares", points: 448, avatar: require("../../assets/images/avatar5.png") },
  { id: 6, name: "Raesa Rezqita", points: 448, avatar: require("../../assets/images/avatar6.png") },
];

export default function Leaderboard() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: "#8E1616", paddingTop: 60 }}>
      {/* Header */}
      <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 20 }}>
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={{ flex: 1, textAlign: "center", color: "#fff", fontSize: 22, fontWeight: "bold" }}>
          Leaderboard
        </Text>
      </View>

      {/* Tabs */}
      <View style={{ flexDirection: "row", justifyContent: "center", marginVertical: 15 }}>
        <TouchableOpacity style={{ paddingHorizontal: 50, paddingVertical: 10, backgroundColor: "#fff", borderRadius: 15 }}>
          <Text style={{ fontWeight: "regular", color: "#8E1616" }}>Weekly</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ paddingHorizontal: 50, paddingVertical: 10, marginLeft: 10 }}>
          <Text style={{ color: "#fff" }}>All Time</Text>
        </TouchableOpacity>
      </View>

      {/* User Rank */}
      <View style={{
        backgroundColor: "#EEEE",
        marginHorizontal: 30,
        borderRadius: 20,
        overflow: "hidden",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 10,
      }}>
      <View style={{
        backgroundColor: "#8E1616",
        paddingHorizontal: 15,
        paddingVertical: 15,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
      }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "#FFFF" }}>#4</Text>
      </View>
        <View style={{
          flex: 1,
          paddingVertical: 15,
          paddingHorizontal: 15,
          justifyContent: "center",
        }}>
          <Text style={{ color: "#8E1616", fontSize: 18, fontWeight: "regular" }}>
            You are doing better than{" "}
            <Text style={{ fontWeight: "bold" }}>60%</Text> of other players!
          </Text>
        </View>
      </View>

      {/* Top 3 Leaders */}
      <ImageBackground
        source={require("../../assets/images/leaderboardrank.png")}
        resizeMode="contain"
        style={{
          width: "100%",
          height: 270,
          justifyContent: "flex-end",
          alignItems: "center",
          marginTop: 150,
        }}
      >
        <View style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-end",
          gap: 18,
          paddingBottom: 10,
        }}>
          {/* Rank 2 */}
          <View style={{ alignItems: "center" }}>
            {/* Avatar */}
            <Image
              source={leaderboardData[1].avatar}
              style={{
                width: 70,
                height: 70,
                borderRadius: 35,
                marginBottom: 7, // kecil saja, agar nama naik sedikit
              }}
            />

            {/* Nama lebih ke atas */}
            <Text
              style={{
                fontSize: 16,
                color: "#fff",
                fontWeight: "600",
                marginBottom: 7,
              }}
            >
              {leaderboardData[1].name}
            </Text>

            {/* XP Badge */}
            <LinearGradient
              colors={["#722222", "#D84040"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 0 }}
              style={{
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 20,
                marginBottom: 240,
              }}
            >
              <Text style={{ color: "#fff", fontSize: 12 }}>
                {leaderboardData[1].points.toLocaleString()} XP
              </Text>
            </LinearGradient>
          </View>


          {/* Rank 1 */}
          <View style={{ alignItems: "center" }}>
            {/* Avatar */}
            <Image
              source={leaderboardData[0].avatar}
              style={{
                width: 70,
                height: 70,
                borderRadius: 35,
                marginBottom: 7, // kecil saja, agar nama naik sedikit
              }}
            />

            {/* Nama lebih ke atas */}
            <Text
              style={{
                fontSize: 16,
                color: "#fff",
                fontWeight: "600",
                marginBottom: 7,
              }}
            >
              {leaderboardData[0].name}
            </Text>

            {/* XP Badge */}
            <LinearGradient
              colors={["#722222", "#D84040"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 0 }}
              style={{
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 20,
                marginBottom: 270,
              }}
            >
              <Text style={{ color: "#fff", fontSize: 12 }}>
                {leaderboardData[0].points.toLocaleString()} XP
              </Text>
            </LinearGradient>
          </View>

          {/* Rank 3 */}
          <View style={{ alignItems: "center" }}>
            {/* Avatar */}
            <Image
              source={leaderboardData[2].avatar}
              style={{
                width: 70,
                height: 70,
                borderRadius: 35,
                marginBottom: 7, // kecil saja, agar nama naik sedikit
              }}
            />

            {/* Nama lebih ke atas */}
            <Text
              style={{
                fontSize: 16,
                color: "#fff",
                fontWeight: "600",
                marginBottom: 7,
              }}
            >
              {leaderboardData[2].name}
            </Text>

            {/* XP Badge */}
            <LinearGradient
              colors={["#722222", "#D84040"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 0 }}
              style={{
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 20,
                marginBottom: 200,
              }}
            >
              <Text style={{ color: "#fff", fontSize: 12 }}>
                {leaderboardData[2].points.toLocaleString()} XP
              </Text>
            </LinearGradient>
          </View>
        </View>
      </ImageBackground>


      <ScrollView
        style={{
          backgroundColor: "#EFEEFC",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          marginTop: -90,
          flex: 1,
          paddingTop: 20,
          paddingHorizontal: 15,
          width: screenWidth - 20,      // ⬅️ sisakan 10px kiri + 10px kanan (total 20px ≈ 1cm)
          alignSelf: "center"
        }}

        contentContainerStyle={{
          paddingTop: 5,
          paddingHorizontal: 10, // ⬅️ padding agar item tidak mentok ke tepi
          paddingBottom: 40,     // opsional: beri ruang di bawah
        }}
      >
        {leaderboardData.map((player, index) => (
          <View
            key={player.id}
            style={{
              backgroundColor: "#fff",
              borderRadius: 20,
              paddingVertical: 12,
              paddingHorizontal: 16,
              marginBottom: 15,
              flexDirection: "row",
              alignItems: "center",
              shadowColor: "#000",
              shadowOpacity: 0.05,
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 5,
              elevation: 2, // for Android
            }}
          >
            {/* Rank circle */}
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                borderWidth: 1,
                borderColor: "#ccc",
                justifyContent: "center",
                alignItems: "center",
                marginRight: 12,
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: "bold", color: "#999" }}>{index + 1}</Text>
            </View>

            {/* Avatar */}
            <Image
              source={player.avatar}
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                marginRight: 12,
              }}
            />

            {/* Name and XP */}
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold", color: "#111" }}>{player.name}</Text>
              <Text style={{ fontSize: 14, color: "#888", marginTop: 2 }}>
                {player.points.toLocaleString()} points
              </Text>
            </View>

            {/* Drop icon */}
            <Image
              source={require("../../assets/images/drop.png")}
              style={{ width: 60, height: 40 }}
              resizeMode="contain"
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}