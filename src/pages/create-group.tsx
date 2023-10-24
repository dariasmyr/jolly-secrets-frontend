import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, ButtonVariant } from '@components/ui/common/button';
import { Page } from '@components/ui/common/page';
import { CardCreateGroup } from '@components/ui/custom/card-create/card-create-group';
import { CardGenerateInvite } from '@components/ui/custom/card-generate-invite';
import { DialogGenerateInvite } from '@components/ui/custom/dialog-generate-invite';
import styled from 'styled-components';

import { GroupType, useCreateGroupMutation } from '@/generated/graphql';
import { useAuthStore } from '@/store/auth.store';

const CreateGroup: FC = () => {
  const authStore = useAuthStore();
  const router = useRouter();
  const [createGroup] = useCreateGroupMutation();
  const [isPrivate, setIsPrivate] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const handleClickOpenDialog = (): void => {
    setShowDialog(true);
  };

  const handleClickCloseDialog = (): void => {
    setShowDialog(false);
  };

  const handleAccessLevelChange = (level: string): void => {
    setIsPrivate(level === 'Приватная');
  };

  const handleTextFieldChange = (index: number, value: string): void => {
    if (index === 0) setName(value);
    else if (index === 1) setDescription(value);
  };

  const handleSubmit = (): void => {
    createGroup({
      variables: {
        name,
        description,
        type: isPrivate ? GroupType.Private : GroupType.Public,
      },
    });
  };

  useEffect(() => {
    if (!authStore.token) {
      router.push('/auth/login');
    }
  }, [authStore]);

  return (
    <Page title={'Cоздание группы'} style={{ gap: 16, marginTop: 24 }}>
      <Header>Создание группы</Header>
      <CardCreateGroup
        textFields={[
          {
            label: 'Название группы',
            multiline: false,
            onChange: handleTextFieldChange,
          },
          {
            label: 'Описание группы',
            multiline: true,
            onChange: handleTextFieldChange,
          },
        ]}
        accessLevelTitle="Уровень доступа"
        accessLevelOptions={['Публичная', 'Приватная']}
        onAccessLevelChange={handleAccessLevelChange}
      />
      {isPrivate && (
        <CardGenerateInvite
          title={'Участники'}
          description={'Нажми на кнопку чтобы сгенерировать приглашение.'}
          onGenerateInviteClick={handleClickOpenDialog}
          button={'Пригласить'}
        />
      )}
      <DialogGenerateInvite
        isOpen={showDialog}
        title="Скопируй и отправь другу"
        onCancelClick={handleClickCloseDialog}
        cancelButtonLabel={'Закрыть'}
        linkLabel={'Ссылка на приглашение'}
        clipboardMessage={'Ссылка скопирована'}
        generateButtonLabel={'Сгенерировать'}
      />
      <Button variant={ButtonVariant.primary} onClick={handleSubmit}>
        Создать группу
      </Button>
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

export default CreateGroup;
