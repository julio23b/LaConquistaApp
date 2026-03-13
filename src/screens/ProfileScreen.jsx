import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function ProfileScreen({ navigation }) {
  const { user, signOut } = useAuth();

  const email = user?.email || 'Sin email';
  const isAdmin = user?.user_metadata?.role === 'admin' || email.endsWith('@admin.com');

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <Text style={styles.text}>Usuario: {email}</Text>

      <View style={styles.actions}>
        {isAdmin && (
          <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.navigate('AdminApproval')}>
            <Text style={styles.primaryText}>Ir al panel admin</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.secondaryBtn} onPress={signOut}>
          <Text style={styles.secondaryText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold' },
  text: { marginTop: 12, color: '#526066' },
  actions: { marginTop: 20, gap: 10 },
  primaryBtn: { backgroundColor: '#175560', padding: 12, borderRadius: 10 },
  primaryText: { color: '#fff', textAlign: 'center', fontWeight: '700' },
  secondaryBtn: { backgroundColor: '#f3f6f7', padding: 12, borderRadius: 10 },
  secondaryText: { textAlign: 'center', color: '#1d2629', fontWeight: '700' },
});
