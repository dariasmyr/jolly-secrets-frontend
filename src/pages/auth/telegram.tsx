import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';

import { useLoginWithTelegramMutation } from '@/generated/graphql';
import { log } from '@/services/log';
import { useAuthStore } from '@/store/auth.store';

const Telegram: FC = () => {
  const authStore = useAuthStore();
  const [login] = useLoginWithTelegramMutation();
  const router = useRouter();
  const token = router.query.token;

  useEffect(() => {
    (async (): Promise<void> => {
      if (!token) return;
      const { data: loginData, errors } = await login({
        variables: {
          token: token as string,
        },
      });

      if (errors) {
        log.error('errors', errors);
        return;
      }

      if (!loginData) {
        log.error('No login data');
        return;
      }

      authStore.setToken(loginData.loginWithTelegram.token);
      authStore.setAccount(loginData.loginWithTelegram.account);

      // wait for token to be set
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await router.push('/public-groups');
    })();
  }, [token]);

  if (!router.isReady) return <div>Loading...</div>;

  return <div>{token}</div>;
};

export default Telegram;
