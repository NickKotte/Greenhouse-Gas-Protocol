import { User } from "@supabase/supabase-js";
import { atom } from "nanostores";
import supabase from '../supabase/supabaseClient';
import { notifications } from '@mantine/notifications';

export const $currUser = atom<User | null>(null);

supabase.auth.onAuthStateChange((authChangeEvent, session) => {
  $currUser.set(session?.user || null);
  notifications.show({
    title: 'Auth state changed',
    message: `User ${authChangeEvent}`,
    color: 'blue',
  });
});
