# Radar Comercial Once

Aplicación móvil para descubrir comercios en Once.

## Funcionalidades
- Buscar comercios.
- Explorar categorías.
- Ver comercios en mapa.
- Consultar por WhatsApp.
- Guardar favoritos.
- Navegar hacia el local con Google Maps.
- Registro e inicio de sesión con email (Supabase Auth).
- Inicio con Google (OAuth en Supabase).
- Recuperación de contraseña por email.
- Panel admin para aprobar o rechazar comercios pendientes.

## Stack
- React Native
- Expo
- Supabase
- Algolia
- Google Maps

## Variables de entorno
Configurar en `.env`:

- `EXPO_PUBLIC_SUPABASE_URL`
- `EXPO_PUBLIC_SUPABASE_ANON_KEY`

## Navegación principal
- Home
- Buscar
- Mapa
- Favoritos
- Perfil

## Flujo de usuario
Abrir app → Login/Registro → Explorar categorías → Buscar comercio → Ver perfil del comercio → Consultar por WhatsApp → Ir al local.
