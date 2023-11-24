// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable unicorn/no-null */
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Button, ButtonVariant } from '@components/ui/common/button';
import { Page } from '@components/ui/common/page';
import { FormWrapper } from '@components/ui/common/styled-components';
import { CardGenerateInvite } from '@components/ui/custom/card-generate-invite';
import { DialogGenerateInvite } from '@components/ui/custom/dialog-generate-invite';
import { yupResolver } from '@hookform/resolvers/yup';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { CardCreateOrUpdateGroup } from 'src/components/ui/custom/card-create/card-create-or-update-group';
import * as Yup from 'yup';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Header } from '@/components/ui/common/page/styled-components';
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
  const { t } = useTranslation(['common', 'auth']);
  const locale = localeDetectorService.detect();
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
    setIsPrivate(option.value === 'PRIVATE');
  };

  const handleFormSubmit = async (formData: FormData): Promise<void> => {
    if (Object.keys(formState.errors).length > 0) {
      log.debug('Error', formState.errors);
      return;
    }
    const groupNameResponse = await refetch({
      name: formData.groupName,
    });

    if (groupNameResponse.data.isGroupNameAvailable === false) {
      setSnackbarData({ open: true, message: {t('create_or_update_group:duplicate_name')} });
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
    <Page title={t('create_or_update_group:create_header')} style={{ gap: 16, marginTop: 24 }}>
      <Header>{t('create_or_update_group:create_header')}</Header>
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
          accessLevelTitle={t('create_or_update_group:access_level:title')}
          accessLevelOptions={[
            { value: GroupType.Public, label: {t('create_or_update_group:access_level:public')} },
            { value: GroupType.Private, label: {t('create_or_update_group:access_level:private')} },
          ]}
          defaultOption={{ value: GroupType.Public, label: {t('create_or_update_group:access_level:public')} }}
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
                  <Button variant={ButtonVariant.borderless}>
                    {t('create_or_update_group:choose_cover')}
                  </Button>
                )}
              </div>
            </div>,
            <TextField
              key="groupName"
              id="field-groupName"
              label= {t('create_or_update_group:group_name')}
              type="text"
              fullWidth
              size="small"
              variant="standard"
              multiline={false}
              error={Boolean(formState.errors.groupName)}
              helperText={formState.errors.groupName?.message}
              {...register('groupName')}
            />,
            <TextField
              key="groupDescription"
              id="field-groupDescription"
              label={t('create_or_update_group:group_description')}
              type="text"
              fullWidth
              size="medium"
              variant="standard"
              multiline={true}
              error={Boolean(formState.errors.groupDescription)}
              helperText={formState.errors.groupDescription?.message}
              {...register('groupDescription')}
            />,
          ]}
        </CardCreateOrUpdateGroup>
        {groupCreated && isPrivate && (
          <CardGenerateInvite
            title={t('create_or_update_group:invite:title')}
            description={t('create_or_update_group:invite:description')}
            onGenerateInviteClick={handleClickOpenDialog}
            button={t('create_or_update_group:invite:action')}
          />
        )}
        {!groupCreated && (
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
          >
            {t('create_or_update_group:create_action')}
          </Button>
        )}
        <Button variant={ButtonVariant.secondary} onClick={handleBackClick}>
          {t('create_or_update_group:back')}
        </Button>
      </FormWrapper>
      <DialogGenerateInvite
        isOpen={showDialog}
        title="Скопируй и отправь другу"
        onCancelClick={handleClickCloseDialog}
        cancelButtonLabel={t('create_or_update_group:invite:dialog:cancel')}
        linkLabel={t('create_or_update_group:invite:dialog:label')}
        clipboardMessage={t('create_or_update_group:invite:dialog:success')}
        generateButtonLabel={t('create_or_update_group:invite:dialog:generate')}
        groupId={groupId!}
      />
      <Snackbar open={snackbarData.open} autoHideDuration={6000}>
        <Alert severity="warning" sx={{ width: '100%' }}>
          {snackbarData.message}
        </Alert>
      </Snackbar>
    </Page>
  );
};

export default CreateGroup;
