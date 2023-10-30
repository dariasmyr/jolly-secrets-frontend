import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { FabAdd } from '@components/ui/common/fab-add';
import { Page } from '@components/ui/common/page';
import { CardImage } from '@components/ui/custom/card-image';
import { DialogConfirmAction } from 'src/components/ui/custom/dialog-confirm-action';
import styled from 'styled-components';

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

  const createGroup = (): void => {
    // eslint-disable-next-line no-alert
    router.push('/create-group');
  };

  useEffect(() => {
    if (!authStore.token) {
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
      {data?.privateGroups.map((group) => {
        const isAdmin = group.members!.some(
          (member) => member.role === GroupMemberRole.Admin,
        );

        let tags = [];

        tags = isAdmin
          ? [
              {
                title: `${group.members?.length} человек`,
              },
              {
                title: 'Я создатель',
                warning: true,
              },
            ]
          : [
              {
                title: `${group.members?.length} человек`,
              },
            ];
        return (
          <CardImage
            key={group.id}
            imageUrl={group.pictureUrl}
            preHeader={`${group.events?.filter(
              (event) => event.status === EventStatus.Open,
            )?.length} активных событий`}
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

export default PrivateGroups;
