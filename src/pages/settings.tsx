// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable unicorn/no-null */
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Button, ButtonVariant } from '@components/ui/common/button';
import { FabMode } from '@components/ui/common/fab-mode';
import { Page } from '@components/ui/common/page';
import { Description, Paper } from '@components/ui/common/styled-components';
import { yupResolver } from '@hookform/resolvers/yup';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { Avatar, Switch } from '@mui/material';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import * as Yup from 'yup';

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
  username: Yup.string().required('Required field'),
});

const deletionValidationSchema = Yup.object().shape({
  deleteAccountPhrase: Yup.string().oneOf(
    ['Delete account', 'Удалить аккаунт'],
    'Incorrect phrase',
  ),
});

type FormData = {
  username: string;
  deleteAccountPhrase?: string;
};

const Settings: FC = () => {
  const { t } = useTranslation(['common', 'settings', 'menu']);
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
        message: t('settings:name_change.success'),
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
        message: t('settings:notifications.disable_message'),
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
    <Page
      title={t('settings:name_change.title')}
      style={{ gap: 16, marginTop: 24 }}
    >
      <PageWrapper>
        <SettingsWrapper>
          <Header>{t('settings:name_change.title')}</Header>
          <Paper>
            {
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
                  label={t('settings:name_change.label')}
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
                    handleSubmitName(
                      async (formData: FormData): Promise<void> => {
                        try {
                          await handleUsernameSubmit(formData.username);
                        } catch (submitError) {
                          log.error('Update account error', submitError);
                        }
                      },
                    )()
                  }
                >
                  {t('settings:name_change.save')}
                </Button>
              </FormWrapper>
            }
          </Paper>
          <Header>{t('settings:notifications.title')}</Header>
          <Paper>
            <FormWrapper>
              <HeaderWrapper>
                <NameWrapper>
                  <Avatar variant="rounded">
                    <AlternateEmailIcon />
                  </Avatar>
                  <Header>{t('settings:notifications.media')}</Header>
                </NameWrapper>
                <Switch
                  {...label}
                  checked={notifEnabled}
                  onChange={(event): Promise<void> =>
                    handleNotifSwitch(event.target.checked)
                  }
                />
              </HeaderWrapper>
              <ContentWrapper>
                <Description>
                  {t('settings:notifications.description')}
                </Description>
                {notifEnabled &&
                  contact &&
                  (isGoogleProfile ? (
                    <Description>{`${t(
                      'settings:notifications.current_email',
                    )} ${contact}`}</Description>
                  ) : (
                    <Description>{`${t(
                      'settings:notifications.current_telegram',
                    )} ${telegramId}`}</Description>
                  ))}
              </ContentWrapper>
            </FormWrapper>
          </Paper>
          <Header>{t('settings:delete.title')}</Header>
          <Paper>
            <FormWrapper
              onSubmit={handleSubmitDelete(async () => {
                try {
                  await handleDeleteAccountSubmit();
                } catch (submitError) {
                  log.error('Delete account error', submitError);
                }
              })}
            >
              <Description>{t('settings:delete.description')}</Description>
              <TextField
                key="deleteAccount"
                id="field-deleteAccount"
                type="text"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                size="small"
                variant="standard"
                color={'error'}
                multiline={false}
                error={Boolean(formStateDelete.errors.deleteAccountPhrase)}
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
                {t('settings:delete.action')}
              </Button>
            </FormWrapper>
          </Paper>
        </SettingsWrapper>
        <FabMode />
        <Snackbar
          open={snackbarData.open}
          autoHideDuration={3000}
          onClose={(): void =>
            setSnackbarData({ ...snackbarData, open: false })
          }
        >
          <Alert severity="warning" sx={{ width: '100%' }}>
            {snackbarData.message}
          </Alert>
        </Snackbar>
        <DialogConfirmAction
          isOpen={isDialogOpen}
          title={t('settings:notifications.dialog:title')}
          description={t('settings:notifications.dialog.description')}
          cancelButtonText={t('settings:notifications.dialog.cancel')}
          confirmButtonText={t('settings:notifications.dialog.confirm')}
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
          title={t('settings:delete.dialog.title')}
          description={t('settings:delete.dialog.description')}
          cancelButtonText={t('settings:delete.dialog.cancel')}
          confirmButtonText={t('settings:delete.dialog.confirm')}
          onCancelClick={(): void => {
            handleConfirmDialogClose();
          }}
          onConfirmClick={(): void => {
            handleDeleteAccountSubmit();
          }}
        />
      </PageWrapper>
    </Page>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', [
        'settings',
        'common',
        'menu',
        'errors',
      ])),
    },
  };
};

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
  margin: 16px 0;
`;

const SettingsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  width: 100%;

  @media only screen and (min-width: 600px) {
    &:only-child {
      width: calc(100% - 10px);
    }
  }
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 0 10px;
  width: 100%;
  max-width: 500px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 8px;
  width: 100%;
  overflow: auto;
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 90%;
`;

const NameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  gap: 16px;
`;

export default Settings;
