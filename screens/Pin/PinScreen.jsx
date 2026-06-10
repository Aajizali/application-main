import React, { useState } from 'react';
import AppColors from '../../constants/AppColors';
import AppFonts from '../../constants/AppFonts';
import CustomText from '../../constants/CustomText';
import { responsiveWidth, responsiveHeight } from '../../constants/Responsive';

import { Pressable, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../constants/CustomButton';

const PIN_LENGTH = 4;
const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

function KeyButton({ value, onPress }) {
  return (
    <CustomButton
      borderRadius={18}
      title={value}
      onPress={() => onPress(value)}
      gradientColors={[AppColors.colorF9BD38, AppColors.color302A1D]}
      textColor={AppColors.color1A1A1A}
      textSize={27}
      fontFamily={AppFonts.semiBold}
      height={80}
      width="32%"
    />
  );
}

function PinScreen({ onLogout, onReset, onPinSuccess }) {
  const [pin, setPin] = useState('');

  const handleKey = value => {
    setPin(prev => {
      const newPin = prev.length < PIN_LENGTH ? prev + value : prev;
      if (newPin.length === PIN_LENGTH) {
        onPinSuccess();
      }
      return newPin;
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={AppColors.color000000}
      />

      <View style={styles.topBar}>
        <Pressable hitSlop={8} onPress={onReset}>
          <CustomText fontSize={16} color={AppColors.color8B8B8B}>
            Reset
          </CustomText>
        </Pressable>
        <Pressable hitSlop={8} onPress={onLogout}>
          <CustomText fontSize={16} color={AppColors.colorF9BD38}>
            Logout
          </CustomText>
        </Pressable>
      </View>

      <CustomText
        color={AppColors.colorFFFFFF}
        fontSize={42}
        fontFamily={AppFonts.regular}
        style={{ marginTop: responsiveHeight(70), lineHeight: responsiveWidth(50) }}
      >
        {'Enter your 4 digit\npin'}
      </CustomText>

      <CustomText
        color={AppColors.color8B8B8B}
        fontSize={16}
        style={{ marginTop: responsiveHeight(30) }}
      >
        This helps secure your accounts
      </CustomText>

      {/* PIN dots + keypad anchored to the lower part of the screen */}
      <View style={styles.bottomGroup}>
        <View style={styles.dotsRow}>
          {Array.from({ length: PIN_LENGTH }).map((_, i) => (
            <View
              key={i}
              style={[styles.dot, pin.length > i && styles.dotFilled]}
            />
          ))}
        </View>

        <View style={styles.keypad}>
          <View style={styles.keypadRow}>
            {KEYS.slice(0, 3).map(k => (
              <KeyButton key={k} value={k} onPress={handleKey} />
            ))}
          </View>
          <View style={styles.keypadRow}>
            {KEYS.slice(3, 6).map(k => (
              <KeyButton key={k} value={k} onPress={handleKey} />
            ))}
          </View>
          <View style={styles.keypadRow}>
            {KEYS.slice(6, 9).map(k => (
              <KeyButton key={k} value={k} onPress={handleKey} />
            ))}
          </View>
          <View style={styles.keypadRow}>
            <View style={styles.keySpacer} />
            <KeyButton value="0" onPress={handleKey} />
            <View style={styles.keySpacer} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default PinScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: AppColors.color1A1A1A,
    paddingHorizontal: responsiveWidth(20),
  },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: responsiveHeight(20),
  },

  bottomGroup: {
    marginTop: responsiveHeight(80),
  },

  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: responsiveWidth(19),
    marginBottom: responsiveHeight(45),
  },
  dot: {
    width: responsiveWidth(27),
    height: responsiveWidth(27),
    borderRadius: responsiveWidth(11),
    backgroundColor: AppColors.colorFFFFFF20,
  },
  dotFilled: {
    backgroundColor: AppColors.colorF9BD38,
  },

  keypad: {},
  keypadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: responsiveHeight(10),
  },
  keySpacer: {
    width: '32%',
  },
});
