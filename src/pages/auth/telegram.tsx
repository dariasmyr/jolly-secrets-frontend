import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';

import { useLoginWithTelegramMutation } from '@/generated/graphql';
import { log } from '@/services/log';
import { useAuthStore } from '@/store/auth.store';

const Login: FC = () => {
  const settingsStore = useAuthStore();
  const [login] = useLoginWithTelegramMutation();
  const router = useRouter();
  const token = router.query.token;

  useEffect(() => {
    (async (): Promise<void> => {
      if (!token) return;

      try {
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

        settingsStore.setToken(loginData.loginWithTelegram.token);
        settingsStore.setAccount(loginData.loginWithTelegram.account);
        await router.push('/home');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log('error', error);
      }
    })();
  }, [router.isReady, token]);

  return <div>{token}</div>;
};

export default Login;
