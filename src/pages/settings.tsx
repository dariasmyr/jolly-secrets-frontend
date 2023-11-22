// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable unicorn/no-null */
import { FC, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Button, ButtonVariant } from '@components/ui/common/button';
import { Card } from '@components/ui/common/card';
import { Page } from '@components/ui/common/page';
import { Description, Wrapper } from '@components/ui/common/styled-components';
import { CardEmailToggle } from '@components/ui/custom/card-toggle-email';
import { HeaderWrapper } from '@components/ui/custom/card-toggle-email/styled-components';
import { yupResolver } from '@hookform/resolvers/yup';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { Avatar, FormControlLabel, Switch } from '@mui/material';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import { ThemeContext } from '@pages/_app.context';
import styled from 'styled-components';
import * as Yup from 'yup';

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
  const authStore = useAuthStore();
  const router = useRouter();
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

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
        message: 'Данные успешно обновлены',
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
        message: 'Уведомления отключены',
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
      <Header>Личные данные</Header>
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
              label="Имя"
              InputLabelProps={{
                shrink: true,
              }}
              type="text"
              fullWidth
              size="small"
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
              Сохранить
            </Button>
          </FormWrapper>
        }
      />
      <Header>Уведомления</Header>
      <CardEmailToggle
        content={
          <Wrapper>
            <HeaderWrapper>
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <Avatar variant="rounded">
                  <AlternateEmailIcon />
                </Avatar>
                <Header>Email/Telegram</Header>
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
              При включенной опции уведомления будут приходить на ваш емейл или
              в телеграмм
            </Description>
            {notifEnabled &&
              contact &&
              (isGoogleProfile ? (
                <Description>{`Текущий адрес: ${contact}`}</Description>
              ) : (
                <Description>{`Текущий Telegram ID: ${telegramId}`}</Description>
              ))}
          </Wrapper>
        }
      />
      <Header>Удаление аккаунта</Header>
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
              Чтобы удалить аккаунт напишите “Удалить аккаунт”
            </Description>
            <TextField
              key="deleteAccount"
              id="field-deleteAccount"
              type="text"
              label="Удалить аккаунт"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              size="small"
              multiline={false}
              error={Boolean(formStateDelete.errors.deleteAccountPhrase)}
              helperText={formStateDelete.errors.deleteAccountPhrase?.message}
              {...registerDelete('deleteAccountPhrase')}
            />
            <Button
              variant={ButtonVariant.primary}
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
              Удалить аккаунт
            </Button>
          </FormWrapper>
        }
      />
      <Header>Внешний вид</Header>
      <Card
        content={
          <FormControlLabel
            control={
              <Switch
                checked={darkMode}
                onChange={toggleDarkMode}
                color="primary"
              />
            }
            label={`Переключиться на ${darkMode ? 'светлую' : 'темную'} тему`}
          />
        }
      />
      <Snackbar
        open={snackbarData.open}
        autoHideDuration={3000}
        onClose={(): void => setSnackbarData({ ...snackbarData, open: false })}
      >
        <Alert severity="info" sx={{ width: '100%' }}>
          {snackbarData.message}
        </Alert>
      </Snackbar>
      <DialogConfirmAction
        isOpen={isDialogOpen}
        title={'Уверены?'}
        description={'Вы уверены что ходите включить уведомления?'}
        cancelButtonText={'Отмена'}
        confirmButtonText={'Да, включить'}
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
        title={'Подтвердите удаление аккаунта'}
        description={
          'Вы уверены, что хотите удалить свой аккаунт? Это действие не может быть отменено.'
        }
        cancelButtonText={'Отмена'}
        confirmButtonText={'Да, включить'}
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

export default Settings;
