import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Button, ButtonVariant } from '@components/ui/common/button';
import { Card } from '@components/ui/common/card';
import { Page } from '@components/ui/common/page';
import { Description, Wrapper } from '@components/ui/common/styled-components';
import { CardEmailToggle } from '@components/ui/custom/card-toggle-email';
import { HeaderWrapper } from '@components/ui/custom/card-toggle-email/styled-components';
import { DialogInputEmail } from '@components/ui/custom/dialog-input-email';
import { yupResolver } from '@hookform/resolvers/yup';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { Avatar, Switch } from '@mui/material';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import * as Yup from 'yup';

import {
  useDisableNotificationsMutation,
  useEnableNotificationsMutation,
  useUpdateAccountMutation,
  useWhoamiQuery,
} from '@/generated/graphql';
import { log } from '@/services/log';
import { useAuthStore } from '@/store/auth.store';

const validationSchema = Yup.object().shape({
  userName: Yup.string().required('Обязательное поле'),
});

type FormData = {
  userName: string;
};

const Settings: FC = () => {
  const authStore = useAuthStore();
  const router = useRouter();
  const { register, handleSubmit, formState, setValue } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      userName: 'Ваше имя',
    },
  });

  const { data } = useWhoamiQuery({});

  const [updateAccount, { reset: accountReset }] = useUpdateAccountMutation();

  const [enableNotifications, { reset: emailReset }] =
    useEnableNotificationsMutation();

  const [disableNotifications] = useDisableNotificationsMutation();

  const [snackbarData, setSnackbarData] = useState({
    open: false,
    message: '',
  });

  const [email, setEmail] = useState<string | null>(
    // eslint-disable-next-line unicorn/no-null
    data?.whoami?.email || null,
  );

  const [notifEnabled, setNotifEnabled] = useState(Boolean(email));

  const [isDialogOpen, setDialogOpen] = useState(false);

  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  useEffect(() => {
    if (!authStore.token || !authStore.account?.id) {
      router.push('/auth/login');
    }
    if (data?.whoami?.username) {
      setValue('userName', data?.whoami?.username);
    }
    // eslint-disable-next-line unicorn/no-null
    setEmail(data?.whoami?.email || null);
    setNotifEnabled(Boolean(data?.whoami?.email));
  }, [authStore, data]);

  const handleFormSubmit = async (formData: FormData): Promise<void> => {
    if (Object.keys(formState.errors).length > 0) {
      log.debug('Error', formState.errors);
      return;
    }
    const updateAccountResponse = await updateAccount({
      variables: {
        username: formData.userName,
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

  const handleNotifSwitch = async (state: boolean): Promise<void> => {
    setNotifEnabled(state);
    if (state) {
      setDialogOpen(true);
    } else {
      await disableNotifications({});
      emailReset();
      setSnackbarData({
        open: true,
        message: 'Уведомления отключены',
      });
      // eslint-disable-next-line unicorn/no-null
      setEmail(null);
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
                await handleFormSubmit(formData);
              } catch (submitError) {
                log.error('Create event error', submitError);
              }
            })}
          >
            <TextField
              key="userName"
              id="field-userName"
              label="Название события"
              type="text"
              fullWidth
              size="small"
              multiline={false}
              error={Boolean(formState.errors.userName)}
              helperText={formState.errors.userName?.message}
              {...register('userName')}
            />
            <Button
              variant={ButtonVariant.primary}
              onClick={handleSubmit(handleFormSubmit)}
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
              При включенной опции уведомления будут приходить на ваш емейл
            </Description>
            {notifEnabled && email && (
              <Description>{`Текущий адрес: ${email}`}</Description>
            )}
          </Wrapper>
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
      <DialogInputEmail
        isOpen={isDialogOpen}
        title={'Введите вашу почту'}
        initialEmail={email}
        onCancelClick={(): void => {
          setDialogOpen(false);
          setNotifEnabled(false);
        }}
        onSaveClick={(inputEmail): void => {
          setEmail(inputEmail);
          enableNotifications({
            variables: {
              email: inputEmail,
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
