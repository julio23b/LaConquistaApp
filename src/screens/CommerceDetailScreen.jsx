import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Linking, ScrollView, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function CommerceDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { commerce } = route.params || {};
  const [isFavorite, setIsFavorite] = useState(false);

  if (!commerce) {
    return (
      <View style={styles.emptyContainer}>
        <Text>No se encontró el comercio.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const openUrl = async url => {
    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert('Error', 'No se pudo abrir el enlace.');
    }
  };

  const whatsappMessage = 'Hola, vi tu comercio en Radar Comercial Once y quisiera consultar.';

  return (
    <ScrollView style={styles.container}>
      <Image source={commerce.images[0]} style={styles.image} />
      <View style={styles.card}>
        <Text style={styles.name}>{commerce.name}</Text>
        <Text style={styles.category}>{commerce.category}</Text>
        <Text style={styles.info}>📍 {commerce.address}</Text>
        <Text style={styles.info}>📞 {commerce.phone}</Text>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => openUrl(`https://wa.me/${commerce.whatsapp.replace('+', '')}?text=${encodeURIComponent(whatsappMessage)}`)}
        >
          <Text style={styles.primaryButtonText}>💬 Consultar por WhatsApp</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => openUrl(`https://www.google.com/maps/dir/?api=1&destination=${commerce.lat},${commerce.lng}`)}
        >
          <Text style={styles.secondaryButtonText}>📍 Cómo llegar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={() => setIsFavorite(prev => !prev)}>
          <Text style={styles.secondaryButtonText}>
            {isFavorite ? '⭐ Quitar de favoritos' : '⭐ Guardar en favoritos'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={() => openUrl(commerce.website)}>
          <Text style={styles.secondaryButtonText}>🌐 Ver sitio web</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={() => openUrl(`tel:${commerce.phone}`)}>
          <Text style={styles.secondaryButtonText}>📞 Llamar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={() => Alert.alert('Fotos', 'Galería de fotos disponible en próximas iteraciones.') }>
          <Text style={styles.secondaryButtonText}>📸 Ver fotos</Text>
        </TouchableOpacity>

        <Text style={styles.descriptionTitle}>Descripción</Text>
        <Text style={styles.description}>{commerce.description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  backText: { color: '#175560', marginTop: 10 },
  image: { width: '100%', height: 250, resizeMode: 'cover' },
  card: { backgroundColor: '#fff', padding: 16, margin: 16, borderRadius: 12, elevation: 4 },
  name: { fontSize: 22, fontWeight: '700' },
  category: { color: '#175560', marginBottom: 12, marginTop: 2 },
  info: { fontSize: 15, marginBottom: 4 },
  primaryButton: { backgroundColor: '#175560', padding: 12, borderRadius: 12, marginTop: 12 },
  primaryButtonText: { color: '#fff', textAlign: 'center', fontWeight: '700' },
  secondaryButton: { backgroundColor: '#f2f5f6', padding: 12, borderRadius: 12, marginTop: 10 },
  secondaryButtonText: { color: '#1d2629', textAlign: 'center', fontWeight: '600' },
  descriptionTitle: { marginTop: 16, fontWeight: '700', fontSize: 16 },
  description: { marginTop: 6, color: '#526066', lineHeight: 20 },
});
