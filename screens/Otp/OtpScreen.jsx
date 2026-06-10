import React, { useRef, useState } from 'react';
import AppColors from '../../constants/AppColors';
import AppFonts from '../../constants/AppFonts';
import CustomButton from '../../constants/CustomButton';
import CustomTextField from '../../constants/CustomTextField';
import CustomBackButton from '../../constants/CustomBackButton';
import CustomText from '../../constants/CustomText';
import { responsiveWidth, responsiveHeight } from '../../constants/Responsive';

import {
  Dimensions,
  Pressable,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const GLOW_HEIGHT = 360;
const OTP_LENGTH = 4;

function OtpScreen({ onBack, onVerify, onResend }) {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const inputRefs = useRef([]);

  const handleChange = (text, index) => {
    const digit = text.replace(/[^0-9]/g, '').slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);

    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = ({ nativeEvent }, index) => {
    if (nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={AppColors.color000000}
      />

      {/* Golden radial glow behind the bottom button */}
      <Svg
        style={styles.bottomGlow}
        width={SCREEN_WIDTH}
        height={GLOW_HEIGHT}
        pointerEvents="none"
      >
        <Defs>
          <RadialGradient
            id="bottomGlow"
            cx={SCREEN_WIDTH / 2}
            cy={GLOW_HEIGHT - 5}
            rx={SCREEN_WIDTH * 0.72}
            ry={190}
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset="0" stopColor={AppColors.colorF9BD38} stopOpacity={0.50} />
            <Stop offset="0.35" stopColor={AppColors.colorF9BD38} stopOpacity={0.22} />
            <Stop offset="0.65" stopColor={AppColors.colorF9BD38} stopOpacity={0.05} />
            <Stop offset="1" stopColor={AppColors.colorF9BD38} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Rect x="0" y="0" width={SCREEN_WIDTH} height={GLOW_HEIGHT} fill="url(#bottomGlow)" />
      </Svg>

      <CustomBackButton
        onPress={onBack}
        size={64}
        iconSize={24}
        marginTop={30}
      />

      <CustomText
        color={AppColors.colorFFFFFF}
        fontSize={42}
        fontFamily={AppFonts.regular}
        style={{ marginTop: responsiveHeight(40) }}
      >
        Enter OTP
      </CustomText>

      <CustomText
        color={AppColors.color8B8B8B}
        fontSize={15}
        style={{ marginTop: responsiveHeight(10) }}
      >
        We've sent you and OTP to your email address
      </CustomText>

      <View style={styles.otpRow}>
        {otp.map((digit, index) => {
          const isActive = focusedIndex === index;
          return (
            <CustomTextField
              key={index}
              ref={ref => {
                inputRefs.current[index] = ref;
              }}
              fontSize={20}
              textColor={AppColors.colorF9BD38}
              borderRadius={16}
              backgroundColor={
                isActive ? 'transparent' : AppColors.colorFFFFFF03
              }
              height={75}
              bordered
              borderColor={isActive ? AppColors.colorF9BD38 : 'transparent'}
              placeholder="X"
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
              selectionColor={AppColors.colorF9BD38}
              value={digit}
              onChangeText={text => handleChange(text, index)}
              onKeyPress={event => handleKeyPress(event, index)}
              onFocus={() => setFocusedIndex(index)}
              onBlur={() => setFocusedIndex(-1)}
              containerStyle={styles.otpBox}
            />
          );
        })}
      </View>

      <Pressable hitSlop={8} onPress={onResend} style={styles.resend}>
        <CustomText
          fontSize={15}
          color={AppColors.colorF9BD38}
          underline={true}
        >
          Resend OTP
        </CustomText>
      </Pressable>

      <View style={styles.footer}>
        <CustomButton
          height={60}
          textSize={16}
          fontFamily={AppFonts.semiBold}
          title="Verify Now"
          backgroundColor={AppColors.colorEBC300}
          textColor={AppColors.color1A1A1A}
          onPress={onVerify}
        />
      </View>
    </SafeAreaView>
  );
}

export default OtpScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: AppColors.color1A1A1A,
    paddingHorizontal: responsiveWidth(20),
  },

  bottomGlow: {
    position: 'absolute',
    bottom: -responsiveHeight(35),
    left: -responsiveWidth(20),
  },

  otpRow: {
    flexDirection: 'row',
    gap: responsiveWidth(14),
    marginTop: responsiveHeight(30),
  },
  otpBox: {
    flex: 1,
    paddingHorizontal: 0,
  },

  resend: {
    alignSelf: 'flex-start',
    marginTop: responsiveHeight(28),
  },

  footer: {
    marginTop: 'auto',
    paddingBottom: responsiveHeight(50),
  },
});
