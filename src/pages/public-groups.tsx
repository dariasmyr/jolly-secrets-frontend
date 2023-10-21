import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Page } from '@components/ui/common/page';
import { CardImage } from '@components/ui/custom/card-image';
import styled from 'styled-components';

import { EventStatus, usePublicGroupsQuery } from '@/generated/graphql';
import { useAuthStore } from '@/store/auth.store';

const PublicGroups: FC = () => {
  const authStore = useAuthStore();
  const router = useRouter();
  const { data, error, loading } = usePublicGroupsQuery({
    variables: {
      offset: 0,
      limit: 10,
    },
  });

  useEffect(() => {
    if (!authStore.token) {
      router.push('/auth/login');
    }
  }, [authStore]);

  if (loading) {
    return <Page title="Публичные группы">Loading...</Page>;
  }

  if (error) {
    return <Page title="Публичные группы">Error: {JSON.stringify(error)}</Page>;
  }

  return (
    <Page title={'Публичные группы'} style={{ gap: 16, marginTop: 24 }}>
      <Header>Публичные группы</Header>
      {data?.publicGroups.map((group) => (
        <CardImage
          key={group.id}
          imageUrl={group.pictureUrl}
          preHeader={`${group.events?.filter(
            (event) => event.status === EventStatus.Open,
          )?.length} активных событий`}
          header={group.name}
          text={group.description}
          tags={[
            {
              title: `${group.members?.length} человек`,
            },
          ]}
        />
      ))}
    </Page>
  );
};

const Header = styled.div`
  color: #000;
  font-feature-settings:
    'clig' off,
    'liga' off;

  /* typography/h6 */
  font-family: Roboto, sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 160%; /* 32px */
  letter-spacing: 0.15px;

  align-self: flex-start;
  margin-right: 24px;
  margin-left: 24px;
`;

export default PublicGroups;
