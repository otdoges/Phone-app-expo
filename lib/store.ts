import { create } from 'zustand';
import { supabase } from './supabase';

interface UserState {
  virtualBalance: number;
  totalLost: number;
  darkMode: boolean;
  setVirtualBalance: (balance: number) => void;
  setTotalLost: (lost: number) => void;
  toggleDarkMode: () => void;
  syncWithSupabase: () => Promise<void>;
}

export const useStore = create<UserState>((set, get) => ({
  virtualBalance: 10000,
  totalLost: 0,
  darkMode: true,
  setVirtualBalance: (balance) => {
    set({ virtualBalance: balance });
    const { syncWithSupabase } = get();
    syncWithSupabase();
  },
  setTotalLost: (lost) => {
    set({ totalLost: lost });
    const { syncWithSupabase } = get();
    syncWithSupabase();
  },
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  syncWithSupabase: async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { virtualBalance, totalLost } = get();
      const { error } = await supabase
        .from('user_stats')
        .upsert(
          {
            user_id: user.id,
            virtual_balance: virtualBalance,
            total_lost: totalLost,
          },
          { onConflict: 'user_id' }
        );

      if (error) {
        console.error('Error syncing with Supabase:', error);
      }
    } catch (error) {
      console.error('Error in syncWithSupabase:', error);
    }
  },
}));