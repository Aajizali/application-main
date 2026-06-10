import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import { responsiveWidth, responsiveHeight } from './Responsive';
import AppFonts from './AppFonts';
import CustomText from './CustomText';

function CustomButton({
  title,
  onPress,
  backgroundColor,
  gradientColors,
  textColor,
  textSize = 16,
  fontFamily = AppFonts.semiBold,
  height = 56,
  width = '100%',
  borderRadius = 15,
  marginTop = 0,
}) {
  const rawId = React.useId();
  const gradId = `grad${rawId.replace(/[^a-zA-Z0-9]/g, '')}`;
  const hasGradient = Array.isArray(gradientColors) && gradientColors.length > 1;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: hasGradient ? undefined : backgroundColor,
          height: responsiveHeight(height),
          width: width,
          borderRadius: responsiveWidth(borderRadius),
          marginTop: responsiveHeight(marginTop),
        },
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      {hasGradient && (
        <Svg style={StyleSheet.absoluteFill}>
          <Defs>
            <LinearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              {gradientColors.map((c, i) => (
                <Stop
                  key={i}
                  offset={i / (gradientColors.length - 1)}
                  stopColor={c}
                />
              ))}
            </LinearGradient>
          </Defs>
          <Rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            rx={responsiveWidth(borderRadius)}
            fill={`url(#${gradId})`}
          />
        </Svg>
      )}
      <CustomText color={textColor} fontSize={textSize} fontFamily={fontFamily}>
        {title}
      </CustomText>
    </Pressable>
  );
}

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  pressed: {
    opacity: 0.8,
  },
});
