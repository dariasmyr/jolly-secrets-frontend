// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable unicorn/no-null */
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Button, ButtonVariant } from '@components/ui/common/button';
import { Card } from '@components/ui/common/card';
import { FabMode } from '@components/ui/common/fab-mode';
import { Page } from '@components/ui/common/page';
import { Description, Wrapper } from '@components/ui/common/styled-components';
import { CardEmailToggle } from '@components/ui/custom/card-toggle-email';
import { HeaderWrapper } from '@components/ui/custom/card-toggle-email/styled-components';
import { yupResolver } from '@hookform/resolvers/yup';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { Avatar, Switch } from '@mui/material';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import * as Yup from 'yup';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Header } from '@/components/ui/common/page/styled-components';
import { DialogConfirmAction } from '@/components/ui/custom/dialog-confirm-action';
import {
  AccountStatus,
  useDeleteAccountMutation,
  useDisableNotificationsMutation,
  useEnableNotificationsMutation,
  useUpdateAccountMutation,
  useWhoamiQuery,
} from '@/generated/graphql';
import { log } from '@/services/log';
import { useAuthStore } from '@/store/auth.store';

const usernameValidationSchema = Yup.object().shape({
  username: Yup.string().required('Обязательное поле'),
});

const deletionValidationSchema = Yup.object().shape({
  deleteAccountPhrase: Yup.string().oneOf(
    ['Удалить аккаунт'],
    'Введите "Удалить аккаунт"',
  ),
});

type FormData = {
  username: string;
  deleteAccountPhrase?: string;
};

