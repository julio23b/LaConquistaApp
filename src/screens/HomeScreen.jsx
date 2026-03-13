import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '../components/SearchBar';
import CommerceCard from '../components/CommerceCard';
import { commerces } from '../data/commerces';
import { categories } from '../data/categories';

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredCommerces = useMemo(
    () =>
      commerces.filter(
        commerce =>
          commerce.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          (!selectedCategory || commerce.category === selectedCategory)
      ),
    [searchQuery, selectedCategory]
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Radar Comercial Once</Text>
          <Text style={styles.subtitle}>Descubrí comercios destacados y cercanos.</Text>
        </View>

        <SearchBar value={searchQuery} onChangeText={setSearchQuery} onFilterPress={() => {}} />

        <View style={styles.buttonGroup}>
          {categories.map(cat => (
            <TouchableOpacity
              key={cat.id}
              style={[styles.categoryButton, selectedCategory === cat.name && styles.activeCategoryButton]}
              onPress={() => setSelectedCategory(selectedCategory === cat.name ? null : cat.name)}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  selectedCategory === cat.name && styles.activeCategoryButtonText,
                ]}
              >
                {cat.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.commerceGrid}>
            {filteredCommerces.map(commerce => (
              <CommerceCard key={commerce.id} commerce={commerce} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  scrollContainer: { paddingBottom: 24 },
  header: { paddingHorizontal: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#000' },
  subtitle: { fontSize: 16, color: '#8a9597', marginTop: 4 },
  sectionContainer: { paddingHorizontal: 20, marginTop: 20 },
  commerceGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 16,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#d3e6e4',
    marginTop: 8,
  },
  activeCategoryButton: { backgroundColor: '#175560' },
  categoryButtonText: { color: '#175560', fontWeight: '500' },
  activeCategoryButtonText: { color: '#fff' },
});
