import React, { useState } from 'react';
import AppAssets from '../../constants/AppAssets';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import AppColors from '../../constants/AppColors';
import AppFonts from '../../constants/AppFonts';
import CustomText from '../../constants/CustomText';
import CustomProfileImage from '../../constants/CustomProfileImage';
import CustomTextField from '../../constants/CustomTextField';
import CustomButton from '../../constants/CustomButton';
import { responsiveWidth, responsiveHeight } from '../../constants/Responsive';

const { width } = Dimensions.get('window');
const MenuSvg = AppAssets.menuIcon;
const BellSvg = AppAssets.bellIcon;
const MagnifierSvg = AppAssets.magnifierIcon;
const StarSvg = AppAssets.starIcon;
const HeartSvg = AppAssets.heartIcon;

// ─── Mock data ────────────────────────────────────────────────────
const CATEGORIES = ['All', 'Rolex', 'Brand Name', 'Brand Name'];
const BEST_DEALS = [
  {
    id: '1',
    title: 'Rolex Phantom Watch',
    price: '$120.00',
    rating: 5,
    image: require('../../assets/images/watch_image_two.png'),
  },
  {
    id: '2',
    title: 'Rolex Black Edition',
    price: '$240.00',
    rating: 4,
    image: require('../../assets/images/watch_image_two.png'),
  },
];
const OTHER_DEALS = [
  {
    id: '1',
    title: 'Rolex Phantom Watch',
    price: '$120.00',
    rating: 4.5,
    image: require('../../assets/images/watch_image.png'),
  },
  {
    id: '2',
    title: 'Rolex Phantom Watch',
    price: '$120.00',
    rating: 4.5,
    image: require('../../assets/images/watch_image.png'),
  },
  {
    id: '3',
    title: 'Rolex Phantom Watch',
    price: '$120.00',
    rating: 4.5,
    image: require('../../assets/images/watch_image.png'),
  },
  {
    id: '4',
    title: 'Rolex Phantom Watch',
    price: '$120.00',
    rating: 4.5,
    image: require('../../assets/images/watch_image.png'),
  },
];

// ─── Small helpers ────────────────────────────────────────────────
const StarIcon = ({ filled }) => (
  <CustomText
    style={{
      color: filled ? AppColors.colorFFD700 : AppColors.color8A8A8A,
      fontSize: responsiveWidth(11),
    }}
  >
    ★
  </CustomText>
);

const HeartButton = () => (
  <View style={styles.heartBtn}>
    <CustomText style={styles.heartIcon}>♡</CustomText>
  </View>
);

