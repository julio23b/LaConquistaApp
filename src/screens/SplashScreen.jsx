import React from 'react';
import { SafeAreaView, Text, StyleSheet, TouchableOpacity } from 'react-native';

const SplashScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Radar Comercial Once</Text>
      <Text style={styles.subtitle}>Descubrí comercios, categorías y ubicaciones en un solo lugar.</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.replace('MainTabs')}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#175560',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 12,
    textAlign: 'center',
    color: '#526066',
    marginBottom: 36,
  },
  button: {
    backgroundColor: '#175560',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
