import { io, Socket } from 'socket.io-client';

import { useAuthStore } from '@/store/auth.store';

export const useSocketIo = (): Socket => {
  const authStore = useAuthStore();
  return io(`${process.env.NEXT_PUBLIC_REST_API_URL}`, {
    reconnectionDelayMax: 10_000,
    auth: {
      authorization: authStore.token,
    },
    // query: {
    //   'authorizaion': 'my-value',
    // },
  });
};
