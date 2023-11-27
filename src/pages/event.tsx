// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable unicorn/no-null */
import { FC, ReactElement, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import CollapsedBreadcrumbs from '@components/ui/common/breadcrumbs';
import { Button, ButtonVariant } from '@components/ui/common/button';
import { Page } from '@components/ui/common/page';
import { Stepper } from '@components/ui/common/stepper';
import {
  Breadcrumbs,
  SubText,
  Text,
} from '@components/ui/common/styled-components';
import { TabApplications } from '@components/ui/common/tab-applications';
import { ButtonLarge } from '@components/ui/custom/button-large';
import {
  CardPreference,
  IPreferenceTextProperties,
} from '@components/ui/custom/card-preference';
import { DialogConfirmAction } from '@components/ui/custom/dialog-confirm-action';
import { EventPage } from '@components/ui/custom/event-page';
import { PriceRangeDisplay } from '@pages/create-application';
import { EventStatusDisplay, StyledImage } from '@pages/events';
import styled from 'styled-components';

import { Header } from '@/components/ui/common/page/styled-components';
import {
  EventApplicationStatus,
  EventStatus,
  GroupType,
  PriceRange,
  useEventQuery,
  useGetEventApplicationPairByEventAndAccountQuery,
  useGetGroupByEventIdQuery,
  useSetEventApplicationStatusMutation,
} from '@/generated/graphql';
import { useAuthStore } from '@/store/auth.store';

// eslint-disable-next-line complexity
const Event: FC = () => {
  const authStore = useAuthStore();
  const router = useRouter();
  const eventId = router.query.id;

  const [activeTab, setActiveTab] = useState('application');

  const [setEventApplicationStatus, { reset }] =
    useSetEventApplicationStatusMutation();

  const [isGiftReceivedDialogOpen, setGiftReceivedDialogOpen] = useState(false);
  const [isGiftNotReceivedDialogOpen, setGiftNotReceivedDialogOpen] =
    useState(false);

  const handleGiftReceivedClick = (): void => setGiftReceivedDialogOpen(true);
  const handleGiftNotReceivedClick = (): void =>
    setGiftNotReceivedDialogOpen(true);

  const [isGiftSentDialogOpen, setGiftSentDialogOpen] = useState(false);

  const handleGiftSentClick = (): void => setGiftSentDialogOpen(true);

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

  const renderPriceRange = (priceRange: PriceRange): string => {
    const label = PriceRangeDisplay.find((item) => item.value === priceRange);
    return label ? label.label : '';
  };

  const goToChat = (): void => {
    router.push(
      `/chat?id=${eventApplicationPairData?.getEventApplicationPairByEventAndAccount?.chatId}`,
    );
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

  const eventStatus = EventStatusDisplay.find(
    (status) => status.value === eventData!.event.status,
  );

  const daysToExpire = Math.max(
    Math.floor(
      (new Date(eventData!.event.endsAt).getTime() - Date.now()) /
        // eslint-disable-next-line no-magic-numbers
        (1000 * 3600 * 24),
    ),
    0,
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

  // eslint-disable-next-line complexity,sonarjs/cognitive-complexity
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

    console.log('santaApplication', santaApplication);

    const myApplicationStatus = myApplication?.status;
    const santaApplicationStatus = santaApplication?.status;

    const applicationPreferences: IPreferenceTextProperties[] =
      myApplication && myApplication.preferences
        ? myApplication.preferences.map((pref) => ({
            priceRange: {
              title: 'Ценовой диапазон',
              value: renderPriceRange(pref.priceRange),
            },
            likes: { title: 'Я хочу', value: pref.likes },
            dislikes: { title: 'Я НЕ хочу', value: pref.dislikes },
            comments: { title: 'Комментарии', value: pref.comment },
          }))
        : [];

    const santaApplicationPreferences: IPreferenceTextProperties[] =
      santaApplication && santaApplication.preferences
        ? santaApplication.preferences.map((pref) => ({
            priceRange: {
              title: 'Ценовой диапазон',
              value: renderPriceRange(pref.priceRange),
            },
            likes: { title: 'Я хочу', value: pref.likes },
            dislikes: { title: 'Я НЕ хочу', value: pref.dislikes },
            comments: { title: 'Комментарии', value: pref.comment },
          }))
        : [];

    const tabApplicationStatus =
      tab === 'application' ? myApplicationStatus : santaApplicationStatus;

    // eslint-disable-next-line sonarjs/no-duplicate-string
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
            {tab === 'application' ? '🎁Моя Заявка' : '🎅Заявка Тайного Санты'}
          </Header>
        </HeaderWrapper>
        <Stepper
          steps={[
            {
              label: '🎅Поиск Тайного Санты',
              description:
                'Ваша Заявка на жеребьевке, подыскиваем вам Тайного Санту!',
              showDescription: false,
              completed:
                tabApplicationStatus !== EventApplicationStatus.LookingForPair,
            },
            {
              label: '🤝Ожидание отправления',
              description:
                'Время отправлять подарки! Узнайте адреса друг друга в тайном чате!📬🎁',
              showDescription: false,
              completed:
                tabApplicationStatus === EventApplicationStatus.Paired ||
                tabApplicationStatus === EventApplicationStatus.GiftSent ||
                tabApplicationStatus === EventApplicationStatus.GiftReceived ||
                tabApplicationStatus === EventApplicationStatus.GiftNotReceived,
            },
            {
              label: '🎁Отправлено',
              description: 'Ваш подарок отправлен! Дело за вами!📮✨',
              showDescription: true,
              completed:
                tabApplicationStatus === EventApplicationStatus.GiftSent ||
                tabApplicationStatus === EventApplicationStatus.GiftReceived ||
                tabApplicationStatus === EventApplicationStatus.GiftNotReceived,
            },
            {
              label: '🎉Выполнено',
              description: 'Ваша заявка успешно закрыта🎁🎊',
              showDescription: false,
              completed:
                tabApplicationStatus === EventApplicationStatus.GiftReceived ||
                tabApplicationStatus === EventApplicationStatus.GiftNotReceived,
            },
          ]}
        />
        {tab === 'application' && myApplication && (
          <ButtonWrapper>
            {(myApplicationStatus === EventApplicationStatus.Paired ||
              myApplicationStatus === EventApplicationStatus.GiftSent) && (
              <>
                <Button
                  variant={ButtonVariant.primary}
                  onClick={handleGiftReceivedClick}
                >
                  Подарок у меня
                </Button>
                <DialogConfirmAction
                  isOpen={isGiftReceivedDialogOpen}
                  onCancelClick={(): void => setGiftReceivedDialogOpen(false)}
                  title="Подтвердите действие"
                  description={
                    'Надеемся, вам понравится подарок! После подтверждения ваша заявка будет закрыта. 😊👍'
                  }
                  onConfirmClick={async (): Promise<void> => {
                    console.log('myApplication.id', myApplication.id);
                    await setEventApplicationStatus({
                      variables: {
                        eventApplicationId: myApplication.id,
                        status: EventApplicationStatus.GiftReceived,
                      },
                    });
                    setGiftReceivedDialogOpen(false);
                    reset();
                  }}
                  cancelButtonText={'Отмена ❌'}
                  /* eslint-disable-next-line sonarjs/no-duplicate-string */
                  confirmButtonText={'Подтверждаю ✔️'}
                />
                <Button
                  variant={ButtonVariant.warning}
                  onClick={handleGiftNotReceivedClick}
                >
                  Подарок не пришел
                </Button>
                <DialogConfirmAction
                  isOpen={isGiftNotReceivedDialogOpen}
                  onCancelClick={(): void =>
                    setGiftNotReceivedDialogOpen(false)
                  }
                  title="Подтвердите действие"
                  description="Нам очень жаль 😢 После подтверждения ваша заявка будет закрыта. 🚫"
                  onConfirmClick={async (): Promise<void> => {
                    await setEventApplicationStatus({
                      variables: {
                        eventApplicationId: myApplication.id,
                        status: EventApplicationStatus.GiftNotReceived,
                      },
                    });
                    setGiftNotReceivedDialogOpen(false);
                    reset();
                  }}
                  cancelButtonText={'Отмена ❌'}
                  confirmButtonText={'Подтверждаю ✔️'}
                />
              </>
            )}
          </ButtonWrapper>
        )}
        {tab === 'secret-santa-application' && santaApplication && (
          <ButtonWrapper>
            <Button
              variant={ButtonVariant.primary}
              onClick={handleGiftSentClick}
              disabled={
                santaApplicationStatus === EventApplicationStatus.GiftSent
              }
            >
              Я отправил подарок
            </Button>
            <DialogConfirmAction
              isOpen={isGiftSentDialogOpen}
              onCancelClick={(): void => setGiftSentDialogOpen(false)}
              title="Подтвердите действие"
              description="Статус заявки будет изменен на 'Подарок отправлен'. Вы уверены?"
              onConfirmClick={async (): Promise<void> => {
                await setEventApplicationStatus({
                  variables: {
                    eventApplicationId: santaApplication.id,
                    status: EventApplicationStatus.GiftSent,
                  },
                });
                setGiftSentDialogOpen(false);
                reset();
              }}
              cancelButtonText={'Отмена'}
              confirmButtonText={'Подтверждаю'}
            />
            <Button variant={ButtonVariant.secondary} onClick={goToChat}>
              Написать санте
            </Button>
          </ButtonWrapper>
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
        imageUrl={
          eventData!.event.pictureUrl
            ? process.env.NEXT_PUBLIC_REST_API_URL + eventData!.event.pictureUrl
            : '/assets/hover.jpg'
        }
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
            title: `${eventStatus?.label}`,
            warning: eventData!.event.status === EventStatus.Open,
          },
        ]}
      />
      {eventApplicationPairData?.getEventApplicationPairByEventAndAccount ===
        null && (
        <ButtonLargeWrapper>
          {isExpired ? (
            <ButtonLarge disabled={true}>Cобытие завершено</ButtonLarge>
          ) : (
            <ButtonLarge onClick={participate}>Участвовать</ButtonLarge>
          )}
        </ButtonLargeWrapper>
      )}
      {eventApplicationPairData?.getEventApplicationPairByEventAndAccount && (
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
      )}
    </Page>
  );
};

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  margin-top: 16px;
`;

const ButtonLargeWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 16px;
`;

const ButtonWrapper = styled.div`
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  margin: 10px;
`;

export default Event;
