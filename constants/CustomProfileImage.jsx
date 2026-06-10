import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import AppColors from './AppColors';
import CustomText from './CustomText';
import { responsiveWidth, responsiveHeight } from './Responsive';

/**
 * Props
 *   localImage    — string URI  e.g. "file:///path/to/photo.jpg"
 *   networkImage  — remote URL  e.g. "https://..."
 *   assetImage    — require()'d asset  e.g. require('../assets/images/avatar.png')
 *   SvgComponent  — imported SVG component  e.g. AppAssets.someIcon
 *   size          — diameter in dp  (default 96)
 *   borderWidth   — (default 2)
 *   borderColor   — (default white)
 *   backgroundColor
 *   showEditIcon  — show pencil badge (default false)
 *   onEditTap     — called when pencil badge is pressed
 *   onTap         — called when image is pressed
 *   onLongPress   — called on long-press
 */
export default function CustomProfileImage({
  localImage,
  networkImage,
  assetImage,
  SvgComponent,
  size = 96,
  borderWidth = 2,
  borderColor = AppColors.colorFFFFFF,
  backgroundColor,
  fallbackIconColor = AppColors.color8A8A8A,
  showEditIcon = false,
  onEditTap,
  onTap,
  onLongPress,
}) {
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Reset error when the URL changes
  useEffect(() => {
    setHasError(false);
  }, [networkImage]);

  const buildImage = () => {
    // 1. Local file
    if (localImage) {
      return (
        <Image
          source={{ uri: localImage }}
          style={styles.fill}
          resizeMode="cover"
        />
      );
    }

    // 2. Network image with loading indicator
    if (networkImage && networkImage.length > 0 && !hasError) {
      return (
        <View style={styles.fill}>
          {loading && (
            <ActivityIndicator
              size="small"
              color={AppColors.colorC9A84C}
              style={StyleSheet.absoluteFill}
            />
          )}
          <Image
            source={{ uri: networkImage }}
            style={styles.fill}
            resizeMode="cover"
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
            onError={() => {
              setLoading(false);
              setHasError(true);
            }}
            fadeDuration={300}
          />
        </View>
      );
    }

    // 3. Local asset image
    if (assetImage) {
      return (
        <Image source={assetImage} style={styles.fill} resizeMode="cover" />
      );
    }

    // 4. SVG component
    if (SvgComponent) {
      return (
        <View style={styles.center}>
          <SvgComponent width={size * 0.45} height={size * 0.45} />
        </View>
      );
    }

    // 5. Fallback person silhouette
    return (
      <View style={styles.center}>
        {/* Head */}
        <View
          style={{
            width: size * 0.32,
            height: size * 0.32,
            borderRadius: size * 0.16,
            backgroundColor: fallbackIconColor,
          }}
        />
        {/* Body */}
        <View
          style={{
            width: size * 0.5,
            height: size * 0.26,
            borderTopLeftRadius: size * 0.25,
            borderTopRightRadius: size * 0.25,
            backgroundColor: fallbackIconColor,
            marginTop: size * 0.04,
          }}
        />
      </View>
    );
  };

  return (
    <View style={{ width: size, height: size }}>
      <TouchableOpacity
        activeOpacity={onTap ? 0.8 : 1}
        onPress={onTap}
        onLongPress={onLongPress}
        style={[
          styles.circle,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth,
            borderColor,
            backgroundColor: backgroundColor ?? 'transparent',
          },
        ]}
      >
        {buildImage()}
      </TouchableOpacity>

      {showEditIcon && (
        <TouchableOpacity
          style={styles.editBtn}
          onPress={onEditTap}
          activeOpacity={0.8}
        >
          <CustomText style={styles.editIcon}>✏</CustomText>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fill: {
    width: '100%',
    height: '100%',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editBtn: {
    position: 'absolute',
    bottom: 0,
    right: responsiveWidth(5),
    width: responsiveWidth(24),
    height: responsiveWidth(24),
    borderRadius: responsiveWidth(12),
    backgroundColor: AppColors.colorFFFFFF,
    borderWidth: responsiveWidth(2),
    borderColor: AppColors.colorC9A84C + '80',
    alignItems: 'center',
    justifyContent: 'center',
    padding: responsiveWidth(3),
  },
  editIcon: {
    fontSize: responsiveWidth(11),
    color: AppColors.colorC9A84C,
  },
});
