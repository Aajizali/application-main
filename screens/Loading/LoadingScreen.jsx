import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated as RNAnimated,
  Dimensions,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import AppAssets from '../../constants/AppAssets';
import AppColors from '../../constants/AppColors';
import { wp, hp, responsiveHeight } from '../../constants/Responsive';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const GLOW_HEIGHT = 460;

const LAUNCH_SPRING = {
  damping: 16,
  stiffness: 120,
  mass: 0.95,
  overshootClamping: false,
};

function LoadingScreen({ onFinished }) {
  const [showEnd, setShowEnd] = useState(false);
  const fadeStart = useRef(new RNAnimated.Value(1)).current;
  const fadeEnd = useRef(new RNAnimated.Value(0)).current;
  const launchProgress = useSharedValue(0);

  useEffect(() => {
    launchProgress.value = withSpring(1, LAUNCH_SPRING);

    // Phase 1: Wait 2 seconds, then transition to Loading (End)
    const timer1 = setTimeout(() => {
      setShowEnd(true);
      RNAnimated.parallel([
        RNAnimated.timing(fadeStart, {
          toValue: 0,
          duration: 450,
          useNativeDriver: Platform.OS !== 'web',
        }),
        RNAnimated.timing(fadeEnd, {
          toValue: 1,
          duration: 450,
          useNativeDriver: Platform.OS !== 'web',
        }),
      ]).start();
    }, 2000);

    // Phase 2: Wait 1.5 seconds in Loading (End) state, then trigger onFinished
    const timer2 = setTimeout(() => {
      if (onFinished) {
        onFinished();
      }
    }, 3950); // 2000ms + 450ms transition + 1500ms display time

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [fadeEnd, fadeStart, launchProgress, onFinished]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: launchProgress.value,
    transform: [
      { translateY: (1 - launchProgress.value) * SCREEN_HEIGHT },
      { scale: 0.92 + 0.08 * launchProgress.value },
      { rotate: `${(1 - launchProgress.value) * 1.5}deg` },
    ],
  }));

  return (
    <Animated.View style={[styles.screenRoot, animatedStyle]}>
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={AppColors.colorFFFFFF}
      />

      {/* ── Loading (Start) Layer ── */}
      <RNAnimated.View style={[styles.layer, styles.layerStart, { opacity: fadeStart }]}>
        <View style={styles.logoCenterWrap}>
          <Image
            source={AppAssets.appLogo}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.spinnerWrap}>
          <ActivityIndicator size="large" color={AppColors.colorF9BD38} />
        </View>
      </RNAnimated.View>

      {/* ── Loading (End) Layer ── */}
      <RNAnimated.View 
        pointerEvents={showEnd ? 'auto' : 'none'}
        style={[
          styles.layer, 
          styles.layerEnd, 
          { 
            opacity: fadeEnd 
          }
        ]}
      >
        {/* Golden radial glow overlaying the logo and the top of the watch */}
        <Svg
          style={styles.glow}
          width={SCREEN_WIDTH}
          height={GLOW_HEIGHT}
          pointerEvents="none"
        >
          <Defs>
            <RadialGradient
              id="topGlow"
              cx={SCREEN_WIDTH / 2}
              cy={30}
              rx={SCREEN_WIDTH * 0.65}
              ry={300}
              gradientUnits="userSpaceOnUse"
            >
              <Stop offset="0" stopColor={AppColors.colorF9BD38} stopOpacity={0.38} />
              <Stop offset="0.25" stopColor={AppColors.colorF9BD38} stopOpacity={0.2} />
              <Stop offset="0.5" stopColor={AppColors.colorF9BD38} stopOpacity={0.08} />
              <Stop offset="0.75" stopColor={AppColors.colorF9BD38} stopOpacity={0.02} />
              <Stop offset="1" stopColor={AppColors.colorF9BD38} stopOpacity={0} />
            </RadialGradient>
          </Defs>
          <Rect
            x="0"
            y="0"
            width={SCREEN_WIDTH}
            height={GLOW_HEIGHT}
            fill="url(#topGlow)"
          />
        </Svg>

        <View style={styles.logoCenterWrap}>
          <Image
            source={AppAssets.appLogo}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.watchContainer}>
          <Image
            source={AppAssets.watchImage}
            style={styles.watchImage}
            resizeMode="contain"
          />
        </View>
      </RNAnimated.View>
      </SafeAreaView>
    </Animated.View>
  );
}

export default LoadingScreen;

const styles = StyleSheet.create({
  screenRoot: {
    flex: 1,
    backgroundColor: '#eee7e7',
    overflow: 'hidden',
  },
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 50,
    paddingHorizontal: 24,
  },
  layer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  layerStart: {
    backgroundColor: '#000000',
  },
  layerEnd: {
    backgroundColor: '#000000',
  },
  logoCenterWrap: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  logo: {
    width: wp('50%'),
    height: hp('5%'),
  },
  spinnerWrap: {
    position: 'absolute',
    bottom: hp('12%'),
    alignSelf: 'center',
  },
  glow: {
    position: 'absolute',
    top: -responsiveHeight(50),
    left: 0,
  },
  watchContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  watchImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
});
