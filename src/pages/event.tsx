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
import { StyledImage } from '@pages/events';
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

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// eslint-disable-next-line complexity
const Event: FC = () => {
  const { t } = useTranslation(['common', 'auth']);
  const locale = localeDetectorService.detect();
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
      `/chat?eventApplicationPairId=${eventApplicationPairData?.getEventApplicationPairByEventAndAccount?.id}`,
    );
  };

  useEffect(() => {
    if (!authStore.token || !authStore.account?.id) {
      router.push('/auth/login');
    }
  }, [authStore]);

  if (groupIsLoading || eventIsLoading || eventApplicationPairIsLoading) {
    return <Page title={t('event:header')}>Loading...</Page>;
  }

  if (
    groupError ||
    eventApplicationPairError ||
    !eventData?.event ||
    !groupData?.getGroupByEventId
  ) {
    return <Page title={t('event:header')}>Error: {JSON.stringify(groupError)}</Page>;
  }

  const startDate = new Date(eventData?.event.startsAt).toLocaleDateString();
  const endDate = new Date(eventData?.event.endsAt).toLocaleDateString();

  const isExpired = eventData?.event.status === EventStatus.Expired;
  const isPrivate = groupData?.getGroupByEventId?.type === GroupType.Private;

  const steps = [
    {
      label: isPrivate ? {t('groups:private')} : {t('groups:public')},
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
              title: {t('application:preference:price_range')},
              value: renderPriceRange(pref.priceRange),
            },
            likes: { title: {t('application:preference:likes')}, value: pref.likes },
            dislikes: { title: {t('application:preference:likes')}, value: pref.dislikes },
            comments: { title: {t('application:preference:comment')}, value: pref.comment },
          }))
        : [];

    const santaApplicationPreferences: IPreferenceTextProperties[] =
      santaApplication && santaApplication.preferences
        ? santaApplication.preferences.map((pref) => ({
            priceRange: {
              title:  {t('application:preference:price_range')},
              value: renderPriceRange(pref.priceRange),
            },
            likes: { title: {t('application:preference:likes')}, value: pref.likes },
            dislikes: { title: {t('application:preference:likes')}, value: pref.dislikes },
            comments: { title: {t('application:preference:comment')}, value: pref.comment },
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
          <Text>{t('application_not_found:title')}</Text>
          <SubText>{t('application_not_found:description')}</SubText>
        </ImageWrapper>
      );
    }
    return (
      <div>
        <HeaderWrapper>
          <Header>
            {tab === 'application' ? {t('application:my_application')} : {t('application:secret_santa_application')}}
          </Header>
        </HeaderWrapper>
        <Stepper
          steps={[
            {
              label: {t('status:looking_for_pair:label')},
              description: {t('status:looking_for_pair:description')},
              showDescription: true,
              completed:
                tabApplicationStatus !== EventApplicationStatus.LookingForPair,
            },
            {
              label: {t('status:paired:label')}
              description: {t('status:paired:description')},
              showDescription: true,
              completed:
                tabApplicationStatus === EventApplicationStatus.Paired ||
                tabApplicationStatus === EventApplicationStatus.GiftSent ||
                tabApplicationStatus === EventApplicationStatus.GiftReceived ||
                tabApplicationStatus === EventApplicationStatus.GiftNotReceived,
            },
            {
              label: {t('status:gift_sent:label')},
              description: {t('status:gift_sent:description')},
              showDescription: true,
              completed:
                tabApplicationStatus === EventApplicationStatus.GiftSent ||
                tabApplicationStatus === EventApplicationStatus.GiftReceived ||
                tabApplicationStatus === EventApplicationStatus.GiftNotReceived,
            },
            {
              label: {t('status:gift_received:label')},
              description: {t('status:gift_received:description')},
              showDescription: true,
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
                  {t('resolve:gift_received:title')}
                </Button>
                <DialogConfirmAction
                  isOpen={isGiftReceivedDialogOpen}
                  onCancelClick={(): void => setGiftReceivedDialogOpen(false)}
                  title= {t('resolve:gift_received:dialog:title')}
                  description= {t('resolve:gift_received:dialog:description')}
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
                  cancelButtonText={t('resolve:gift_received:dialog:cancel')}
                  /* eslint-disable-next-line sonarjs/no-duplicate-string */
                  confirmButtonText={t('resolve:gift_received:dialog:confirm')}
                />
                <Button
                  variant={ButtonVariant.warning}
                  onClick={handleGiftNotReceivedClick}
                >
                 {t('resolve:gift_not_received:title')}
                </Button>
                <DialogConfirmAction
                  isOpen={isGiftNotReceivedDialogOpen}
                  onCancelClick={(): void =>
                    setGiftNotReceivedDialogOpen(false)
                  }
                  title={t('resolve:gift_not_received:dialog:title')}
                  description={t('resolve:gift_not_received:dialog:description')}
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
                  cancelButtonText={t('resolve:gift_not_received:dialog:cancel')}
                  confirmButtonText={t('resolve:gift_not_received:dialog:confirm')}
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
              {t('resolve:gift_sent:title')}
            </Button>
            <DialogConfirmAction
              isOpen={isGiftSentDialogOpen}
              onCancelClick={(): void => setGiftSentDialogOpen(false)}
              title={t('resolve:gift_sent:dialog:title')}
              description={t('resolve:gift_sent:dialog:description')}
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
              cancelButtonText={t('resolve:gift_sent:dialog:cancel')}
              confirmButtonText={t('resolve:gift_sent:dialog:confirm')}
            />
            <Button variant={ButtonVariant.secondary} onClick={goToChat}>
              {t('resolve:write_to_santa')}
            </Button>
          </ButtonWrapper>
        )}
        <CardPreference
          header={t('application:preference:title')}
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
            : `${t('event:untill_ending')} ${daysToExpire} ${pluralize(
                daysToExpire,
                {t('event:one_day')},
                {t('event:two_days')},
                 {t('event:many_days')},
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
               {t('event:one_pair')},
              {t('event:two_pairs')},
                 {t('event:many_pairs')},
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
        <ButtonLargeWrapper>
          {isExpired ? (
            <ButtonLarge disabled={true}>{t('event:expired')}</ButtonLarge>
          ) : (
            <ButtonLarge onClick={participate}>{t('event:participate')}</ButtonLarge>
          )}
        </ButtonLargeWrapper>
      )}
      {eventApplicationPairData?.getEventApplicationPairByEventAndAccount && (
        <TabApplications
          tabs={[
            {
              label: {t('application:my_application')},
              value: 'application',
              component: renderApplication(activeTab),
            },
            {
              label: {t('application:secret_santa_application')},
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
