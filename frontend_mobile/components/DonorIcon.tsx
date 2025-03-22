// components/DonorIcon.tsx
import React from "react";
import { Image, StyleSheet } from "react-native";

interface DonorIconProps {
  color: string;
  size?: number;
}

const DonorIcon: React.FC<DonorIconProps> = ({ color, size = 24 }) => {
  return (
    <Image
      source={require("../assets/images/donor-icon.png")}
      style={[styles.icon, { tintColor: color, width: size, height: size }]}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    resizeMode: "contain",
  },
});

export default DonorIcon;
