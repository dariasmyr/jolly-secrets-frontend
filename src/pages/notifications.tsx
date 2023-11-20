// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable unicorn/no-null */
import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Page } from '@components/ui/common/page';
import { Notification } from '@components/ui/custom/notification';

import { useNotificationsQuery } from '@/generated/graphql';
import { useAuthStore } from '@/store/auth.store';

const Notifications: FC = () => {
  const authStore = useAuthStore();
  const router = useRouter();

  const { data, error, loading } = useNotificationsQuery({
    variables: {
      offset: 0,
      limit: 100,
    },
  });

  useEffect(() => {
    if (!authStore.token || !authStore.account?.id) {
      router.push('/auth/login');
    }
  }, [authStore]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Page title={'Уведомления'} style={{ gap: 16, marginTop: 24 }}>
      {data?.notifications?.map((notification) => {
        return (
          <Notification
            key={notification?.id}
            date={notification?.createdAt}
            sender={'Secret Santa'}
            text={notification?.message}
          />
        );
      })}
    </Page>
  );
};

export default Notifications;
