// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable unicorn/no-null */
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Button, ButtonVariant } from '@components/ui/common/button';
import { Page } from '@components/ui/common/page';
import { CardGenerateInvite } from '@components/ui/custom/card-generate-invite';
import { DialogGenerateInvite } from '@components/ui/custom/dialog-generate-invite';
import { yupResolver } from '@hookform/resolvers/yup';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { CardCreateOrUpdateGroup } from 'src/components/ui/custom/card-create/card-create-or-update-group';
import styled from 'styled-components';
import * as Yup from 'yup';

import {
  GroupType,
  PriceRange,
  useCreateGroupMutation,
  useIsGroupNameAvailvableQuery,
} from '@/generated/graphql';
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
  const { refetch: refetch } = useIsGroupNameAvailvableQuery({
    variables: {
      name: '',
    },
    skip: true,
  });
  const [snackbarData, setSnackbarData] = useState({
    open: false,
    message: '',
  });
  const [createGroup, { reset }] = useCreateGroupMutation();
  const [isPrivate, setIsPrivate] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });
  const [groupId, setGroupId] = useState<number | null>(null);
  const [groupCreated, setGroupCreated] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const uploadFileReference = useRef<HTMLInputElement>(null);
  const handleImageChange = async (
    event: ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setError(null);

      const formData = new FormData();
      formData.append('files', file);

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_REST_API_URL}/upload`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );

        const fileUrl = response.data[0].path;
        setImageUrl(fileUrl);
      } catch {
        setError('An error occurred while uploading the image.');
      }
    }
  };
  const handleBackClick = async (): Promise<void> => {
    await router.push(isPrivate ? '/private-groups' : '/public-groups');
  };
  const handleClickOpenDialog = (): void => {
    setShowDialog(true);
  };

  const handleClickCloseDialog = (): void => {
    setShowDialog(false);
  };

  const handleAccessLevelChange = (option: {
    value: GroupType | PriceRange;
    label: string;
  }): void => {
    console.log('Is private', option.value === 'PRIVATE');
    setIsPrivate(option.value === 'PRIVATE');
  };

  const handleFormSubmit = async (formData: FormData): Promise<void> => {
    if (Object.keys(formState.errors).length > 0) {
      log.debug('Error', formState.errors);
      return;
    }
    log.debug('Data', formData);
    const groupNameResponse = await refetch({
      name: formData.groupName,
    });

    if (groupNameResponse.data.isGroupNameAvailable === false) {
      setSnackbarData({ open: true, message: 'Имя группы уже существует' });
      return;
    }

    const createGroupResponse = await createGroup({
      variables: {
        name: formData.groupName,
        description: formData.groupDescription,
        type: isPrivate ? GroupType.Private : GroupType.Public,
        pictureUrl: imageUrl,
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
          accessLevelOptions={[
            { value: GroupType.Public, label: 'Публичная' },
            { value: GroupType.Private, label: 'Приватная' },
          ]}
          defaultOption={{ value: GroupType.Public, label: 'Публичная' }}
          onAccessLevelChange={handleAccessLevelChange}
        >
          {[
            <div
              key="image"
              onClick={(): void => uploadFileReference.current?.click()}
            >
              <input
                ref={uploadFileReference}
                style={{ display: 'none' }}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {error && <div style={{ color: 'red' }}>{error}</div>}
              <div
                style={{
                  border: '2px dashed lightgray',
                  width: '100%',
                  height: '200px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {imageUrl ? (
                  <img
                    src={process.env.NEXT_PUBLIC_REST_API_URL + imageUrl}
                    alt="Uploaded"
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                  />
                ) : (
                  <Button
                    variant={ButtonVariant.borderless}
                    onClick={(): void => uploadFileReference.current?.click()}
                  >
                    Выбрать обложку
                  </Button>
                )}
              </div>
            </div>,
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
                console.log('Show dialog');
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
      <Snackbar open={snackbarData.open} autoHideDuration={6000}>
        <Alert severity="info" sx={{ width: '100%' }}>
          {snackbarData.message}
        </Alert>
      </Snackbar>
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
