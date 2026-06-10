import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import AppColors from '../constants/AppColors';
import AppAssets from '../constants/AppAssets';
import { responsiveWidth, responsiveHeight } from './Responsive';

const BackArrowIcon = AppAssets.backArrowIcon;

function CustomBackButton({
  onPress,
  iconSize = 24,
  size = 44,
  backgroundColor = AppColors.colorFFFFFF10,
  iconColor = AppColors.colorFFFFFF,
  marginTop = 0,
  marginBottom = 0,
  style,
}) {
  const buttonSize = responsiveWidth(size);
  const iconDimension = responsiveWidth(iconSize);

  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      style={({ pressed }) => [
        styles.button,
        {
          width: buttonSize,
          height: buttonSize,
          borderRadius: buttonSize / 3.6,
          backgroundColor,
          marginTop: responsiveHeight(marginTop),
          marginBottom: responsiveHeight(marginBottom),
        },
        pressed && styles.pressed,
        style,
      ]}
    >
      <BackArrowIcon
        width={iconDimension}
        height={iconDimension}
        color={iconColor}
      />
    </Pressable>
  );
}

export default CustomBackButton;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  pressed: {
    opacity: 0.8,
  },
});