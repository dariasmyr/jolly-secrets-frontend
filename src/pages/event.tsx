import { FC, ReactElement, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import CollapsedBreadcrumbs from '@components/ui/common/breadcrumbs';
import { Button, ButtonVariant } from '@components/ui/common/button';
import { Page } from '@components/ui/common/page';
import { Stepper } from '@components/ui/common/stepper';
import { TabApplications } from '@components/ui/common/tab-applications';
import { ButtonLarge } from '@components/ui/custom/button-large';
import {
  CardPreference,
  IPreferenceTextProperties,
} from '@components/ui/custom/card-preference';
import { DialogConfirmAction } from '@components/ui/custom/dialog-confirm-action';
import { EventPage } from '@components/ui/custom/event-page';
import { StyledImage, SubText, Text } from '@pages/events';
import styled from 'styled-components';

import {
  EventApplicationStatus,
  EventStatus,
  GroupType,
  useEventQuery,
  useGetEventApplicationPairByEventAndAccountQuery,
  useGetGroupByEventIdQuery,
} from '@/generated/graphql';
import { useAuthStore } from '@/store/auth.store';

// eslint-disable-next-line complexity
const Event: FC = () => {
  const authStore = useAuthStore();
  const router = useRouter();
  const eventId = router.query.id;

  const [activeTab, setActiveTab] = useState('application');

  const [isGiftReceivedDialogOpen, setGiftReceivedDialogOpen] = useState(false);
  const [isGiftNotReceivedDialogOpen, setGiftNotReceivedDialogOpen] =
    useState(false);

  const handleGiftReceivedClick = (): void => setGiftReceivedDialogOpen(true);
  const handleGiftNotReceivedClick = (): void =>
    setGiftNotReceivedDialogOpen(true);

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

  const {
    data: eventApplicationPairData,
    error: eventApplicationPairError,
    loading: eventApplicationPairIsLoading,
  } = useGetEventApplicationPairByEventAndAccountQuery({
    variables: {
      eventId: Number(eventId),
    },
  });

  const participate = (): void => {
    // eslint-disable-next-line no-alert
    router.push(`/create-application?eventId=${eventId}`);
  };

  useEffect(() => {
    if (!authStore.token || !authStore.account?.id) {
      router.push('/auth/login');
    }
  }, [authStore]);

  if (groupIsLoading || eventIsLoading || eventApplicationPairIsLoading) {
    return <Page title="Событие">Loading...</Page>;
  }

  if (
    groupError ||
    eventApplicationPairError ||
    !eventData?.event ||
    !groupData?.getGroupByEventId
  ) {
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
      link: `events?groupId=${groupData!.getGroupByEventId.id}`,
      onClick: async (): Promise<void> => {
        await router.push(`events?groupId=${groupData!.getGroupByEventId.id}`);
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
      // eslint-disable-next-line no-magic-numbers
      (1000 * 3600 * 24),
  );
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

  // eslint-disable-next-line complexity
  const renderApplication = (tab: string): ReactElement => {
    const myApplication =
      eventApplicationPairData!.getEventApplicationPairByEventAndAccount!
        .applicationFirst.accountId === authStore.account!.id
        ? eventApplicationPairData!.getEventApplicationPairByEventAndAccount!
            .applicationFirst
        : eventApplicationPairData!.getEventApplicationPairByEventAndAccount!
            .applicationSecond;

    console.log('myApplication', myApplication);

    const santaApplication =
      eventApplicationPairData!.getEventApplicationPairByEventAndAccount!
        .applicationSecond?.accountId === authStore.account!.id
        ? eventApplicationPairData!.getEventApplicationPairByEventAndAccount!
            .applicationFirst
        : eventApplicationPairData!.getEventApplicationPairByEventAndAccount!
            .applicationSecond;

    const myApplicationStatus = myApplication?.status;
    const santaApplicationStatus = santaApplication?.status;

    const applicationPreferences: IPreferenceTextProperties[] =
      myApplication && myApplication.preferences
        ? myApplication.preferences.map((pref) => ({
            priceRange: { title: 'Ценовой диапазон', value: pref.priceRange },
            likes: { title: 'Я хочу', value: pref.likes },
            dislikes: { title: 'Я НЕ хочу', value: pref.dislikes },
            comments: { title: 'Комментарии', value: pref.comment },
          }))
        : [];

    const santaApplicationPreferences: IPreferenceTextProperties[] =
      santaApplication && santaApplication.preferences
        ? santaApplication.preferences.map((pref) => ({
            priceRange: { title: 'Ценовой диапазон', value: pref.priceRange },
            likes: { title: 'Я хочу', value: pref.likes },
            dislikes: { title: 'Я НЕ хочу', value: pref.dislikes },
            comments: { title: 'Комментарии', value: pref.comment },
          }))
        : [];

    const applicationStatus =
      tab === 'application' ? myApplicationStatus : santaApplicationStatus;
    console.log('applicationStatus', applicationStatus);

    if (tab === 'secret-santa-application' && !santaApplication) {
      return (
        <ImageWrapper>
          <StyledImage>
            <Image
              src={'/assets/sand-clock.png'}
              width={100}
              height={100}
              alt="Wait"
            />
          </StyledImage>
          <Text>Заявки пока нет.</Text>
          <SubText>Ищем вам Тайного Санту!</SubText>
        </ImageWrapper>
      );
    }

    return (
      <div>
        <HeaderWrapper>
          <Header>
            {tab === 'application' ? 'Моя Заявка' : 'Заявка Тайного Санты'}
          </Header>
        </HeaderWrapper>
        <Stepper
          steps={[
            {
              label: 'Поиск тайного санты',
              description: 'Поиск тайного санты',
              showDescription: false,
              completed:
                applicationStatus !== EventApplicationStatus.LookingForPair,
            },
            {
              label: 'Ожидание отправления',
              description: 'Ожидание отправления',
              showDescription: false,
              completed:
                applicationStatus !== EventApplicationStatus.LookingForPair &&
                applicationStatus !== EventApplicationStatus.GiftSent &&
                applicationStatus !== EventApplicationStatus.GiftReceived,
            },
            {
              label: 'Отправлено',
              description: 'Отправлено',
              showDescription: false,
              completed:
                applicationStatus !== EventApplicationStatus.Paired &&
                applicationStatus !== EventApplicationStatus.LookingForPair &&
                applicationStatus !== EventApplicationStatus.GiftReceived,
            },
            {
              label: 'Выполнено',
              description: 'Выполнено',
              showDescription: false,
              completed:
                applicationStatus === EventApplicationStatus.GiftReceived,
            },
          ]}
        />
        {tab === 'application' && myApplication && (
          <>
            <Button
              variant={ButtonVariant.primary}
              onClick={handleGiftReceivedClick}
            >
              Я получил подарок
            </Button>
            <DialogConfirmAction
              isOpen={isGiftReceivedDialogOpen}
              onCancelClick={(): void => setGiftReceivedDialogOpen(false)}
              title="Подтвердите действие"
              description={
                "Ваш статус заявки будет изменен навсегда на 'Выполнено'. Вы уверены?"
              }
              onConfirmClick={(): void => {}}
              cancelButtonText={'Отмена'}
              confirmButtonText={'Подтверждаю'}
            />
            <Button
              variant={ButtonVariant.warning}
              onClick={handleGiftNotReceivedClick}
            >
              Я не получил подарок
            </Button>
            <DialogConfirmAction
              isOpen={isGiftNotReceivedDialogOpen}
              onCancelClick={(): void => setGiftNotReceivedDialogOpen(false)}
              title="Подтвердите действие"
              description="Нам очень жаль, статус заявки будет изменен навсегда на 'Выполнено'. Вы уверены?"
              onConfirmClick={(): void => {}}
              cancelButtonText={'Отмена'}
              confirmButtonText={'Подтверждаю'}
            />
          </>
        )}
        <CardPreference
          header="Предпочтения"
          preferences={
            tab === 'application'
              ? applicationPreferences
              : santaApplicationPreferences
          }
        />
      </div>
    );
  };

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
            : `До завершения ${daysToExpire} ${pluralize(
                daysToExpire,
                'день',
                'дня',
                'дней',
              )}`
        }
        header={eventData!.event.name}
        text={eventData!.event.description}
        tags={[
          {
            title: `${
              eventData!.event.applicationPairs?.length || 0
            } ${pluralize(
              eventData!.event.applicationPairs?.length || 0,
              'пара',
              'пары',
              'пар',
            )}`,
          },
          {
            title: `${eventData!.event.status}`,
            warning: eventData!.event.status === EventStatus.Open,
          },
        ]}
      />
      {eventApplicationPairData?.getEventApplicationPairByEventAndAccount ===
        null && (
        <Wrapper>
          {isExpired ? (
            <ButtonLarge disabled={true}>Cобытие завершено</ButtonLarge>
          ) : (
            <ButtonLarge onClick={participate}>Участвовать</ButtonLarge>
          )}
        </Wrapper>
      )}
      {isExpired ? (
        <Wrapper>
          <ButtonLarge disabled={true}>Cобытие завершено</ButtonLarge>
        </Wrapper>
      ) : (
        eventApplicationPairData?.getEventApplicationPairByEventAndAccount && (
          <TabApplications
            tabs={[
              {
                label: 'Моя Заявка',
                value: 'application',
                component: renderApplication(activeTab),
              },
              {
                label: 'Заявка Тайного Санты',
                value: 'secret-santa-application',
                component: renderApplication(activeTab),
              },
            ]}
            onTabChange={async (tabValue: string): Promise<void> => {
              setActiveTab(tabValue);
            }}
          />
        )
      )}
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

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

export default Event;
