import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';

import { useLoginWithGoogleMutation } from '@/generated/graphql';
import { log } from '@/services/log';
import { useAuthStore } from '@/store/auth.store';

const Login: FC = () => {
  const settingsStore = useAuthStore();
  const [login] = useLoginWithGoogleMutation();
  const router = useRouter();
  const code = router.query.code;

  useEffect(() => {
    (async (): Promise<void> => {
      if (!code) return;

      try {
        const { data: loginData, errors } = await login({
          variables: {
            code: code as string,
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

        settingsStore.setToken(loginData.loginWithGoogle.token);
        settingsStore.setAccount(loginData.loginWithGoogle.account);
        await router.push('/');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log('error', error);
      }
    })();
  }, [router.isReady, code]);

  return <div>{code}</div>;
};

export default Login;
