import React, { createContext, useContext, useMemo, useState } from 'react';
import { Linking } from 'react-native';
import { SUPABASE_ANON_KEY, SUPABASE_URL, hasSupabaseConfig } from '../config/supabase';

const AuthContext = createContext(null);

const authHeaders = {
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  'Content-Type': 'application/json',
};

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);

  const signInWithEmail = async ({ email, password }) => {
    if (!hasSupabaseConfig) {
      return { error: 'Faltan EXPO_PUBLIC_SUPABASE_URL y EXPO_PUBLIC_SUPABASE_ANON_KEY.' };
    }

    setLoading(true);
    try {
      const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) return { error: data.error_description || data.msg || 'No se pudo iniciar sesión.' };
      setSession(data);
      return { data };
    } finally {
      setLoading(false);
    }
  };

  const signUpWithEmail = async ({ email, password }) => {
    if (!hasSupabaseConfig) {
      return { error: 'Faltan EXPO_PUBLIC_SUPABASE_URL y EXPO_PUBLIC_SUPABASE_ANON_KEY.' };
    }

    setLoading(true);
    try {
      const response = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) return { error: data.msg || 'No se pudo registrar el usuario.' };
      return { data };
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async email => {
    if (!hasSupabaseConfig) {
      return { error: 'Faltan EXPO_PUBLIC_SUPABASE_URL y EXPO_PUBLIC_SUPABASE_ANON_KEY.' };
    }

    setLoading(true);
    try {
      const response = await fetch(`${SUPABASE_URL}/auth/v1/recover`, {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        const data = await response.json();
        return { error: data.msg || 'No se pudo enviar recuperación de contraseña.' };
      }
      return { data: true };
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    if (!hasSupabaseConfig) {
      return { error: 'Faltan EXPO_PUBLIC_SUPABASE_URL y EXPO_PUBLIC_SUPABASE_ANON_KEY.' };
    }

    const redirectTo = 'https://supabase.com';
    const googleAuthUrl = `${SUPABASE_URL}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(redirectTo)}`;
    await Linking.openURL(googleAuthUrl);
    return { data: true };
  };

  const signOut = () => setSession(null);

  const value = useMemo(
    () => ({
      session,
      user: session?.user || null,
      loading,
      signInWithEmail,
      signUpWithEmail,
      resetPassword,
      signInWithGoogle,
      signOut,
      isAuthenticated: Boolean(session?.access_token),
    }),
    [session, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
