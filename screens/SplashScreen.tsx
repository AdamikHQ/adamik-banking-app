import React, {useEffect} from 'react';
import {View, Animated, Easing, StyleSheet} from 'react-native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';

interface SplashScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

const SplashScreen: React.FC<SplashScreenProps> = ({navigation}) => {
  const logoAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(logoAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();

    // Navigate to Login screen after 5 seconds
    const timer = setTimeout(() => {
      navigation.navigate('Login');
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigation]);

  const spin = logoAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assets/logo.png')}
        style={[
          styles.logo,
          {
            transform: [{rotate: spin}],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  logo: {
    width: 225, // Increased from 150 to 225 (50% larger)
    height: 225, // Increased from 150 to 225 (50% larger)
    resizeMode: 'contain',
  },
});

export default SplashScreen;
