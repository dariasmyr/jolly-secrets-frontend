import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import { useAuthStore } from '@/store/auth.store';

export const useSocketIo = (): Socket | null => {
  const authStore = useAuthStore();
  // eslint-disable-next-line unicorn/no-null
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(`${process.env.NEXT_PUBLIC_REST_API_URL}`, {
      reconnectionDelayMax: 10_000,
      auth: {
        authorization: authStore.token,
      },
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [authStore.token]);

  return socket;
};
