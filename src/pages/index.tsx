import { FC, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { FabAdd } from '@components/ui/common/fab-add';
import { Page } from '@components/ui/common/page';
import { CardImage } from '@components/ui/custom/card-image';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { DialogConfirmAction } from 'src/components/ui/custom/dialog-confirm-action';
import styled from 'styled-components';

import { Header } from '@/components/ui/common/page/styled-components';
import {
  StyledImage,
  SubText,
  Text,
} from '@/components/ui/common/styled-components';
import {
  EventStatus,
  GroupMemberRole,
  GroupStatus,
  useDeleteGroupMutation,
  useGetAccountCountQuery,
  usePublicGroupsQuery,
} from '@/generated/graphql';
import { useAuthStore } from '@/store/auth.store';

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

  if ([2, 3, 4].includes(lastDigit) && ![12, 13, 14].includes(lastTwoDigits)) {
    return two;
  }

  return many;
}

const PublicGroups: FC = () => {
  const { t } = useTranslation(['common', 'group', 'event', 'menu']);
  const authStore = useAuthStore();
  const router = useRouter();
  const [isDialogOpen, setDialogOpen] = useState(false);
  // eslint-disable-next-line unicorn/no-null
  const [groupToDelete, setGroupToDelete] = useState<number | null>(null);
  const [deleteGroup] = useDeleteGroupMutation();

  const [snackbarData, setSnackbarData] = useState({
    open: false,
    message: '',
  });

  useEffect(() => {
    if (!authStore.token || !authStore.account?.id) {
      router.push('/auth/login');
    }
  }, [authStore]);

  const { data, error, loading, refetch } = usePublicGroupsQuery({
    variables: {
      offset: 0,
      limit: 100,
    },
  });

  const {
    data: accountCountData,
    error: accountCountError,
    loading: accountCountLoading,
  } = useGetAccountCountQuery({});

  const createGroup = (): void => {
    // eslint-disable-next-line no-alert
    router.push('/create-group');
  };

  if (loading || accountCountLoading) {
    // eslint-disable-next-line sonarjs/no-duplicate-string
    return <Page title={'Jolly Secrets'}>Loading...</Page>;
  }

  if (error || accountCountError) {
    return <Page title={'Jolly Secrets'}>Error: {JSON.stringify(error)}</Page>;
  }
  return (
    <Page title={'Jolly Secrets'} style={{ gap: 16, marginTop: 24 }}>
      <Header>{t('group:groups.public')}</Header>
      <ArrayWrapper>
        {data?.publicGroups.length === 0 && (
          <Wrapper>
            <StyledImage>
              <Image
                src={'/assets/sand-clock.png'}
                width={100}
                height={150}
                alt="Wait"
              />
            </StyledImage>
            <Text>{t('group:groups.no_groups_title')}</Text>
            <SubText>{t('group:groups.no_groups_description')}</SubText>
          </Wrapper>
        )}
        {data?.publicGroups.map((group) => {
          const isAdmin = group.members!.some(
            (member) =>
              member.role === GroupMemberRole.Admin &&
              member.accountId === authStore.account?.id,
          );

          let tags = [];

          tags = isAdmin
            ? [
                {
                  title: t('group:groups.creator'),
                  warning: true,
                },
              ]
            : [
                {
                  title: `${accountCountData?.getAccountCount} ${pluralize(
                    accountCountData!.getAccountCount!,
                    t('group:groups.one_member'),
                    t('group:groups.two_members'),
                    t('group:groups.many_members'),
                  )}`,
                },
              ];
          return (
            <CardImage
              key={group.id}
              imageUrl={
                group.pictureUrl
                  ? process.env.NEXT_PUBLIC_REST_API_URL + group.pictureUrl
                  : '/assets/hover.jpg'
              }
              preHeader={`${group.events?.filter(
                (event) => event.status === EventStatus.Open,
              )?.length} ${pluralize(
                group.events!.filter(
                  (event) => event.status === EventStatus.Open,
                )?.length,
                t('event:events.one_еvent'),
                t('event:events.two_еvents'),
                t('event:events.many_еvents'),
              )}`}
              header={group.name}
              text={group.description}
              tags={tags}
              menu={
                isAdmin
                  ? {
                      options: [
                        {
                          title: t('group:group.change.title'),
                          onClick: (): void => {
                            router.push(`/update-group?id=${group.id}`);
                          },
                        },
                        {
                          title: t('group:group.delete.title'),
                          onClick: (): void => {
                            setGroupToDelete(group.id);
                            setDialogOpen(true);
                          },
                        },
                      ],
                    }
                  : undefined
              }
              onClick={(): void => {
                router.push(`/events?groupId=${group.id}`);
              }}
            />
          );
        })}
      </ArrayWrapper>
      <FabAdd onClick={createGroup} />
      <DialogConfirmAction
        isOpen={isDialogOpen}
        title={t('group:group.delete.dialog.title')}
        description={t('group:group.delete.dialog.description')}
        cancelButtonText={t('group:group.delete.dialog.cancel')}
        confirmButtonText={t('group:group.delete.dialog.confirm')}
        onCancelClick={(): void => setDialogOpen(false)}
        onConfirmClick={async (): Promise<void> => {
          if (!groupToDelete) {
            return;
          }
          const { data: deletedGroup } = await deleteGroup({
            variables: { id: groupToDelete },
          });
          if (deletedGroup?.deleteGroup.status === GroupStatus.Closed) {
            // eslint-disable-next-line unicorn/no-null
            setGroupToDelete(null);
            await refetch();
            setDialogOpen(false);
            setSnackbarData({
              open: true,
              message: t('group:group.delete.success'),
            });
          }
        }}
      />
      <Snackbar
        open={snackbarData.open}
        autoHideDuration={3000}
        onClose={(): void => setSnackbarData({ ...snackbarData, open: false })}
      >
        <Alert severity="warning" sx={{ width: '100%' }}>
          {snackbarData.message}
        </Alert>
      </Snackbar>
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

export const ArrayWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-self: center;
  padding: 0px 10px;
  gap: 10px;
  justify-content: space-around;
  max-width: 1000px;
  width: 100%;
`;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', [
        'group',
        'common',
        'event',
        'menu',
      ])),
    },
  };
};

export default PublicGroups;
