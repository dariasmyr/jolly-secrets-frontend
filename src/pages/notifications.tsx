// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable unicorn/no-null */
import { FC, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Page } from '@components/ui/common/page';
import { Notification } from '@components/ui/custom/notification';
import styled from 'styled-components';

import {
  StyledImage,
  SubText,
  Text,
} from '@/components/ui/common/styled-components';
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
      {data?.notifications?.length === 0 && (
        <Wrapper>
          <StyledImage>
            <Image
              src={'/assets/sand-clock.png'}
              width={100}
              height={100}
              alt="Wait"
            />
          </StyledImage>
          <Text>Уведомлений пока нет.</Text>
          <SubText>Ожидаем...</SubText>
        </Wrapper>
      )}
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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;

export default Notifications;
