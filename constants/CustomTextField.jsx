import React, { forwardRef } from 'react';
import AppColors from './AppColors';
import AppFonts from './AppFonts';
import { StyleSheet, TextInput, View } from 'react-native';
import { responsiveWidth, responsiveHeight } from './Responsive';

const CustomTextField = forwardRef(function CustomTextField({
  value,
  onChangeText,
  onFocus,
  onBlur,
  onKeyPress,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  maxLength,
  textAlign,
  selectionColor,
  leftElement,
  rightElement,
  bordered = false,
  borderColor = AppColors.colorF9BD38,
  borderRadius = 14,
  backgroundColor,
  height = 58,
  marginTop = 0,
  marginBottom = 0,
  fontSize = 15,
  textColor = AppColors.colorFFFFFF,
  placeholderColor = AppColors.color8B8B8B,
  containerStyle,
}, ref) {
  // Use the passed background; otherwise default to transparent (bordered)
  // or the dark fill (non-bordered).
  const resolvedBackground =
    backgroundColor ?? (bordered ? 'transparent' : AppColors.color1c1c1c);

  return (
    <View
      style={[
        styles.container,
        {
          height: responsiveHeight(height),
          marginTop: responsiveHeight(marginTop),
          marginBottom: responsiveHeight(marginBottom),
          borderRadius: responsiveWidth(borderRadius),
          backgroundColor: resolvedBackground,
        },
        bordered && { borderWidth: 1.3, borderColor: borderColor, borderStyle: 'solid' },
        containerStyle,
      ]}
    >
      {leftElement}
      <TextInput
        ref={ref}
        style={[
          styles.input,
          { color: textColor, fontSize: responsiveWidth(fontSize) },
          leftElement && styles.inputWithLeft,
        ]}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        maxLength={maxLength}
        textAlign={textAlign}
        selectionColor={selectionColor}
        value={value}
        onChangeText={onChangeText}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyPress={onKeyPress}
      />
      {rightElement}
    </View>
  );
});

export default CustomTextField;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(20),
  },

  input: {
    flex: 1,
    fontFamily: AppFonts.regular,
    paddingVertical: 0,
    // Suppress the browser's default blue focus ring on web (react-native-web renders TextInput as <input>)
    outlineStyle: 'none',
  },

  inputWithLeft: {
    marginLeft: responsiveWidth(12),
  },
});