const Settings: FC = () => {
  const { t } = useTranslation(['common', 'auth']);
  const locale = localeDetectorService.detect();
  const authStore = useAuthStore();
  const router = useRouter();
  const { data } = useWhoamiQuery({});

  const {
    register: registerName,
    handleSubmit: handleSubmitName,
    formState: formStateName,
    setValue: setValueName,
  } = useForm({
    resolver: yupResolver(usernameValidationSchema),
    defaultValues: {
      username: '',
    },
  });

  const {
    register: registerDelete,
    handleSubmit: handleSubmitDelete,
    formState: formStateDelete,
  } = useForm({
    resolver: yupResolver(deletionValidationSchema),
    defaultValues: {
      deleteAccountPhrase: '',
    },
  });

  const [updateAccount, { reset: accountReset }] = useUpdateAccountMutation();
  const [deleteAccount, { reset: deleteReset }] = useDeleteAccountMutation();

  const [enableNotifications, { reset: notificationsReset }] =
    useEnableNotificationsMutation();

  const [disableNotifications] = useDisableNotificationsMutation();

  const [snackbarData, setSnackbarData] = useState({
    open: false,
    message: '',
  });

  const [contact, setContact] = useState<string | null>(
    data?.whoami?.externalProfiles?.some(
      (profile) => profile.provider === 'GOOGLE',
    )
      ? data?.whoami?.email || null
      : data?.whoami?.username || null,
  );
  const [notifEnabled, setNotifEnabled] = useState(Boolean(contact));

  const [isDialogOpen, setDialogOpen] = useState(false);

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  const telegramId =
    data?.whoami?.externalProfiles?.find(
      (profile) => profile.provider === 'TELEGRAM',
    )?.externalId || null;

  useEffect(() => {
    if (!authStore.token || !authStore.account?.id) {
      router.push('/auth/login');
    }
    if (data?.whoami?.username) {
      setValueName('username', data?.whoami?.username);
    }

    const email = data?.whoami?.email || null;
    const username = data?.whoami?.username || null;
    const isNotificationsEnabled =
      data?.whoami?.isNotificationsEnabled || false;

    if (
      data?.whoami?.externalProfiles?.some(
        (profile) => profile.provider === 'GOOGLE',
      )
    ) {
      setContact(email);
      setNotifEnabled(isNotificationsEnabled);
    } else {
      setContact(username);
      setNotifEnabled(isNotificationsEnabled);
    }
  }, [authStore, data]);

  const handleUsernameSubmit = async (username: string): Promise<void> => {
    const isValid = await usernameValidationSchema.isValid({ username });

    if (!isValid) {
      log.debug('Validation error');
      return;
    }
    const updateAccountResponse = await updateAccount({
      variables: {
        username: username,
      },
    });

    if (updateAccountResponse.data?.updateAccount) {
      setSnackbarData({
        open: true,
        message: {t('name_change:success')},
      });
      accountReset();
      authStore.setAccount({
        ...authStore.account,
        username: username,
      });
    }
  };

  const isGoogleProfile = data?.whoami?.externalProfiles?.some(
    (profile) => profile.provider === 'GOOGLE',
  );

  const handleNotifSwitch = async (state: boolean): Promise<void> => {
    setNotifEnabled(state);
    if (state) {
      setDialogOpen(true);
    } else {
      await disableNotifications({});
      notificationsReset();
      setSnackbarData({
        open: true,
        message:  {t('notifications:disable_message')},
      });
      setContact(null);
    }
  };

  const handleConfirmDialogOpen = (): void => {
    setOpenConfirmDialog(true);
  };

  const handleConfirmDialogClose = (): void => {
    setOpenConfirmDialog(false);
  };

  const handleDeleteAccountSubmit = async (): Promise<void> => {
    handleConfirmDialogClose();
    const deleteAccountResponse = await deleteAccount({});
    if (deleteAccountResponse.data?.deleteAccount) {
      deleteReset();
      if (
        deleteAccountResponse.data.deleteAccount.status ===
        AccountStatus.Deleted
      ) {
        authStore.setAccount({
          ...authStore.account,
          status: AccountStatus.Deleted,
        });
      }
    }
  };

  return (
    <Page title={'Настройки'} style={{ gap: 16, marginTop: 24 }}>
      <Header>{t('name_change:title')}</Header>
      <Card
        content={
          <FormWrapper
            onSubmit={handleSubmitName(async (formData: FormData) => {
              try {
                await handleUsernameSubmit(formData.username);
              } catch (submitError) {
                log.error('Update account error', submitError);
              }
            })}
          >
            <TextField
              key="username"
              id="field-userName"
              label={t('name_change:label')}
              InputLabelProps={{
                shrink: true,
              }}
              type="text"
              fullWidth
              size="small"
              variant="standard"
              multiline={false}
              error={Boolean(formStateName.errors.username)}
              helperText={formStateName.errors.username?.message}
              {...registerName('username')}
              defaultValue={data?.whoami?.username || ''}
            />
            <Button
              variant={ButtonVariant.primary}
              onClick={(): Promise<void> =>
                handleSubmitName(async (formData: FormData): Promise<void> => {
                  try {
                    await handleUsernameSubmit(formData.username);
                  } catch (submitError) {
                    log.error('Update account error', submitError);
                  }
                })()
              }
            >
              {t('name_change:save')}
            </Button>
          </FormWrapper>
        }
      />
      <Header>{t('notifications:title')}</Header>
      <CardEmailToggle
        content={
          <Wrapper>
            <HeaderWrapper>
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <Avatar variant="rounded">
                  <AlternateEmailIcon />
                </Avatar>
                <Header>{t('notifications:media')}</Header>
              </div>
              <Switch
                {...label}
                checked={notifEnabled}
                onChange={(event): Promise<void> =>
                  handleNotifSwitch(event.target.checked)
                }
              />
            </HeaderWrapper>
            <Description>
              {t('notifications:description')}
            </Description>
            {notifEnabled &&
              contact &&
              (isGoogleProfile ? (
                <Description>{`{t('notifications:current_email')} ${contact}`}</Description>
              ) : (
                <Description>{`{t('notifications:current_telegram')} ${telegramId}`}</Description>
              ))}
          </Wrapper>
        }
      />
      <Header>{t('delete:title')}</Header>
      <Card
        content={
          <FormWrapper
            onSubmit={handleSubmitDelete(async () => {
              try {
                await handleDeleteAccountSubmit();
              } catch (submitError) {
                log.error('Delete account error', submitError);
              }
            })}
          >
            <Description>
              {t('delete:description')}
            </Description>
            <TextField
              key="deleteAccount"
              id="field-deleteAccount"
              type="text"
              label={t('delete:delete')}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              size="small"
              variant="standard"
              color={'error'}
              multiline={false}
              error={Boolean(formStateDelete.errors.deleteAccountPhrase)}
              helperText={formStateDelete.errors.deleteAccountPhrase?.message}
              {...registerDelete('deleteAccountPhrase')}
            />
            <Button
              variant={ButtonVariant.error}
              onClick={handleSubmitDelete(async (): Promise<void> => {
                try {
                  const isValid =
                    await deletionValidationSchema.isValid(formStateDelete);
                  if (!isValid) {
                    log.debug('Validation error');
                    return;
                  }
                  handleConfirmDialogOpen();
                } catch (submitError) {
                  log.error('Delete account error', submitError);
                }
              })}
            >
              {t('delete:delete')}
            </Button>
          </FormWrapper>
        }
      />
      <FabMode />
      <Snackbar
        open={snackbarData.open}
        autoHideDuration={3000}
        onClose={(): void => setSnackbarData({ ...snackbarData, open: false })}
      >
        <Alert severity="warning" sx={{ width: '100%' }}>
          {snackbarData.message}
        </Alert>
      </Snackbar>
      <DialogConfirmAction
        isOpen={isDialogOpen}
        title={t('notifications:dialog:title')}
        description={t('notifications:dialog:description')}
        cancelButtonText={t('notifications:dialog:cancel')}
        confirmButtonText={t('notifications:dialog:confirm')}
        onCancelClick={(): void => {
          setDialogOpen(false);
          setNotifEnabled(false);
        }}
        onConfirmClick={(): void => {
          setContact(contact);
          enableNotifications({});
          setDialogOpen(false);
        }}
      />
      <DialogConfirmAction
        isOpen={openConfirmDialog}
        title={t('delete:dialog:title')}
        description={t('delete:dialog:description')}
        cancelButtonText={t('delete:dialog:cancel')}
        confirmButtonText={t('delete:dialog:confirm')}
        onCancelClick={(): void => {
          handleConfirmDialogClose();
        }}
        onConfirmClick={(): void => {
          handleDeleteAccountSubmit();
        }}
      />
    </Page>
  );
};

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  width: 75%;
`;
export default Settings;
