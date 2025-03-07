// src/store/onlineUsersStore.ts
import { create } from 'zustand';
import { createClient } from '@/util/supabase/client';

interface OnlineUsersState {
  onlineUsers: number[];
  initializePresence: (userId: number) => void;
  cleanupPresence: () => void;
}
interface PresenceState {
    [key: string]: { user_id: number }[];
}

export const useOnlineUsersStore = create<OnlineUsersState>((set) => {
  const supabase = createClient();
let channel: ReturnType<typeof supabase.channel> | null = null;

  return {
    onlineUsers: [],
    
    initializePresence: (userId: number) => {
      // Cleanup any existing channel before creating a new one
      if (channel) {
        supabase.removeChannel(channel);
      }
      
      // Create a new presence channel
      channel = supabase
        .channel("global_presence")
        .on('presence', { event: 'sync' }, () => {
          const newState: PresenceState = channel?.presenceState() || {};
          
          const userIds: number[] = [];
          for (const id in newState) {
            userIds.push(newState[id][0].user_id);
          }
          
          set({ onlineUsers: [...new Set(userIds)] });
        })
        .subscribe(async (status) => {
          if (status !== 'SUBSCRIBED') { return; }
          
          // Track the current user as online
          const presenceTrackStatus = await channel?.track({
            online_at: new Date().toISOString(),
            user_id: userId
          });
          
          console.log("Presence tracking status:", presenceTrackStatus);
        });
    },
    
    cleanupPresence: () => {
      if (channel) {
        supabase.removeChannel(channel);
        channel = null;
      }
    }
  };
});