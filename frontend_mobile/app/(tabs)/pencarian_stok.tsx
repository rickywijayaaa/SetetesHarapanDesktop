import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function PencarianStok() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header - White background with red text */}
      <View style={styles.headerSection}>
        <Text style={styles.headerTitle}>Informasi Darah</Text>
      </View>

      {/* Total Blood Card - Dark red background */}
      <View style={styles.totalBloodCard}>
        <View style={styles.bloodInfoContainer}>
          <View style={styles.iconContainer}>
            <Image
              source={require("../../assets/images/blood-donation.png")}
              style={styles.bloodIcon}
            />
          </View>
          <View style={styles.bloodTextContainer}>
            <Text style={styles.bloodInfoTitle}>Total Darah</Text>
            <View style={styles.bloodCountContainer}>
              <Text style={styles.bloodCount}>1254</Text>
              <Text style={styles.kantongText}>Kantong</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Search and Filter */}
      <View style={styles.searchFilterContainer}>
        {/* Search City Input */}
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Cari Kota"
            placeholderTextColor="#888"
          />
          <TouchableOpacity style={styles.searchIconButton}>
            <Text style={styles.searchIcon}>⌕</Text>
          </TouchableOpacity>
        </View>

        {/* Type Dropdown */}
        <TouchableOpacity style={styles.typeDropdown}>
          <Text style={styles.typeDropdownText}>Jenis</Text>
          <Text style={styles.dropdownIcon}>▼</Text>
        </TouchableOpacity>
      </View>

      {/* Blood Type Grid */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Row 1: O+ and O- */}
        <View style={styles.bloodTypeRow}>
          <View style={styles.bloodTypeCard}>
            <Text style={styles.bloodTypeLabel}>O +</Text>
            <Text style={styles.bloodTypeCount}>41</Text>
            <Text style={styles.kantongLabel}>Kantong</Text>
          </View>
          <View style={styles.bloodTypeCard}>
            <Text style={styles.bloodTypeLabel}>O -</Text>
            <Text style={styles.bloodTypeCount}>102</Text>
            <Text style={styles.kantongLabel}>Kantong</Text>
          </View>
        </View>

        {/* Row 2: A+ and A- */}
        <View style={styles.bloodTypeRow}>
          <View style={styles.bloodTypeCard}>
            <Text style={styles.bloodTypeLabel}>A +</Text>
            <Text style={styles.bloodTypeCount}>141</Text>
            <Text style={styles.kantongLabel}>Kantong</Text>
          </View>
          <View style={styles.bloodTypeCard}>
            <Text style={styles.bloodTypeLabel}>A -</Text>
            <Text style={styles.bloodTypeCount}>73</Text>
            <Text style={styles.kantongLabel}>Kantong</Text>
          </View>
        </View>

        {/* Row 3: B+ and B- */}
        <View style={styles.bloodTypeRow}>
          <View style={styles.bloodTypeCard}>
            <Text style={styles.bloodTypeLabel}>B +</Text>
            <Text style={styles.bloodTypeCount}>97</Text>
            <Text style={styles.kantongLabel}>Kantong</Text>
          </View>
          <View style={styles.bloodTypeCard}>
            <Text style={styles.bloodTypeLabel}>B -</Text>
            <Text style={styles.bloodTypeCount}>138</Text>
            <Text style={styles.kantongLabel}>Kantong</Text>
          </View>
        </View>

        {/* Row 4: AB+ and AB- */}
        <View style={styles.bloodTypeRow}>
          <View style={styles.bloodTypeCard}>
            <Text style={styles.bloodTypeLabel}>AB +</Text>
            <Text style={styles.bloodTypeCount}>87</Text>
            <Text style={styles.kantongLabel}>Kantong</Text>
          </View>
          <View style={styles.bloodTypeCard}>
            <Text style={styles.bloodTypeLabel}>AB -</Text>
            <Text style={styles.bloodTypeCount}>57</Text>
            <Text style={styles.kantongLabel}>Kantong</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B01E1E",
  },
  headerSection: {
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#8E1616",
    textAlign: "center",
  },
  totalBloodCard: {
    backgroundColor: "#B01E1E",
    borderRadius: 16,
    padding: 25,
    marginHorizontal: 20,
    marginTop: -15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  bloodInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  bloodIcon: {
    width: 100,
    height: 80,
    resizeMode: "contain",
  },
  bloodTextContainer: {
    alignItems: "flex-end",
  },
  bloodInfoTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  bloodCountContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  bloodCount: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#fff",
    marginRight: 8,
  },
  kantongText: {
    fontSize: 18,
    color: "#fff",
  },
  searchFilterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 15,
  },
  searchInputContainer: {
    flex: 1,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 15,
    fontSize: 16,
  },
  searchIconButton: {
    padding: 10,
  },
  searchIcon: {
    fontSize: 20,
    color: "#888",
  },
  typeDropdown: {
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    width: "30%",
    justifyContent: "space-between",
  },
  typeDropdownText: {
    fontSize: 16,
    color: "#000",
  },
  dropdownIcon: {
    fontSize: 12,
    color: "#888",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  bloodTypeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  bloodTypeCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 15,
    width: "48%",
    alignItems: "center",
    paddingVertical: 20,
  },
  bloodTypeLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#8E1616",
    marginBottom: 10,
  },
  bloodTypeCount: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
  },
  kantongLabel: {
    fontSize: 16,
    color: "#000",
    marginTop: 5,
  },
});
