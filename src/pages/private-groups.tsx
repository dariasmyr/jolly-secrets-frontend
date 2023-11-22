import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FabAdd } from '@components/ui/common/fab-add';
import { Page } from '@components/ui/common/page';
import {
  StyledImage,
  SubText,
  Text,
} from '@components/ui/common/styled-components';
import { CardImage } from '@components/ui/custom/card-image';
import { DialogConfirmAction } from 'src/components/ui/custom/dialog-confirm-action';
import styled from 'styled-components';

import { Header } from '@/components/ui/common/page/styled-components';
import {
  EventStatus,
  GroupMemberRole,
  GroupStatus,
  useDeleteGroupMutation,
  usePrivateGroupsQuery,
} from '@/generated/graphql';
import { useAuthStore } from '@/store/auth.store';

const PrivateGroups: FC = () => {
  const authStore = useAuthStore();
  const router = useRouter();
  const [isDialogOpen, setDialogOpen] = useState(false);
  // eslint-disable-next-line unicorn/no-null
  const [groupToDelete, setGroupToDelete] = useState<number | null>(null);
  const [deleteGroup] = useDeleteGroupMutation();

  const { data, error, loading, refetch } = usePrivateGroupsQuery({
    variables: {
      offset: 0,
      limit: 100,
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

  const createGroup = (): void => {
    // eslint-disable-next-line no-alert
    router.push('/create-group');
  };

  useEffect(() => {
    if (!authStore.token || !authStore.account?.id) {
      router.push('/auth/login');
    }
  }, [authStore]);

  if (loading) {
    return <Page title="Мои группы">Loading...</Page>;
  }

  if (error) {
    return <Page title="Мои группы">Error: {JSON.stringify(error)}</Page>;
  }

  return (
    <Page title={'Мои группы'} style={{ gap: 16, marginTop: 24 }}>
      <Header>Мои группы</Header>
      {data?.privateGroups.length === 0 && (
        <Wrapper>
          <StyledImage>
            <Image
              src={'/assets/sand-clock.png'}
              width={100}
              height={100}
              alt="Wait"
            />
          </StyledImage>
          <Text>Групп пока нет.</Text>
          <SubText>Создайте первую группу!</SubText>
        </Wrapper>
      )}
      {data?.privateGroups.map((group) => {
        const isAdmin = group.members!.some(
          (member) => member.role === GroupMemberRole.Admin,
        );

        let tags = [];

        tags = isAdmin
          ? [
              {
                title: `${group.members!.length} ${pluralize(
                  group.members!.length,
                  'человек',
                  'человека',
                  'человек',
                )}`,
              },
              {
                title: 'Я создатель',
                warning: true,
              },
            ]
          : [
              {
                title: `${group.members!.length} ${pluralize(
                  group.members!.length,
                  'человек',
                  'человека',
                  'человек',
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
              group.events!.filter((event) => event.status === EventStatus.Open)
                ?.length,
              'активное событие',
              'активных события',
              'активных событий',
            )}`}
            header={group.name}
            text={group.description}
            tags={tags}
            menu={
              isAdmin
                ? {
                    options: [
                      {
                        title: 'Изменить',
                        onClick: (): void => {
                          router.push(`/update-group?id=${group.id}`);
                        },
                      },
                      {
                        title: 'Удалить',
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
      <FabAdd onClick={createGroup} />
      <DialogConfirmAction
        isOpen={isDialogOpen}
        title="Удалить группу"
        description="Вы уверены, что хотите удалить эту группу? Это действие не может быть отменено."
        cancelButtonText="Отмена"
        confirmButtonText="Удалить"
        onCancelClick={(): void => setDialogOpen(false)}
        onConfirmClick={async (): Promise<void> => {
          if (!groupToDelete) {
            return;
          }
          const { data: deletedGroup } = await deleteGroup({
            variables: { id: groupToDelete },
          });
          if (deletedGroup?.deleteGroup.status === GroupStatus.Closed) {
            console.log('Группа удалена успешно');
            // eslint-disable-next-line unicorn/no-null
            setGroupToDelete(null);
            await refetch();
            setDialogOpen(false);
          } else {
            console.log('Ошибка при удалении группы');
          }
        }}
      />
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

export default PrivateGroups;
