import { FC, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import CollapsedBreadcrumbs from '@components/ui/common/breadcrumbs';
import { FabAdd } from '@components/ui/common/fab-add';
import { Page } from '@components/ui/common/page';
import {
  Breadcrumbs,
  SubText,
  Text,
} from '@components/ui/common/styled-components';
import { CardImage } from '@components/ui/custom/card-image';
import styled from 'styled-components';

import { Header } from '@/components/ui/common/page/styled-components';
import {
  EventStatus,
  GroupType,
  useEventsQuery,
  useGroupQuery,
} from '@/generated/graphql';
import { useAuthStore } from '@/store/auth.store';

const Events: FC = () => {
  const { t } = useTranslation(['common', 'event', 'group']);
  const authStore = useAuthStore();
  const router = useRouter();
  const groupId = router.query.groupId;

  const {
    data: groupData,
    error: groupError,
    loading: groupIsLoading,
  } = useGroupQuery({
    variables: {
      id: Number(groupId),
    },
  });

  const {
    data: eventsData,
    error: eventsError,
    loading: eventsIsLoading,
  } = useEventsQuery({
    variables: {
      groupId: Number(groupId),
    },
  });

  function pluralize(
    number: number,
    one: string,
    two: string,
    many: string,
  ): string {
    const lastDigit = number % 10;
    const lastTwoDigits = number % 100;

    if (lastDigit === 1 && lastTwoDigits !== 11) {
      return one;
    }

    if (
      [2, 3, 4].includes(lastDigit) &&
      ![12, 13, 14].includes(lastTwoDigits)
    ) {
      return two;
    }

    return many;
  }

  const createEvent = (): void => {
    // eslint-disable-next-line no-alert
    router.push(`/create-event?groupId=${groupId}`);
  };

  useEffect(() => {
    if (!authStore.token) {
      router.push('/auth/login');
    }
  }, [authStore]);

  if (groupIsLoading || eventsIsLoading) {
    return <Page title={t('event:event.header')}>Loading...</Page>;
  }

  if (groupError || eventsError) {
    return (
      <Page title={t('event:event.header')}>
        Error: {JSON.stringify(groupError || eventsError)}
      </Page>
    );
  }

  const isPrivate = groupData?.group.type === GroupType.Private;

  const steps = [
    {
      label: isPrivate ? t('group:groups.private') : t('group:groups.public'),
      link: isPrivate ? '/private-groups' : '/public-groups',
      onClick: async (): Promise<void> => {
        await router.push(isPrivate ? '/private-groups' : '/public-groups');
      },
    },
    {
      label: groupData!.group.name,
      link: `events?groupId=${groupId}`,
      onClick: async (): Promise<void> => {
        await router.push(`events?groupId=${groupId}`);
      },
    },
  ];

  return (
    <Page title={groupData!.group.name} style={{ gap: 16, marginTop: 24 }}>
      <Header>{groupData?.group.name}</Header>
      <Breadcrumbs>
        <CollapsedBreadcrumbs steps={steps} />
      </Breadcrumbs>
      {eventsData?.events.length === 0 && (
        <Wrapper>
          <StyledImage>
            <Image
              src={'/assets/sand-clock.png'}
              width={100}
              height={100}
              alt="Wait"
            />
          </StyledImage>
          <Text>{t('event:events.no_events_title')}</Text>
          <SubText>{t('event:events.no_events_description')}</SubText>
        </Wrapper>
      )}
      {eventsData?.events.map((event) => {
        const tags = [
          {
            title: `${event.applicationPairs?.length || 0} ${pluralize(
              event.applicationPairs?.length || 0,
              t('event:event.one_pair'),
              t('event:event.two_pairs'),
              t('event:event.many_pairs'),
            )}`,
          },
          {
            title: `${event.status}`,
            warning: event.status === EventStatus.Open,
          },
        ];

        const startDate = new Date(event.startsAt).toLocaleDateString();
        const endDate = new Date(event.endsAt).toLocaleDateString();

        return (
          <CardImage
            key={event.id}
            imageUrl={
              event.pictureUrl
                ? process.env.NEXT_PUBLIC_REST_API_URL + event.pictureUrl
                : '/assets/hover.jpg'
            }
            preHeader={`${startDate} - ${endDate}`}
            header={event.name}
            text={event.description}
            tags={tags}
            onClick={(): void => {
              router.push(`/event?id=${event.id}`);
            }}
          />
        );
      })}
      <FabAdd onClick={createEvent} />
    </Page>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', [
        'common',
        'group',
        'event',
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

export const StyledImage = styled.div`
  opacity: 0.5;
`;

export default Events;
