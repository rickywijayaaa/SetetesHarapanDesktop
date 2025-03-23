import React from 'react';
import LottieView from 'lottie-react-native';
import { View, StyleSheet, Dimensions } from 'react-native';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <LottieView
        autoPlay
        loop={false}
        speed={0.5}
        source={require('../assets/animations/SplashScreen.json')}
        style={styles.animation}
        resizeMode="cover"
      
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  animation: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});