import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Button, ButtonVariant } from '@components/ui/common/button';
import { Page } from '@components/ui/common/page';
import { CardCreateEvent } from '@components/ui/custom/card-create/card-create-event';
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@mui/material/TextField';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import styled from 'styled-components';
import * as Yup from 'yup';

import { useCreateEventMutation } from '@/generated/graphql';
import { log } from '@/services/log';
import { useAuthStore } from '@/store/auth.store';

const validationSchema = Yup.object().shape({
  eventName: Yup.string().required('Обязательное поле'),
  eventDescription: Yup.string().required('Обязательное поле'),
});

type FormData = {
  eventName: string;
  eventDescription: string;
};

const CreateEvent: FC = () => {
  const authStore = useAuthStore();
  const router = useRouter();
  const [createEvent, { reset }] = useCreateEventMutation();
  const [endDate, setEndDate] = useState(new Date());
  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });
  const groupId = router.query.groupId;

  const handleBackClick = async (): Promise<void> => {
    await router.push(`/events?groupId=${groupId}`);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleFormSubmit = async (formData: FormData): Promise<void> => {
    if (Object.keys(formState.errors).length > 0) {
      log.debug('Error', formState.errors);
      return;
    }
    log.debug('Data', formData);
    const createEventResponse = await createEvent({
      variables: {
        groupId: Number(groupId),
        name: formData.eventName,
        description: formData.eventDescription,
        startsAt: today,
        endsAt: endDate,
      },
    });
    log.debug('Create event response', createEventResponse);
    if (createEventResponse.data?.createEvent) {
      reset();
      await router.push(`/events?groupId=${groupId}`);
    }
  };

  useEffect(() => {
    if (!authStore.token) {
      router.push('/auth/login');
    }
  }, [authStore]);

  return (
    <Page title={'Cоздание события'} style={{ gap: 16, marginTop: 24 }}>
      <Header>Создание события</Header>
      <FormWrapper
        onSubmit={handleSubmit(async (formData) => {
          try {
            await handleFormSubmit(formData);
          } catch (submitError) {
            log.error('Create event error', submitError);
          }
        })}
      >
        <CardCreateEvent>
          {[
            <TextField
              key="eventName"
              id="field-eventName"
              label="Название события"
              type="text"
              fullWidth
              size="small"
              multiline={false}
              error={Boolean(formState.errors.eventName)}
              helperText={formState.errors.eventName?.message}
              {...register('eventName')}
            />,
            <TextField
              key="eventDescription"
              id="field-eventDescription"
              label="Описание cобытия"
              type="text"
              fullWidth
              size="medium"
              multiline={true}
              error={Boolean(formState.errors.eventDescription)}
              helperText={formState.errors.eventDescription?.message}
              {...register('eventDescription')}
            />,
            <LocalizationProvider key="eventDate" dateAdapter={AdapterDayjs}>
              <DatePicker
                key="eventDate"
                label="Дата события"
                value={dayjs(endDate)}
                onChange={(newValue): void => {
                  if (newValue) {
                    setEndDate(newValue.toDate());
                  }
                }}
                slotProps={{}}
              />
            </LocalizationProvider>,
          ]}
        </CardCreateEvent>
        <Button
          variant={ButtonVariant.primary}
          onClick={handleSubmit(async (formData) => {
            try {
              await handleFormSubmit(formData);
            } catch (submitError) {
              log.error('Create group error', submitError);
            }
          })}
        >
          Создать событие
        </Button>
        <Button variant={ButtonVariant.secondary} onClick={handleBackClick}>
          Назад
        </Button>
      </FormWrapper>
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

export default CreateEvent;
