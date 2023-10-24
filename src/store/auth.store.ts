import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { Account } from '@/generated/graphql';

type IAuthState = {
  token: string | undefined;
  setToken: (token: string | undefined) => void;
  account: Partial<Account> | undefined;
  setAccount: (account: Partial<Account> | undefined) => void;
  clear: () => void;
};

export const useAuthStore = create(
  persist<IAuthState>(
    (set) => ({
      token: undefined,
      setToken: (token: string | undefined): void => {
        console.log('Token:', token); // log token
        set({ token });
      },
      account: undefined,
      setAccount: (account: Partial<Account> | undefined): void => {
        console.log('Account:', account); // log account
        set({ account });
      },
      clear: (): void => set({ token: undefined, account: undefined }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
