// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable unicorn/no-null */
import { FC, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Page } from '@components/ui/common/page';
import { Notification } from '@components/ui/custom/notification';
import styled from 'styled-components';

import {
  StyledImage,
  SubText,
  Text,
} from '@/components/ui/common/styled-components';
import {
  useNotificationsQuery,
  useSetNotificationAsReadMutation,
} from '@/generated/graphql';
import { useAuthStore } from '@/store/auth.store';

const Notifications: FC = () => {
  const { t } = useTranslation(['notifications', 'menu']);
  const authStore = useAuthStore();
  const router = useRouter();
  const [setNotificationAsRead] = useSetNotificationAsReadMutation();

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

  useEffect(() => {
    if (data?.notifications) {
      for (const notification of data.notifications.filter(
        (notification_) => notification_?.read === false,
      )) {
        if (notification?.id) {
          try {
            setNotificationAsRead({
              variables: {
                id: notification.id,
              },
            });
          } catch (error_) {
            console.error(error_);
          }
        }
      }
    }
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Page
      title={t('notifications:notifications.title')}
      style={{ gap: 16, marginTop: 24 }}
    >
      {data?.notifications?.length === 0 && (
        <Wrapper>
          <StyledImage>
            <Image
              src={'/assets/sand-clock.png'}
              width={130}
              height={100}
              alt="Wait"
            />
          </StyledImage>
          <Text>{t('notifications:notifications_not_found.title')}</Text>
          <SubText>
            {t('notifications:notifications_not_found.description')}
          </SubText>
        </Wrapper>
      )}
      <NotificationsContainer>
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
      </NotificationsContainer>
    </Page>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', [
        'notifications',
        'menu',
        'errors',
      ])),
    },
  };
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;

const NotificationsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 0 10px;
  width: 100%;
  max-width: 500px;
`;

export default Notifications;
