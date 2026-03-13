import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet } from 'react-native';

export default function FavoritesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Favoritos</Text>
      <Text style={styles.text}>Guardá comercios para encontrarlos rápido.</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold' },
  text: { marginTop: 12, color: '#526066' },
});
