import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commerces } from '../data/commerces';

export default function MapScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Mapa de comercios</Text>
      <Text style={styles.subtitle}>Próximo paso: integrar Google Maps con pines y clustering.</Text>
      {commerces.map(item => (
        <View key={item.id} style={styles.pinCard}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.coords}>
            {item.lat}, {item.lng}
          </Text>
        </View>
      ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold' },
  subtitle: { marginTop: 8, color: '#526066', marginBottom: 16 },
  pinCard: { padding: 12, backgroundColor: '#f2f5f6', borderRadius: 10, marginBottom: 10 },
  name: { fontWeight: '600' },
  coords: { color: '#526066', marginTop: 4 },
});
