import React from 'react';
import { Text, StyleSheet } from 'react-native';
import AppColors from '../constants/AppColors';
import AppFonts from './AppFonts';
import { responsiveWidth as responsiveFontSize } from './Responsive';

function CustomText({
  children,
  style,
  color = AppColors.colorFFFFFF,
  fontSize = 14,
  fontFamily = AppFonts.regular,
  underline = false,
  ...props
}) {
  return (
    <Text
      style={[
        styles.text,
        {
          color,
          fontSize: responsiveFontSize(fontSize),
          fontFamily,
          textDecorationLine: underline ? 'underline' : 'none',
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}

export default CustomText;

const styles = StyleSheet.create({
  text: {},
});