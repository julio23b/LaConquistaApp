import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchPendingCommerces, updateCommerceApproval } from '../services/adminService';

export default function AdminApprovalScreen() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const data = await fetchPendingCommerces();
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleUpdate = async (id, status) => {
    try {
      await updateCommerceApproval(id, status);
      setItems(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Panel Admin · Aprobación de comercios</Text>
      <Text style={styles.subtitle}>{loading ? 'Cargando...' : `Pendientes: ${items.length}`}</Text>

      <FlatList
        data={items}
        keyExtractor={item => String(item.id)}
        contentContainerStyle={{ paddingBottom: 24 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.meta}>{item.category}</Text>
            <Text style={styles.meta}>{item.address}</Text>

            <View style={styles.actions}>
              <TouchableOpacity style={styles.approve} onPress={() => handleUpdate(item.id, 'approved')}>
                <Text style={styles.actionText}>Aprobar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.reject} onPress={() => handleUpdate(item.id, 'rejected')}>
                <Text style={styles.actionText}>Rechazar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 22, fontWeight: '700', color: '#175560' },
  subtitle: { marginTop: 6, color: '#526066', marginBottom: 16 },
  card: { backgroundColor: '#f3f6f7', borderRadius: 12, padding: 12, marginBottom: 10 },
  name: { fontSize: 16, fontWeight: '700' },
  meta: { color: '#526066', marginTop: 4 },
  actions: { flexDirection: 'row', gap: 8, marginTop: 12 },
  approve: { flex: 1, backgroundColor: '#175560', borderRadius: 10, padding: 10 },
  reject: { flex: 1, backgroundColor: '#b03a2e', borderRadius: 10, padding: 10 },
  actionText: { textAlign: 'center', color: '#fff', fontWeight: '700' },
});
