// components/Navbar.tsx
import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { usePathname, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import DonorIcon from "./DonorIcon";

// Define the routes and their corresponding icons
const routes = [
  { path: "/home", icon: "home-outline", activeIcon: "home", label: "Home" },
  {
    path: "/pencarian_stok",
    icon: "search-outline",
    activeIcon: "search",
    label: "Search",
  },
  {
    path: "/kegiatan_donor",
    icon: "water-outline",
    activeIcon: "water",
    isDonorIcon: true,
    label: "Donor",
  },
  {
    path: "/pesan",
    icon: "paper-plane-outline",
    activeIcon: "paper-plane",
    label: "Inbox",
  },
  {
    path: "/rewardprofile",
    icon: "person-outline",
    activeIcon: "person",
    label: "Profile",
  },
];

const NavItem = ({ item, isActive, onPress }) => {
  // Animation values
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate when active state changes
    Animated.timing(translateY, {
      toValue: isActive ? -12 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isActive]);

  return (
    <TouchableOpacity
      style={styles.tabItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Animated container for icon and text */}
      <Animated.View
        style={[
          styles.tabContent,
          {
            transform: [{ translateY }],
          },
        ]}
      >
        {/* Icon */}
        <View style={styles.iconContainer}>
          {item.isDonorIcon ? (
            <DonorIcon color={isActive ? "#B21E1E" : "#7D7D7D"} size={24} />
          ) : (
            <Ionicons
              name={isActive ? item.activeIcon : item.icon}
              size={24}
              color={isActive ? "#B21E1E" : "#7D7D7D"}
            />
          )}
        </View>

        {/* Label */}
        <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>
          {item.label}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Helper to check if a path is active
  const isPathActive = (path: string) => {
    // For home route, check for exact match
    if (path === "/" && pathname === "/") return true;

    // For other routes, check if the current path starts with this route path
    if (path !== "/" && pathname.startsWith(path)) return true;

    return false;
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbarContent}>
        {routes.map((item) => (
          <NavItem
            key={item.path}
            item={item}
            isActive={isPathActive(item.path)}
            onPress={() => router.push(item.path)}
          />
        ))}
      </View>

      {/* Add a subtle shadow on top of navbar */}
      <View style={styles.navbarShadow} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 75,
    backgroundColor: "white",
    position: "relative",
    paddingBottom: 8, // Add padding for iOS home bar
    borderTopWidth: 1,
    borderColor: "#F0F0F0",
    paddingTop: 10
  },
  navbarContent: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: "100%",
  },
  navbarShadow: {
    position: "absolute",
    top: -10,
    left: 0,
    right: 0,
    height: 10,
    backgroundColor: "transparent",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.65,
    elevation: 5,
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: "100%",
    position: "relative",
  },
  tabContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 48,
    height: 32,
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
    color: "#7D7D7D",
  },
  activeTabLabel: {
    color: "#B21E1E",
    fontWeight: "600",
  },
});

export default Navbar;
