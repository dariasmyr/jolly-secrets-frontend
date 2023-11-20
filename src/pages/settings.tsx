import { FC, useEffect, useState } from 'react';
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
import { Avatar, Switch } from '@mui/material';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import * as Yup from 'yup';

import { DialogConfirmAction } from '@/components/ui/custom/dialog-confirm-action';
import {
  useDeleteAccountMutation,
  useDisableNotificationsMutation,
  useEnableNotificationsMutation,
  useUpdateAccountMutation,
  useWhoamiQuery,
} from '@/generated/graphql';
import { log } from '@/services/log';
import { useAuthStore } from '@/store/auth.store';

const validationSchema = Yup.object().shape({
  publicName: Yup.string().required('Обязательное поле'),
  deleteAccount: Yup.string().oneOf(
    ['Удалить аккаунт'],
    'Введите "Удалить аккаунт"',
  ),
});

type FormData = {
  publicName: string;
  deleteAccount?: string;
};

const Settings: FC = () => {
  const authStore = useAuthStore();
  const router = useRouter();

  const { data } = useWhoamiQuery({});

  const { register, handleSubmit, formState, setValue } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      deleteAccount: '',
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
    // if account has email - set contact as email, if not - set contact as telegram uername
    // eslint-disable-next-line unicorn/no-null
    data?.whoami?.email || data?.whoami?.username || null,
  );
  const [notifEnabled, setNotifEnabled] = useState(Boolean(contact));

  const [isDialogOpen, setDialogOpen] = useState(false);

  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  useEffect(() => {
    if (!authStore.token || !authStore.account?.id) {
      router.push('/auth/login');
    }
    if (data?.whoami?.publicName) {
      setValue('publicName', data?.whoami?.publicName);
    }

    const email = data?.whoami?.email || null;
    const username = data?.whoami?.username || null;
    const isNotificationsEnabled = data?.whoami?.isNotificationsEnabled;

    if (data?.whoami?.externalProfiles.providers === 'GOOGLE') {
      setContact(email);
      setNotifEnabled(isNotificationsEnabled);
    } else {
      setContact(username);
      setNotifEnabled(isNotificationsEnabled);
    }
  }, [authStore, data]);

  const handlePublicNameSubmit = async (formData: FormData): Promise<void> => {
    if (Object.keys(formState.errors).length > 0) {
      log.debug('Error', formState.errors);
      return;
    }
    const updateAccountResponse = await updateAccount({
      variables: {
        publicName: formData.publicName,
      },
    });

    if (updateAccountResponse.data?.updateAccount) {
      setSnackbarData({
        open: true,
        message: 'Данные успешно обновлены',
      });
      accountReset();
    }
  };

  const handleDeleteAccountSubmit = async (): Promise<void> => {
    if (Object.keys(formState.errors).length > 0) {
      log.debug('Error', formState.errors);
      return;
    }
    const deleteAccountResponse = await deleteAccount({});

    if (deleteAccountResponse.data?.deleteAccount) {
      deleteReset();
    }
  };

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
      // eslint-disable-next-line unicorn/no-null
      setContact(null);
    }
  };

  return (
    <Page title={'Настройки'} style={{ gap: 16, marginTop: 24 }}>
      <Header>Личные данные</Header>
      <Card
        content={
          <FormWrapper
            onSubmit={handleSubmit(async (formData) => {
              try {
                await handlePublicNameSubmit(formData);
              } catch (submitError) {
                log.error('Update public name error', submitError);
              }
            })}
          >
            <TextField
              key="publicName"
              id="field-publicName"
              label="Текущее имя"
              type="text"
              fullWidth
              size="small"
              multiline={false}
              error={Boolean(formState.errors.publicName)}
              helperText={formState.errors.publicName?.message}
              {...register('publicName')}
            />
            <Button
              variant={ButtonVariant.primary}
              onClick={(): Promise<void> =>
                handleSubmit(handlePublicNameSubmit)()
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
                <Header>Email</Header>
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
              (data?.whoami?.externalProfiles.providers === 'GOOGLE' ? (
                <Description>{`Текущий адрес: ${contact}`}</Description>
              ) : (
                <Description>{`Текущий Telegram ID: ${contact}`}</Description>
              ))}
          </Wrapper>
        }
      />
      <Header>Удаление аккаунта</Header>
      <Card
        content={
          <FormWrapper
            onSubmit={handleSubmit(async () => {
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
              fullWidth
              size="small"
              multiline={false}
              error={Boolean(formState.errors.deleteAccount)}
              helperText={formState.errors.deleteAccount?.message}
              {...register('deleteAccount')}
            />
            <Button
              variant={ButtonVariant.primary}
              onClick={(): Promise<void> =>
                handleSubmit(handleDeleteAccountSubmit)()
              }
            >
              Удалить аккаунт
            </Button>
          </FormWrapper>
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
          enableNotifications({
            variables: {
              contact: contact,
            },
          });
          setDialogOpen(false);
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
