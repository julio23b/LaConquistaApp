import { pendingCommercesSeed } from '../data/pendingCommerces';
import { SUPABASE_ANON_KEY, SUPABASE_URL, hasSupabaseConfig } from '../config/supabase';

const headers = {
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  'Content-Type': 'application/json',
};

export const fetchPendingCommerces = async () => {
  if (!hasSupabaseConfig) return pendingCommercesSeed;

  const response = await fetch(`${SUPABASE_URL}/rest/v1/commerces?status=eq.pending&select=*`, {
    headers,
  });

  if (!response.ok) return pendingCommercesSeed;
  return response.json();
};

export const updateCommerceApproval = async (commerceId, status) => {
  if (!hasSupabaseConfig) {
    return { id: commerceId, status };
  }

  const response = await fetch(`${SUPABASE_URL}/rest/v1/commerces?id=eq.${commerceId}`, {
    method: 'PATCH',
    headers: { ...headers, Prefer: 'return=representation' },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) throw new Error('No se pudo actualizar el estado del comercio.');
  const [updated] = await response.json();
  return updated;
};
