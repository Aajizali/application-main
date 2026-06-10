import React, { useEffect, useState, useCallback } from 'react';
import { BackHandler, Dimensions, Platform, StyleSheet, View } from 'react-native';

import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import LoadingScreen from './screens/Loading/LoadingScreen';
import WelcomeScreen from './screens/Welcome/WelcomeScreen';
import LoginScreen from './screens/Login/LoginScreen';
import RegisterScreen from './screens/Register/RegisterScreen';
import ForgetPassScreen from './screens/ForgetPass/ForgetPassScreen';
import OtpScreen from './screens/Otp/OtpScreen';
import DashboardScreen from './screens/Dashboard/DashboardScreen';

// ─── Constants ────────────────────────────────────────────────────────────────

// Ensure web always has valid metrics so SafeAreaProvider doesn't hang
const WEB_INITIAL_METRICS = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

function App() {
  const [screenStack, setScreenStack] = useState(['loading']);
  const [otpSource, setOtpSource] = useState('login');
  const screenHeight = Dimensions.get('window').height;
  const translateY = useSharedValue(screenHeight);

  const pushScreen = (nextScreen) => {
    setScreenStack((prev) => [...prev, nextScreen]);
  };

  const popScreen = useCallback(() => {
    setScreenStack((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  }, []);

  useEffect(() => {
    if (Platform.OS !== 'android') return;

    const onBackPress = () => {
      // If current screen is the base one, don't pop.
      if (screenStack.length <= 1) return false;

      popScreen();
      return true; // we handled the back press
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    };
  }, [popScreen, screenStack.length]);



  useEffect(() => {
    const timer = setTimeout(() => {
      setScreenStack(['welcome']);
      translateY.value = withSpring(0, {
        damping: 18,
        stiffness: 110,
        mass: 1,
        overshootClamping: false,
      });
    }, 2500);

    return () => clearTimeout(timer);
  }, [translateY]);

  const welcomeStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const currentScreen = screenStack[screenStack.length - 1];

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return (
          <LoginScreen
            onBack={popScreen}
            onSubmit={() => pushScreen('dashboard')}
            onForgotPassword={() => pushScreen('forgetPass')}
          />
        );
      case 'register':
        return (
          <RegisterScreen
            onBack={popScreen}
            onContinue={() => {
              setOtpSource('register');
              pushScreen('otp');
            }}
          />
        );
      case 'forgetPass':
        return (
          <ForgetPassScreen
            onBack={popScreen}
            onVerify={() => {
              setOtpSource('forgetPass');
              pushScreen('otp');
            }}
          />
        );
      case 'otp':
        return (
          <OtpScreen
            onBack={popScreen}
            onVerify={() => pushScreen('dashboard')}
            onResend={() => {}}
          />
        );
      case 'dashboard':
        return <DashboardScreen />;
      case 'welcome':
      default:
        return (
          <Animated.View style={styles.fullScreen}>
            <Animated.View style={[styles.welcomeLayer, welcomeStyle]}>
              <WelcomeScreen
                onLogin={() => pushScreen('login')}
                onRegister={() => pushScreen('register')}
              />
            </Animated.View>
          </Animated.View>
        );
    }
  };

  return (
    <SafeAreaProvider
      style={styles.root}
      initialMetrics={Platform.OS === 'web' ? WEB_INITIAL_METRICS : initialWindowMetrics}
    >
      {currentScreen === 'loading' ? <LoadingScreen onFinished={() => setScreenStack(['welcome'])} /> : renderScreen()}
    </SafeAreaProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000000',
  },
  fullScreen: {
    flex: 1,
    backgroundColor: '#000000',
  },
  welcomeLayer: {
    flex: 1,
    backgroundColor: '#000000',
  },
});
