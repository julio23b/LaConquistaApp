import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';

export default function ForgotPasswordScreen() {
  const { resetPassword, loading } = useAuth();
  const [email, setEmail] = useState('');

  const handleReset = async () => {
    const result = await resetPassword(email);
    if (result.error) {
      Alert.alert('Error', result.error);
      return;
    }
    Alert.alert('Recuperación enviada', 'Revisá tu email para restablecer tu contraseña.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Recuperar contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity style={styles.primaryButton} onPress={handleReset} disabled={loading}>
        <Text style={styles.primaryText}>{loading ? 'Cargando...' : 'Enviar recuperación'}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 20, color: '#175560' },
  input: { backgroundColor: '#f2f5f6', borderRadius: 12, padding: 12, marginBottom: 12 },
  primaryButton: { backgroundColor: '#175560', padding: 14, borderRadius: 12, marginTop: 8 },
  primaryText: { color: '#fff', textAlign: 'center', fontWeight: '700' },
});
