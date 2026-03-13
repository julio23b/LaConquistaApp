import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const { signInWithEmail, signInWithGoogle, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const result = await signInWithEmail({ email, password });
    if (result.error) {
      Alert.alert('Error', result.error);
      return;
    }
  };

  const handleGoogle = async () => {
    const result = await signInWithGoogle();
    if (result.error) Alert.alert('Error', result.error);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.primaryButton} onPress={handleLogin} disabled={loading}>
        <Text style={styles.primaryText}>{loading ? 'Cargando...' : 'Ingresar con email'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.googleButton} onPress={handleGoogle}>
        <Text style={styles.googleText}>Continuar con Google</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.link}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Crear cuenta</Text>
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
  googleButton: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#175560', padding: 14, borderRadius: 12, marginTop: 10 },
  googleText: { color: '#175560', textAlign: 'center', fontWeight: '700' },
  link: { marginTop: 14, color: '#175560', textAlign: 'center' },
});
