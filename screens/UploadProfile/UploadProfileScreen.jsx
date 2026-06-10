import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

// ─── Inline constants (replace with your AppColors / AppFonts imports) ────────
const AppColors = {
  color1A1A1A: '#1A1A1A',
  colorFFFFFF: '#FFFFFF',
  color8B8B8B: '#8B8B8B',
  colorEBC300: '#EBC300',
  colorF9BD38: '#F9BD38',
  colorFFFFFF03: 'rgba(255,255,255,0.03)',
  color000000: '#000000',
};

const AppFonts = {
  regular: 'System',
  semiBold: 'System',
};

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const GLOW_HEIGHT = 360;

// ─── Tiny helpers (replace with your Responsive util) ─────────────────────────
const responsiveWidth = (n) => n;
const responsiveHeight = (n) => n;

// ─── Avatar placeholder icon (pure Views, no external icon lib needed) ────────
function AvatarIcon() {
  return (
    <View style={avatar.wrapper}>
      {/* head */}
      <View style={avatar.head} />
      {/* shoulders */}
      <View style={avatar.shoulders} />
    </View>
  );
}

const avatar = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: 56,
    height: 56,
  },
  head: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: '#6B6B6B',
    marginBottom: 4,
  },
  shoulders: {
    width: 44,
    height: 22,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    borderWidth: 2,
    borderColor: '#6B6B6B',
    borderBottomWidth: 0,
  },
});

// ─── Upload icon (arrow + tray) ───────────────────────────────────────────────
function UploadIcon() {
  return (
    <View style={uploadIcon.wrapper}>
      {/* arrow shaft */}
      <View style={uploadIcon.shaft} />
      {/* arrow head */}
      <View style={uploadIcon.arrowHead} />
      {/* tray */}
      <View style={uploadIcon.tray} />
    </View>
  );
}

const uploadIcon = StyleSheet.create({
  wrapper: {
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 7,
  },
  shaft: {
    width: 2,
    height: 8,
    backgroundColor: AppColors.colorFFFFFF,
    marginBottom: -1,
  },
  arrowHead: {
    width: 8,
    height: 8,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: AppColors.colorFFFFFF,
    transform: [{ rotate: '-45deg' }],
    marginBottom: 2,
    marginTop: -9,
    marginLeft: 3,
  },
  tray: {
    width: 14,
    height: 2,
    backgroundColor: AppColors.colorFFFFFF,
    borderRadius: 1,
    marginTop: 2,
  },
});

// ─── Back button ──────────────────────────────────────────────────────────────
function BackButton({ onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.backBtn} hitSlop={8}>
      {/* chevron left */}
      <View style={styles.chevron} />
    </Pressable>
  );
}

// ─── Main screen ──────────────────────────────────────────────────────────────
function UploadProfilePhotoScreen({ onBack, onSkip, onUpload, onSaveContinue }) {
  const [photoUri, setPhotoUri] = useState(null);

  // In a real app wire this to launchImageLibrary / camera
  const handleUpload = () => {
    onUpload?.();
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <StatusBar barStyle="light-content" backgroundColor={AppColors.color000000} />

      {/* Golden radial glow at bottom */}
      <Svg
        style={styles.bottomGlow}
        width={SCREEN_WIDTH}
        height={GLOW_HEIGHT}
        pointerEvents="none"
      >
        <Defs>
          <RadialGradient
            id="profileGlow"
            cx={SCREEN_WIDTH / 2}
            cy={GLOW_HEIGHT - 5}
            rx={SCREEN_WIDTH * 0.72}
            ry={190}
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset="0"    stopColor={AppColors.colorF9BD38} stopOpacity={0.5} />
            <Stop offset="0.35" stopColor={AppColors.colorF9BD38} stopOpacity={0.22} />
            <Stop offset="0.65" stopColor={AppColors.colorF9BD38} stopOpacity={0.05} />
            <Stop offset="1"    stopColor={AppColors.colorF9BD38} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Rect x="0" y="0" width={SCREEN_WIDTH} height={GLOW_HEIGHT} fill="url(#profileGlow)" />
      </Svg>

      {/* Back */}
      <BackButton onPress={onBack} />

      {/* Heading */}
      <Text style={styles.title}>Upload Your{'\n'}Profile Photo</Text>
      <Text style={styles.subtitle}>Click or upload your profile photo</Text>

      {/* Avatar circle */}
      <Pressable style={styles.avatarCircle} onPress={handleUpload}>
        {photoUri ? (
          <Image source={{ uri: photoUri }} style={styles.avatarImage} />
        ) : (
          <AvatarIcon />
        )}
      </Pressable>

      {/* Footer */}
      <View style={styles.footer}>
        {/* Skip / Upload row */}
        <View style={styles.actionRow}>
          <Pressable style={styles.skipBtn} onPress={onSkip}>
            <Text style={styles.skipText}>Skip</Text>
          </Pressable>

          <Pressable style={styles.uploadBtn} onPress={handleUpload}>
            <UploadIcon />
            <Text style={styles.uploadText}>Upload</Text>
          </Pressable>
        </View>

        {/* Save & Continue */}
        <Pressable style={styles.continueBtn} onPress={onSaveContinue}>
          <Text style={styles.continueText}>Save &amp; Continue</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export default UploadProfilePhotoScreen;

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: AppColors.color1A1A1A,
    paddingHorizontal: responsiveWidth(20),
  },

  // ── Glow ──
  bottomGlow: {
    position: 'absolute',
    bottom: -responsiveHeight(35),
    left: -responsiveWidth(20),
  },

  // ── Back button ──
  backBtn: {
    marginTop: 30,
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevron: {
    width: 10,
    height: 10,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: AppColors.colorFFFFFF,
    transform: [{ rotate: '45deg' }],
    marginLeft: 4,
  },

  // ── Heading ──
  title: {
    marginTop: responsiveHeight(20),
    color: AppColors.colorFFFFFF,
    fontSize: 36,
    fontFamily: AppFonts.regular,
    lineHeight: 44,
  },
  subtitle: {
    marginTop: responsiveHeight(10),
    color: AppColors.color8B8B8B,
    fontSize: 14,
    fontFamily: AppFonts.regular,
  },

  // ── Avatar ──
  avatarCircle: {
    alignSelf: 'center',
    marginTop: responsiveHeight(48),
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255,255,255,0.07)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    width: 160,
    height: 160,
    borderRadius: 80,
  },

  // ── Footer ──
  footer: {
    marginTop: 'auto',
    paddingBottom: responsiveHeight(50),
  },

  // ── Skip / Upload row ──
  actionRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  skipBtn: {
    flex: 1,
    height: 54,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipText: {
    color: AppColors.colorFFFFFF,
    fontSize: 15,
    fontFamily: AppFonts.regular,
  },
  uploadBtn: {
    flex: 1,
    height: 54,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.08)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadText: {
    color: AppColors.colorFFFFFF,
    fontSize: 15,
    fontFamily: AppFonts.regular,
  },

  // ── Save & Continue ──
  continueBtn: {
    height: 60,
    borderRadius: 16,
    backgroundColor: AppColors.colorEBC300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueText: {
    color: AppColors.color1A1A1A,
    fontSize: 16,
    fontFamily: AppFonts.semiBold,
    fontWeight: '600',
  },
});