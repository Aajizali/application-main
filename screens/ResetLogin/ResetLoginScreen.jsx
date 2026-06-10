import React, { useState } from 'react';
import AppColors from '../../constants/AppColors';
import AppFonts from '../../constants/AppFonts';
import CustomButton from '../../constants/CustomButton';
import CustomTextField from '../../constants/CustomTextField';
import CustomBackButton from '../../constants/CustomBackButton';
import CustomText from '../../constants/CustomText';
import { responsiveWidth, responsiveHeight } from '../../constants/Responsive';

import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

import CountryCodePicker, { COUNTRIES } from '../../constants/CountryCodePicker';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const GLOW_HEIGHT = 360;

function ResetLoginScreen({ onBack, onResetPin }) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [focusedField, setFocusedField] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);

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
        Enter your login{'\n'}details
      </CustomText>

      <CustomTextField
        fontSize={16}
        textColor={AppColors.colorFFFFFF}
        borderRadius={16}
        backgroundColor={AppColors.colorFFFFFF03}
        height={70}
        bordered
        borderColor={
          focusedField === 'phone' ? AppColors.colorF9BD38 : 'transparent'
        }
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
        onFocus={() => setFocusedField('phone')}
        onBlur={() => setFocusedField(null)}
        marginTop={30}
        leftElement={
          <CountryCodePicker
            selectedCountry={selectedCountry}
            onSelect={setSelectedCountry}
          />
        }
      />

      <CustomTextField
        fontSize={16}
        textColor={AppColors.colorFFFFFF}
        borderRadius={16}
        backgroundColor={AppColors.colorFFFFFF03}
        height={65}
        bordered
        borderColor={
          focusedField === 'password' ? AppColors.colorF9BD38 : 'transparent'
        }
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        onFocus={() => setFocusedField('password')}
        onBlur={() => setFocusedField(null)}
        marginTop={16}
        leftElement={
          <View style={styles.lock}>
            <View style={styles.lockShackle} />
            <View style={styles.lockBody} />
          </View>
        }
      />

      <View style={styles.footer}>
        <CustomButton
          height={60}
          textSize={16}
          fontFamily={AppFonts.semiBold}
          title="Reset Pin"
          backgroundColor={AppColors.colorEBC300}
          textColor={AppColors.color1A1A1A}
          onPress={onResetPin}
        />
      </View>
    </SafeAreaView>
  );
}

export default ResetLoginScreen;

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

  lock: {
    alignItems: 'center',
    width: 18,
  },
  lockShackle: {
    width: 11,
    height: 8,
    borderWidth: 1.6,
    borderBottomWidth: 0,
    borderColor: AppColors.color8B8B8B,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    marginBottom: -1,
  },
  lockBody: {
    width: 16,
    height: 13,
    borderRadius: 3,
    borderWidth: 1.6,
    borderColor: AppColors.color8B8B8B,
  },

  footer: {
    marginTop: 'auto',
    paddingBottom: responsiveHeight(50),
  },
});
