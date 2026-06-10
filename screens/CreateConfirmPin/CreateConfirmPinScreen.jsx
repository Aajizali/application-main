import React, { useState } from 'react';
import AppColors from '../../constants/AppColors';
import AppFonts from '../../constants/AppFonts';
import CustomBackButton from '../../constants/CustomBackButton';
import CustomButton from '../../constants/CustomButton';
import CustomText from '../../constants/CustomText';
import { responsiveWidth, responsiveHeight } from '../../constants/Responsive';

import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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

function CreateConfirmPinScreen({ onBack, onDone }) {
  const [pin, setPin] = useState('');
  const [createdPin, setCreatedPin] = useState('');
  const isConfirming = createdPin.length === PIN_LENGTH;

  const handleKey = value => {
    setPin(prev => {
      if (prev.length >= PIN_LENGTH) return prev;
      const next = prev + value;

      if (next.length === PIN_LENGTH) {
        if (!isConfirming) {
          // First pass done — move to confirm step
          setCreatedPin(next);
          setTimeout(() => setPin(''), 150);
        } else if (next === createdPin) {
          onDone?.(next);
        } else {
          // Mismatch — retry confirmation
          setTimeout(() => setPin(''), 150);
        }
      }
      return next;
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={AppColors.color000000}
      />

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
        {isConfirming ? 'Re-enter your 4\ndigit pin' : 'Create a 4-digit pin'}
      </CustomText>

      <CustomText
        color={AppColors.color8B8B8B}
        fontSize={16}
        style={{ marginTop: responsiveHeight(15) }}
      >
        This helps secure your accounts
      </CustomText>

      {/* PIN dots + keypad anchored to the lower part of the screen */}
      <View
        style={[
          styles.bottomGroup,
          isConfirming && { marginTop: responsiveHeight(70) },
        ]}
      >
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

export default CreateConfirmPinScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: AppColors.color1A1A1A,
    paddingHorizontal: responsiveWidth(20),
  },

  bottomGroup: {
    marginTop: responsiveHeight(100),
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

  keypad: {
    marginBottom: responsiveHeight(10),
  },
  keypadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: responsiveHeight(10),
  },
  keySpacer: {
    width: '32%',
  },
});
