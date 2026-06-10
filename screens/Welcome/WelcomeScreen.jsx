import React from 'react';
import AppAssets from '../../constants/AppAssets';
import AppColors from '../../constants/AppColors';
import AppFonts from '../../constants/AppFonts';
import CustomButton from '../../constants/CustomButton';
import CustomText from '../../constants/CustomText';
import {
  wp,
  hp,
  responsiveWidth,
  responsiveHeight,
} from '../../constants/Responsive';

import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const GLOW_HEIGHT = 460;

function WelcomeScreen({ onLogin, onRegister }) {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={AppColors.color000000}
      />

      <Image
        source={AppAssets.appLogo}
        style={styles.logo}
        resizeMode="contain"
      />

      <Image
        source={AppAssets.watchImage}
        style={styles.heroImage}
        resizeMode="stretch"
      />

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

      <CustomText
        style={styles.title}
        color={AppColors.colorFFFFFF}
        fontSize={46}
        fontFamily={AppFonts.regular}
      >
        {'Lets Get Into\nFlipMazaal'}
      </CustomText>

      <CustomText
        style={styles.subtitle}
        color={AppColors.color8B8B8B}
        fontSize={16}
        fontFamily={AppFonts.regular}
      >
        Welcome To FlipMazaal
      </CustomText>

      <View style={styles.actions}>
        <CustomButton
          height={58}
          textSize={16}
          fontFamily={AppFonts.semiBold}
          title="Login"
          backgroundColor={AppColors.colorF9BD38}
          textColor={AppColors.color111111}
          onPress={onLogin}
        />

        <CustomButton
          height={58}
          textSize={16}
          fontFamily={AppFonts.semiBold}
          title="New To FlipMazaal"
          backgroundColor={AppColors.color1c1c1c}
          textColor={AppColors.colorFFFFFF}
          onPress={onRegister}
        />
      </View>
    </SafeAreaView>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: AppColors.color0A0A0A03,
    paddingHorizontal: responsiveWidth(15),
  },

  // Radial golden glow overlay at the top
  glow: {
    position: 'absolute',
    top: -responsiveHeight(50),
    left: -responsiveWidth(15),
  },

  hero: {
    height: '55%',
    width: '100%',
    overflow: 'hidden',
  },
  heroImage: {
    width: wp('90%'),
    height: hp('35%'),
    alignSelf: 'center',
  },

  logo: {
    alignSelf: 'center',
    width: wp('45%'),
    height: hp('3.0%'),
    marginBottom: responsiveHeight(40),
    marginTop: responsiveHeight(50),
  },

  title: {
    lineHeight: responsiveWidth(55),
    marginBottom: responsiveHeight(10),
  },
  subtitle: {
    marginBottom: responsiveHeight(50),
  },
  actions: {
    gap: responsiveHeight(15),
  },
});