// ─── Main Screen ──────────────────────────────────────────────────
export default function DashboardScreen() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [searchText, setSearchText] = useState('');

  const renderStars = count => {
    const full = Math.floor(count);
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon key={i} filled={i < full} />
    ));
  };

  const renderBestDealCard = ({ item }) => (
    <View style={styles.bestDealCard}>
      <View style={styles.bestDealCardBg} />
      <View style={styles.bestDealInfo}>
        <CustomText fontSize={24} color={AppColors.colorFFFFFF}>
          {item.title}
        </CustomText>
        <View style={styles.priceRatingRow}>
          <CustomText fontSize={16} color={AppColors.colorFFFFFF50}>
            {item.price}
          </CustomText>
          <StarSvg width={responsiveWidth(14)} height={responsiveWidth(14)} />
          <CustomText fontSize={14} color={AppColors.colorFFFFFF50}>
            {item.rating}
          </CustomText>
        </View>
        <CustomButton
          title="Grab Deals  ›"
          backgroundColor={AppColors.colorF9BD38}
          textColor={AppColors.color1A1A1A}
          textSize={14}
          fontFamily={AppFonts.medium}
          height={38}
          width={responsiveWidth(140)}
          borderRadius={18}
          marginTop={15}
        />
      </View>
      <View style={styles.bestDealImgWrap}>
        <TouchableOpacity style={styles.heartBtn}>
          <HeartSvg width={responsiveWidth(16)} height={responsiveWidth(16)} />
        </TouchableOpacity>
      </View>
      <Image
        source={item.image}
        style={styles.bestDealWatchImg}
        resizeMode="contain"
      />
    </View>
  );

  const renderOtherDealCard = ({ item }) => (
    <View style={styles.otherCardWrapper}>
      <View style={styles.otherCard}>
        <TouchableOpacity style={styles.otherHeartBtn}>
          <HeartSvg width={responsiveWidth(14)} height={responsiveWidth(14)} />
        </TouchableOpacity>
        <Image
          source={item.image}
          style={styles.otherWatchImg}
          resizeMode="contain"
        />
      </View>
      <CustomText fontSize={16} color={AppColors.colorAAAAAA} numberOfLines={2}>
        {item.title}
      </CustomText>
      <View style={styles.otherCardBottom}>
        <CustomText fontSize={14} color={AppColors.colorFFFFFF}>
          {item.price}
        </CustomText>
        <StarSvg width={responsiveWidth(13)} height={responsiveWidth(13)} />
        <CustomText style={styles.otherCardRating}>{item.rating}</CustomText>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={AppColors.color000000}
      />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ── */}
        <View style={styles.header}>
          <TouchableOpacity>
            <MenuSvg
              width={responsiveWidth(32)}
              height={responsiveHeight(12)}
            />
          </TouchableOpacity>
          <View style={styles.logoWrap} pointerEvents="none">
            <Image
              source={AppAssets.appLogo}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.notifBtn}>
              <BellSvg
                width={responsiveWidth(24)}
                height={responsiveHeight(24)}
              />
            </TouchableOpacity>
            <CustomProfileImage
              size={responsiveWidth(48)}
              borderWidth={responsiveWidth(2)}
              borderColor={AppColors.colorC9A84C}
              fallbackIconColor={AppColors.colorC9A84C}
            />
          </View>
        </View>

        {/* ── Greeting ── */}
        <CustomText
          style={{
            marginTop: responsiveHeight(10),
            marginHorizontal: responsiveWidth(15),
          }}
          fontSize={16}
          color={AppColors.colorAAAAAA}
        >
          Hey 👋 John
        </CustomText>

        {/* ── Search bar ── */}
        <CustomTextField
          placeholder="Search"
          placeholderColor={AppColors.color8A8A8A}
          value={searchText}
          onChangeText={setSearchText}
          height={62}
          fontSize={16}
          textColor={AppColors.colorFFFFFF}
          backgroundColor={AppColors.colorFFFFFF08}
          borderRadius={12}
          marginTop={15}
          containerStyle={styles.searchField}
          rightElement={
            <MagnifierSvg
              width={responsiveWidth(21)}
              height={responsiveWidth(21)}
            />
          }
        />

        {/* ── Category pills ── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.pillsRow}
        >
          {CATEGORIES.map((cat, index) => (
            <TouchableOpacity
              key={`${cat}-${index}`}
              style={[
                styles.pill,
                activeCategoryIndex === index && styles.pillActive,
              ]}
              onPress={() => setActiveCategoryIndex(index)}
              activeOpacity={0.8}
            >
              <CustomText
                style={[
                  styles.pillText,
                  activeCategoryIndex === index && styles.pillTextActive,
                ]}
              >
                {cat}
              </CustomText>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ── Best Flip Deals ── */}
        <CustomText
          fontSize={16}
          color={AppColors.colorAAAAAA}
          style={{
            marginTop: responsiveHeight(20),
            marginHorizontal: responsiveWidth(15),
          }}
        >
          Best Flip Deals
        </CustomText>

        <FlatList
          data={BEST_DEALS}
          keyExtractor={i => i.id}
          renderItem={renderBestDealCard}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.bestDealsList}
          snapToInterval={width - responsiveWidth(48)}
          decelerationRate="fast"
        />

        {/* ── Other Deals ── */}
        <CustomText style={styles.sectionTitle}>Other deals</CustomText>
        <FlatList
          data={OTHER_DEALS}
          keyExtractor={i => i.id}
          renderItem={renderOtherDealCard}
          numColumns={2}
          scrollEnabled={false}
          columnWrapperStyle={styles.otherGrid}
          contentContainerStyle={styles.otherGridContainer}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: AppColors.color1A1A1A,
    paddingTop: StatusBar.currentHeight || 0,
  },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: responsiveHeight(32) },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveWidth(20),
    height: responsiveHeight(60),
  },
  logoWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: responsiveWidth(140),
    height: responsiveHeight(20),
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsiveWidth(10),
  },
  notifBtn: {
    width: responsiveWidth(32),
    height: responsiveHeight(32),
    alignItems: 'center',
    justifyContent: 'center',
  },

  searchField: {
    marginHorizontal: responsiveWidth(15),
  },

  // Category pills
  pillsRow: {
    paddingHorizontal: responsiveWidth(15),
    gap: responsiveWidth(10),
    marginTop: responsiveHeight(20),
  },
  pill: {
    paddingHorizontal: responsiveWidth(23),
    paddingVertical: responsiveHeight(8),
    borderRadius: responsiveWidth(16),
    backgroundColor: AppColors.colorF9BD3810,
    borderWidth: 1,
    borderColor: AppColors.colorF9BD3810,
  },
  pillActive: {
    backgroundColor: AppColors.colorF9BD38,
    borderColor: AppColors.colorC9A84C,
  },
  pillText: {
    color: AppColors.colorF9BD38,
    fontSize: responsiveWidth(13),
    fontWeight: '500',
  },
  pillTextActive: {
    color: AppColors.color1A1A1A,
    fontWeight: '500',
    fontSize: responsiveWidth(14),
    fontFamily: AppFonts.medium,
  },

  // Best deals
  bestDealsList: {
    paddingHorizontal: responsiveWidth(20),
    gap: responsiveWidth(16),
    paddingTop: responsiveHeight(40),
    paddingBottom: responsiveHeight(40),
  },
  bestDealCard: {
    width: width - responsiveWidth(48),
    flexDirection: 'row',
    overflow: 'visible',
    height: responsiveHeight(190),
    paddingLeft: responsiveWidth(20),
    paddingVertical: responsiveHeight(20),
    alignItems: 'center',
  },
  bestDealCardBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: AppColors.color302A1D,
    borderRadius: responsiveWidth(18),
  },
  bestDealInfo: {
    flex: 1,
    justifyContent: 'center',
  },

  priceRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsiveWidth(6),
    marginTop: responsiveHeight(12),
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveHeight(14),
  },
  ratingCount: {
    color: AppColors.colorFFFFFF,
    fontSize: responsiveWidth(13),
    fontWeight: '600',
  },
  bestDealImgWrap: {
    width: responsiveWidth(170),
    height: responsiveHeight(190),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'visible',
  },
  bestDealWatchImg: {
    width: responsiveWidth(210),
    height: responsiveHeight(260),
    position: 'absolute',
    top: -responsiveHeight(35),
    right: -responsiveWidth(10),
  },

  // Heart button
  heartBtn: {
    position: 'absolute',
    top: responsiveHeight(15),
    right: responsiveWidth(15),
    zIndex: 10,
    width: responsiveWidth(32),
    height: responsiveHeight(32),
    borderRadius: responsiveWidth(15),
    backgroundColor: AppColors.colorFFFFFF10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartIcon: {
    color: AppColors.color8A8A8A,
    fontSize: responsiveWidth(14),
  },

  // Other deals grid
  otherGridContainer: { paddingHorizontal: responsiveWidth(20) },
  otherGrid: {
    gap: responsiveWidth(14),
    marginBottom: responsiveHeight(14),
  },
  otherCardWrapper: {
    flex: 1,
    maxWidth: (width - responsiveWidth(54)) / 2,
  },
  otherCard: {
    backgroundColor: AppColors.color2A2A2A,
    borderRadius: responsiveWidth(16),
    aspectRatio: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: responsiveHeight(8),
  },
  otherHeartBtn: {
    position: 'absolute',
    top: responsiveHeight(10),
    right: responsiveWidth(10),
    zIndex: 10,
    width: responsiveWidth(30),
    height: responsiveWidth(30),
    borderRadius: responsiveWidth(15),
    backgroundColor: AppColors.colorFFFFFF10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  otherWatchImg: {
    width: '80%',
    height: '80%',
  },
  otherCardTitle: {
    color: AppColors.colorFFFFFF,
    fontSize: responsiveWidth(13),
    fontFamily: AppFonts.regular,
    marginBottom: responsiveHeight(6),
  },
  otherCardBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsiveWidth(5),
  },
  otherCardPrice: {
    color: AppColors.colorFFFFFF,
    fontWeight: '700',
    fontSize: responsiveWidth(13),
  },
  otherCardRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsiveWidth(4),
  },
  otherCardRating: {
    color: AppColors.colorB0B0B0,
    fontSize: responsiveWidth(12),
  },
});
