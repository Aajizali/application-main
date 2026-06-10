import React, { useState } from 'react';
import {
  Modal,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import AppColors from './AppColors';
import AppFonts from './AppFonts';
import { responsiveWidth, responsiveHeight } from './Responsive';

export const COUNTRIES = [
  { flag: '🇺🇸', name: 'United States', code: 'US', dialCode: '+1' },
  { flag: '🇬🇧', name: 'United Kingdom', code: 'GB', dialCode: '+44' },
  { flag: '🇨🇦', name: 'Canada', code: 'CA', dialCode: '+1' },
  { flag: '🇦🇺', name: 'Australia', code: 'AU', dialCode: '+61' },
  { flag: '🇮🇳', name: 'India', code: 'IN', dialCode: '+91' },
  { flag: '🇵🇰', name: 'Pakistan', code: 'PK', dialCode: '+92' },
  { flag: '🇦🇪', name: 'United Arab Emirates', code: 'AE', dialCode: '+971' },
  { flag: '🇸🇦', name: 'Saudi Arabia', code: 'SA', dialCode: '+966' },
  { flag: '🇩🇪', name: 'Germany', code: 'DE', dialCode: '+49' },
  { flag: '🇫🇷', name: 'France', code: 'FR', dialCode: '+33' },
  { flag: '🇯🇵', name: 'Japan', code: 'JP', dialCode: '+81' },
  { flag: '🇸🇬', name: 'Singapore', code: 'SG', dialCode: '+65' },
];

export default function CountryCodePicker({ selectedCountry, onSelect }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCountries = COUNTRIES.filter(
    item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.dialCode.includes(searchQuery) ||
      item.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (country) => {
    onSelect(country);
    setModalVisible(false);
    setSearchQuery('');
  };

  return (
    <>
      <Pressable
        style={({ pressed }) => [
          styles.countryPill,
          pressed && styles.pressed,
        ]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.countryText}>{selectedCountry.code}</Text>
        <View style={styles.dropdownChevron} />
      </Pressable>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <Pressable style={styles.modalContent} pointerEvents="auto">
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Select Country</Text>
              <Pressable
                onPress={() => setModalVisible(false)}
                hitSlop={10}
              >
                <Text style={styles.closeButton}>✕</Text>
              </Pressable>
            </View>

            <TextInput
              style={styles.searchBar}
              placeholder="Search country..."
              placeholderTextColor={AppColors.color8B8B8B}
              value={searchQuery}
              onChangeText={setSearchQuery}
              // Suppress browser outline on Web
              outlineStyle="none"
            />

            <FlatList
              data={filteredCountries}
              keyExtractor={item => item.code}
              contentContainerStyle={styles.listContainer}
              renderItem={({ item }) => (
                <Pressable
                  style={({ pressed }) => [
                    styles.countryItem,
                    pressed && styles.countryItemPressed,
                  ]}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={styles.itemCode}>{item.code}</Text>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemDialCode}>{item.dialCode}</Text>
                </Pressable>
              )}
              ListEmptyComponent={
                <View style={styles.emptyView}>
                  <Text style={styles.emptyText}>No countries found</Text>
                </View>
              }
            />
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  countryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderWidth: 1.2,
    borderColor: 'rgba(255,255,255,0.25)',
    borderRadius: 12,
  },
  pressed: {
    opacity: 0.75,
  },
  countryText: {
    color: AppColors.colorFFFFFF,
    fontSize: 13,
    fontFamily: AppFonts.regular,
    marginRight: 5,
  },
  dropdownChevron: {
    width: 6,
    height: 6,
    borderRightWidth: 1.5,
    borderBottomWidth: 1.5,
    borderColor: '#A0A0A0',
    transform: [{ rotate: '45deg' }],
    marginTop: -2,
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxWidth: 340,
    maxHeight: 480,
    backgroundColor: '#1E1E1E',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: AppColors.colorF9BD38 + '80', // Soft gold border
    padding: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  headerTitle: {
    color: AppColors.colorFFFFFF,
    fontSize: 18,
    fontFamily: AppFonts.semiBold,
  },
  closeButton: {
    color: AppColors.color8B8B8B,
    fontSize: 16,
  },
  searchBar: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 10,
    paddingHorizontal: 12,
    color: AppColors.colorFFFFFF,
    fontSize: 14,
    fontFamily: AppFonts.regular,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  listContainer: {
    paddingBottom: 10,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  countryItemPressed: {
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  itemCode: {
    color: AppColors.colorFFFFFF,
    fontSize: 13,
    fontFamily: AppFonts.semiBold,
    marginRight: 12,
    width: 32, // Fixed width for clean alignment with country names
  },
  itemName: {
    flex: 1,
    color: '#8A8A8A',
    fontSize: 14,
    fontFamily: AppFonts.regular,
  },
  itemDialCode: {
    color: AppColors.colorF9BD38,
    fontSize: 14,
    fontFamily: AppFonts.medium || AppFonts.semiBold,
  },
  emptyView: {
    paddingVertical: 30,
    alignItems: 'center',
  },
  emptyText: {
    color: AppColors.color8B8B8B,
    fontSize: 14,
    fontFamily: AppFonts.regular,
  },
});
