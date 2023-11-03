import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import CollapsedBreadcrumbs from '@components/ui/common/breadcrumbs';
import { Page } from '@components/ui/common/page';
import { ButtonLarge } from '@components/ui/custom/button-large';
import { EventPage } from '@components/ui/custom/event-page';
import styled from 'styled-components';

import {
  EventStatus,
  GroupType,
  useEventQuery,
  useGetGroupByEventIdQuery,
} from '@/generated/graphql';
import { useAuthStore } from '@/store/auth.store';

const Event: FC = () => {
  const authStore = useAuthStore();
  const router = useRouter();
  const eventId = router.query.id;

  const { data: eventData, loading: eventIsLoading } = useEventQuery({
    variables: {
      id: Number(eventId),
    },
  });

  const {
    data: groupData,
    error: groupError,
    loading: groupIsLoading,
  } = useGetGroupByEventIdQuery({
    variables: {
      eventId: Number(eventId),
    },
  });

  const participate = (): void => {
    // eslint-disable-next-line no-alert
    router.push(`/create-application?eventId=${eventId}`);
  };

  useEffect(() => {
    if (!authStore.token) {
      router.push('/auth/login');
    }
  }, [authStore]);

  if (groupIsLoading || eventIsLoading) {
    return <Page title="Событие">Loading...</Page>;
  }

  if (groupError || !groupData?.getGroupByEventId) {
    return <Page title="Событие">Error: {JSON.stringify(groupError)}</Page>;
  }

  const startDate = new Date(eventData?.event.startsAt).toLocaleDateString();
  const endDate = new Date(eventData?.event.endsAt).toLocaleDateString();

  const isExpired = eventData?.event.status === EventStatus.Expired;
  const isPrivate = groupData?.getGroupByEventId?.type === GroupType.Private;

  const steps = [
    {
      label: isPrivate ? 'Мои группы' : 'Публичные группы',
      link: isPrivate ? '/private-groups' : '/public-groups',
      onClick: async (): Promise<void> => {
        await router.push(isPrivate ? '/private-groups' : '/public-groups');
      },
    },
    {
      label: groupData!.getGroupByEventId.name,
      link: `/group/${groupData!.getGroupByEventId!.name}`,
      onClick: async (): Promise<void> => {
        await router.push(`/group/${groupData!.getGroupByEventId!.name}`);
      },
    },
    {
      label: eventData!.event.name,
      link: `/event/${eventId}`,
      onClick: async (): Promise<void> => {
        await router.push(`/event/${eventId}`);
      },
    },
  ];

  const daysToExpire = Math.floor(
    (new Date(eventData!.event.endsAt).getTime() - Date.now()) /
      (1000 * 3600 * 24),
  );

  return (
    <Page
      title={groupData!.getGroupByEventId.name}
      style={{
        gap: 16,
        marginTop: 24,
        height: 'calc(100vh - 30px)',
      }}
    >
      <Header>{groupData!.getGroupByEventId.name}</Header>
      <Breadcrumbs>
        <CollapsedBreadcrumbs steps={steps} />
      </Breadcrumbs>
      <EventPage
        key={eventData!.event.id.toString()}
        imageUrl={eventData!.event.pictureUrl}
        preHeader={
          isExpired
            ? `${startDate} - ${endDate}`
            : `До завершения ${daysToExpire} дней`
        }
        header={eventData!.event.name}
        text={eventData!.event.description}
        tags={[
          {
            title: `${eventData!.event.applicationPairs?.length || 0} пар`,
          },
        ]}
      />
      <Wrapper>
        {isExpired ? (
          <ButtonLarge disabled={true}>Cобытие завершено</ButtonLarge>
        ) : (
          <ButtonLarge onClick={participate}>Участвовать</ButtonLarge>
        )}
      </Wrapper>
    </Page>
  );
};

const Header = styled.div`
  color: #000;
  font-feature-settings:
    'clig' off,
    'liga' off;
  font-family: Roboto, sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 160%; /* 32px */
  letter-spacing: 0.15px;
  align-self: flex-start;
  margin-right: 24px;
  margin-left: 24px;
`;

const Breadcrumbs = styled.div`
  align-self: flex-start;
  margin-right: 24px;
  margin-left: 24px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  padding: 0px 6px 0px 6px;
  flex: 1;
`;

export default Event;
