import React, {useRef, useEffect} from 'react';
import {
  View,
  Animated,
  Easing,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';

const Loader = () => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start the spin animation loop
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000, // 1 second for a full rotation
        easing: Easing.linear,
        useNativeDriver: true, // Ensure the animation runs on the native thread
      }),
    ).start();
  }, [spinValue]);

  // Interpolating the spinValue into a rotation value from 0deg to 360deg
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'], // Rotate from 0 to 360 degrees
  });

  return (
    <View style={styles.loaderContainer}>
      <View>
        {/* Spinner */}
        <Animated.View style={{transform: [{rotate: spin}]}}>
          <View style={styles.customLoader} />
        </Animated.View>
      </View>
      <Text style={styles.loaderText}>Getting New Tasks.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop : '25%'
  },
  customLoader: {
    width: 60,
    height: 60,
    borderWidth: 5,
    borderColor: '#f5f5f5', // Green border
    borderRadius: 25, // Circular shape
    borderTopColor: 'transparent', // Creates the spinner effect
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: '#f5f5f5', // Dark text for "Loading..."
  },
});

export default Loader;
