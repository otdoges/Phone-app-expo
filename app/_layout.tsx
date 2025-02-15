import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Session } from '@supabase/supabase-js';
import { useStore } from '../lib/store';

export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(null);
  const setVirtualBalance = useStore((state) => state.setVirtualBalance);
  const setTotalLost = useStore((state) => state.setTotalLost);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        loadUserStats(session.user.id);
      }
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        loadUserStats(session.user.id);
      }
    });
  }, []);

  const loadUserStats = async (userId: string) => {
    const { data } = await supabase
      .from('user_stats')
      .select('virtual_balance, total_lost')
      .eq('user_id', userId)
      .single();

    if (data) {
      setVirtualBalance(data.virtual_balance);
      setTotalLost(data.total_lost);
    }
  };

  return (
    <Stack>
      <Stack.Screen 
        name="(auth)" 
        options={{ headerShown: false }} 
        redirect={session ? true : undefined} 
      />
      <Stack.Screen 
        name="(tabs)" 
        options={{ headerShown: false }} 
        redirect={!session ? '/(auth)' : undefined}
      />
    </Stack>
  );
}