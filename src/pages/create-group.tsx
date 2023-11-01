import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Button, ButtonVariant } from '@components/ui/common/button';
import { Page } from '@components/ui/common/page';
import { CardGenerateInvite } from '@components/ui/custom/card-generate-invite';
import { DialogGenerateInvite } from '@components/ui/custom/dialog-generate-invite';
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@mui/material/TextField';
import { CardCreateOrUpdateGroup } from 'src/components/ui/custom/card-create/card-create-or-update-group';
import styled from 'styled-components';
import * as Yup from 'yup';

import { GroupType, useCreateGroupMutation } from '@/generated/graphql';
import { log } from '@/services/log';
import { useAuthStore } from '@/store/auth.store';

const validationSchema = Yup.object().shape({
  groupName: Yup.string().required('Обязательное поле'),
  groupDescription: Yup.string().required('Обязательное поле'),
});

type FormData = {
  groupName: string;
  groupDescription: string;
};

const CreateGroup: FC = () => {
  const authStore = useAuthStore();
  const router = useRouter();
  const [createGroup, { reset }] = useCreateGroupMutation();
  const [isPrivate, setIsPrivate] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });
  // eslint-disable-next-line unicorn/no-null
  const [groupId, setGroupId] = useState<number | null>(null);
  const [groupCreated, setGroupCreated] = useState(false);

  const handleBackClick = async (): Promise<void> => {
    await router.push(isPrivate ? '/private-groups' : '/public-groups');
  };
  const handleClickOpenDialog = (): void => {
    setShowDialog(true);
  };

  const handleClickCloseDialog = (): void => {
    setShowDialog(false);
  };

  const handleAccessLevelChange = (level: string): void => {
    setIsPrivate(level === GroupType.Private);
  };

  const handleFormSubmit = async (formData: FormData): Promise<void> => {
    if (Object.keys(formState.errors).length > 0) {
      log.debug('Error', formState.errors);
      return;
    }
    log.debug('Data', formData);
    const createGroupResponse = await createGroup({
      variables: {
        name: formData.groupName,
        description: formData.groupDescription,
        type: isPrivate ? GroupType.Private : GroupType.Public,
      },
    });
    log.debug('Create group response', createGroupResponse);
    if (createGroupResponse.data?.createGroup) {
      if (isPrivate) {
        setGroupCreated(true);
      }
      setGroupId(createGroupResponse.data.createGroup.id);
      reset();
      if (!isPrivate) {
        await router.push(`/public-groups`);
      }
    }
  };

  useEffect(() => {
    if (!authStore.token) {
      router.push('/auth/login');
    }
  }, [authStore]);

  return (
    <Page title={'Cоздание группы'} style={{ gap: 16, marginTop: 24 }}>
      <Header>Создание группы</Header>
      <FormWrapper
        onSubmit={handleSubmit(async (formData) => {
          try {
            await handleFormSubmit(formData);
          } catch (submitError) {
            log.error('Create group error', submitError);
          }
        })}
      >
        <CardCreateOrUpdateGroup
          accessLevelTitle="Уровень доступа"
          accessLevelOptions={['Публичная', 'Приватная']}
          defaultOption={'Публичная'}
          onAccessLevelChange={handleAccessLevelChange}
        >
          {[
            <TextField
              key="groupName"
              id="field-groupName"
              label="Название группы"
              type="text"
              fullWidth
              size="small"
              multiline={false}
              error={Boolean(formState.errors.groupName)}
              helperText={formState.errors.groupName?.message}
              {...register('groupName')}
            />,
            <TextField
              key="groupDescription"
              id="field-groupDescription"
              label="Описание группы"
              type="text"
              fullWidth
              size="medium"
              multiline={true}
              error={Boolean(formState.errors.groupDescription)}
              helperText={formState.errors.groupDescription?.message}
              {...register('groupDescription')}
            />,
          ]}
        </CardCreateOrUpdateGroup>
        {groupCreated && isPrivate && (
          <CardGenerateInvite
            title={'Участники'}
            description={'Нажми на кнопку чтобы сгенерировать приглашение.'}
            onGenerateInviteClick={handleClickOpenDialog}
            button={'Пригласить'}
          />
        )}
        <Button
          variant={ButtonVariant.primary}
          onClick={handleSubmit(async (formData) => {
            try {
              await handleFormSubmit(formData);
              if (isPrivate) {
                handleClickOpenDialog();
              }
            } catch (submitError) {
              log.error('Create group error', submitError);
            }
          })}
          disabled={groupCreated}
        >
          Создать группу
        </Button>
        <Button variant={ButtonVariant.secondary} onClick={handleBackClick}>
          Назад
        </Button>
      </FormWrapper>
      <DialogGenerateInvite
        isOpen={showDialog}
        title="Скопируй и отправь другу"
        onCancelClick={handleClickCloseDialog}
        cancelButtonLabel={'Закрыть'}
        linkLabel={'Ссылка на приглашение'}
        clipboardMessage={'Ссылка скопирована'}
        generateButtonLabel={'Сгенерировать'}
        groupId={groupId!}
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

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-right: 24px;
  margin-left: 24px;
`;

export default CreateGroup;
