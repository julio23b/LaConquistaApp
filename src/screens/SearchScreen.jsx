import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '../components/SearchBar';
import CommerceCard from '../components/CommerceCard';
import { commerces } from '../data/commerces';

export default function SearchScreen() {
  const [query, setQuery] = useState('');

  const result = useMemo(
    () => commerces.filter(item => item.name.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Buscar comercios</Text>
        <SearchBar value={query} onChangeText={setQuery} onFilterPress={() => {}} />
        <View style={styles.grid}>
          {result.map(commerce => (
            <CommerceCard key={commerce.id} commerce={commerce} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginHorizontal: 20, marginTop: 12 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 8,
    paddingBottom: 20,
  },
});
