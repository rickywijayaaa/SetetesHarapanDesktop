import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const leaderboardData = [
  { id: 1, name: "Ricky Wijaya", points: 2569, avatar: require("../../assets/images/avatar1.png") },
  { id: 2, name: "Naomi Augustine", points: 1469, avatar: require("../../assets/images/avatar2.png") },
  { id: 3, name: "Micky Mouse", points: 1053, avatar: require("../../assets/images/avatar3.png") },
  { id: 4, name: "Nasywaa Anggun", points: 590, avatar: require("../../assets/images/avatar4.png") },
  { id: 5, name: "Athena Antares", points: 448, avatar: require("../../assets/images/avatar5.png") },
  { id: 6, name: "Raesa Rezqita", points: 448, avatar: require("../../assets/images/avatar6.png") },
];

export default function Leaderboard() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: "#8E1616", paddingTop: 40 }}>
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
        <TouchableOpacity style={{ paddingHorizontal: 20, paddingVertical: 10, backgroundColor: "#fff", borderRadius: 20 }}>
          <Text style={{ fontWeight: "bold", color: "#8E1616" }}>Weekly</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ paddingHorizontal: 20, paddingVertical: 10, marginLeft: 10 }}>
          <Text style={{ color: "#fff" }}>All Time</Text>
        </TouchableOpacity>
      </View>

      {/* User Rank */}
      <View style={{
        backgroundColor: "#fff",
        marginHorizontal: 20,
        padding: 15,
        borderRadius: 15,
        alignItems: "center",
      }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#8E1616" }}>#4</Text>
        <Text style={{ textAlign: "center", color: "#8E1616", fontSize: 14 }}>
          You are doing better than 60% of other players!
        </Text>
      </View>

      {/* Top 3 Leaders */}
      <View style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-end",
        marginTop: 30
      }}>
        <View style={{ alignItems: "center", marginHorizontal: 15 }}>
          <Image source={leaderboardData[1].avatar} style={{ width: 60, height: 60, borderRadius: 30 }} />
          <Text style={{ color: "#fff", fontWeight: "bold" }}>{leaderboardData[1].name}</Text>
          <Text style={{ color: "#fff" }}>{leaderboardData[1].points} XP</Text>
        </View>

        <View style={{
          alignItems: "center",
          marginHorizontal: 15,
          backgroundColor: "#fff",
          padding: 15,
          borderRadius: 20
        }}>
          <Image source={leaderboardData[0].avatar} style={{ width: 70, height: 70, borderRadius: 35 }} />
          <Text style={{ fontWeight: "bold", color: "#8E1616", fontSize: 16 }}>{leaderboardData[0].name}</Text>
          <Text style={{ fontSize: 14, fontWeight: "bold", color: "#8E1616" }}>{leaderboardData[0].points} XP</Text>
        </View>

        <View style={{ alignItems: "center", marginHorizontal: 15 }}>
          <Image source={leaderboardData[2].avatar} style={{ width: 60, height: 60, borderRadius: 30 }} />
          <Text style={{ color: "#fff", fontWeight: "bold" }}>{leaderboardData[2].name}</Text>
          <Text style={{ color: "#fff" }}>{leaderboardData[2].points} XP</Text>
        </View>
      </View>

      {/* Full Leaderboard */}
      <ScrollView style={{
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: 20,
        flex: 1
      }}>
        {leaderboardData.map((player, index) => (
          <View key={player.id} style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 15,
            borderBottomWidth: 1,
            borderBottomColor: "#eee"
          }}>
            <Text style={{ fontSize: 16, fontWeight: "bold", width: 30 }}>{index + 1}</Text>
            <Image source={player.avatar} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "bold" }}>{player.name}</Text>
              <Text style={{ color: "#666" }}>{player.points} points</Text>
            </View>
            <Image source={require("../../assets/images/drop.png")} style={{ width: 20, height: 20 }} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
