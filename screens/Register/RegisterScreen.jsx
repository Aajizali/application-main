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
  Pressable,
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

function Checkbox({ checked, onToggle, children }) {
  return (
    <Pressable style={styles.checkRow} onPress={onToggle} hitSlop={6}>
      <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
        {checked && <View style={styles.checkMark} />}
      </View>
      <CustomText
        fontSize={16}
        color={AppColors.color8B8B8B}
        style={styles.checkLabel}
      >
        {children}
      </CustomText>
    </Pressable>
  );
}

function RegisterScreen({ onBack, onContinue }) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSeller, setIsSeller] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
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
            id="registerGlow"
            cx={SCREEN_WIDTH / 2}
            cy={GLOW_HEIGHT - 5}
            rx={SCREEN_WIDTH * 0.72}
            ry={190}
            gradientUnits="userSpaceOnUse"
          >
            <Stop
              offset="0"
              stopColor={AppColors.colorF9BD38}
              stopOpacity={0.5}
            />
            <Stop
              offset="0.35"
              stopColor={AppColors.colorF9BD38}
              stopOpacity={0.22}
            />
            <Stop
              offset="0.65"
              stopColor={AppColors.colorF9BD38}
              stopOpacity={0.05}
            />
            <Stop
              offset="1"
              stopColor={AppColors.colorF9BD38}
              stopOpacity={0}
            />
          </RadialGradient>
        </Defs>
        <Rect
          x="0"
          y="0"
          width={SCREEN_WIDTH}
          height={GLOW_HEIGHT}
          fill="url(#registerGlow)"
        />
      </Svg>

      <CustomBackButton
        onPress={onBack}
        size={64}
        iconSize={24}
        marginTop={30}
      />

      <CustomText
        color={AppColors.colorFFFFFF}
        fontSize={46}
        fontFamily={AppFonts.regular}
        style={{ marginTop: responsiveHeight(20) }}
      >
        Let's Get Started
      </CustomText>

      <CustomText
        color={AppColors.color8B8B8B}
        fontSize={15}
        style={{ marginTop: responsiveHeight(10) }}
      >
        Be a part of flip deals and get massive discounts on luxury watches
      </CustomText>

      <CustomTextField
        fontSize={16}
        textColor={AppColors.colorFFFFFF}
        borderRadius={16}
        backgroundColor={AppColors.colorFFFFFF03}
        height={65}
        bordered
        borderColor={
          focusedField === 'phone' ? AppColors.colorF9BD38 : 'transparent'
        }
        onFocus={() => setFocusedField('phone')}
        onBlur={() => setFocusedField(null)}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
        marginTop={28}
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
        onFocus={() => setFocusedField('password')}
        onBlur={() => setFocusedField(null)}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        marginTop={16}
        leftElement={
          <View style={styles.lock}>
            <View style={styles.lockShackle} />
            <View style={styles.lockBody} />
          </View>
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
          focusedField === 'confirmPassword' ? AppColors.colorF9BD38 : 'transparent'
        }
        onFocus={() => setFocusedField('confirmPassword')}
        onBlur={() => setFocusedField(null)}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        marginTop={16}
        leftElement={
          <View style={styles.lock}>
            <View style={styles.lockShackle} />
            <View style={styles.lockBody} />
          </View>
        }
      />

      <View style={{ marginTop: responsiveHeight(22) }}>
        <Checkbox checked={isSeller}
         style={{ backgroundColor: '#000' }} 
        onToggle={() => setIsSeller(v => !v)}>
          I'm a Seller
        </Checkbox>

        <Checkbox checked={agreeTerms} onToggle={() => setAgreeTerms(v => !v)}>
          {'Agree to the Terms & Conditions and Privacy\nPolicy'}
          
        </Checkbox>
      </View>

      <View style={styles.footer}>
        <CustomButton
          height={60}
          textSize={16}
          fontFamily={AppFonts.semiBold}
          title="Continue"
          backgroundColor={AppColors.colorEBC300}
          textColor={AppColors.color1A1A1A}
          onPress={onContinue}
        />
      </View>
    </SafeAreaView>
  );
}

export default RegisterScreen;

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

  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveHeight(16),
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    backgroundColor: AppColors.colorfdfdfd93,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: AppColors.colorF9BD38,
    borderColor: AppColors.colorF9BD38,
  },
  checkMark: {
    width: 5,
    height: 10,
    borderColor: AppColors.color1A1A1A,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    transform: [{ rotate: '45deg' }],
    marginTop: -2,
  },
  checkLabel: {
    flex: 1,
    lineHeight: responsiveWidth(22),
  },

  footer: {
    marginTop: 'auto',
    paddingBottom: responsiveHeight(50),
  },
});
