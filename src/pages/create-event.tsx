// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable unicorn/no-null */
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Button, ButtonVariant } from '@components/ui/common/button';
import { Page } from '@components/ui/common/page';
import { FormWrapper } from '@components/ui/common/styled-components';
import { CardCreateEvent } from '@components/ui/custom/card-create/card-create-event';
import { yupResolver } from '@hookform/resolvers/yup';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';
import dayjs, { Dayjs } from 'dayjs';
import * as Yup from 'yup';

import { Header } from '@/components/ui/common/page/styled-components';
import { useCreateEventMutation } from '@/generated/graphql';
import { log } from '@/services/log';
import { useAuthStore } from '@/store/auth.store';

const today = dayjs(new Date());

const validationSchema = Yup.object().shape({
  eventName: Yup.string().required('Required field'),
  eventDescription: Yup.string().required('Required field'),
});

type FormData = {
  eventName: string;
  eventDescription: string;
};

const CreateEvent: FC = () => {
  const { t } = useTranslation(['common', 'event', 'group', 'menu']);
  const authStore = useAuthStore();
  const router = useRouter();
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs(today));
  const [createEvent, { reset }] = useCreateEventMutation();
  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });
  const groupId = router.query.groupId;
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const uploadFileReference = useRef<HTMLInputElement>(null);
  const [snackbarData, setSnackbarData] = useState({
    open: false,
    message: '',
  });
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
    await router.push(`/events?groupId=${groupId}`);
  };

  const handleFormSubmit = async (formData: FormData): Promise<void> => {
    if (Object.keys(formState.errors).length > 0) {
      log.debug('Error', formState.errors);
      return;
    }

    if (endDate?.isSame(dayjs(today), 'date')) {
      setSnackbarData({
        open: true,
        message: t('event:create_event.date_is_same'),
      });
      return;
    }

    const createEventResponse = await createEvent({
      variables: {
        groupId: Number(groupId),
        name: formData.eventName,
        description: formData.eventDescription,
        startsAt: today,
        endsAt: endDate,
        pictureUrl: imageUrl,
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
    <Page
      title={t('event:create_event.header')}
      style={{ gap: 16, marginTop: 24 }}
    >
      <Header> {t('event:create_event.header')}</Header>
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
            <div key="image">
              <input
                ref={uploadFileReference}
                style={{ display: 'none' }}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {error && <div style={{ color: 'red' }}>{error}</div>}
              <div
                onClick={(): void => uploadFileReference.current?.click()}
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
                    {t('event:create_event.choose_cover')}
                  </Button>
                )}
              </div>
            </div>,
            <TextField
              key="eventName"
              id="field-eventName"
              label={t('event:create_event.event_name')}
              type="text"
              fullWidth
              size="small"
              variant="standard"
              multiline={false}
              error={Boolean(formState.errors.eventName)}
              helperText={formState.errors.eventName?.message}
              {...register('eventName')}
            />,
            <TextField
              key="eventDescription"
              id="field-eventDescription"
              label={t('event:create_event.event_description')}
              type="text"
              fullWidth
              size="medium"
              variant="standard"
              multiline={true}
              error={Boolean(formState.errors.eventDescription)}
              helperText={formState.errors.eventDescription?.message}
              {...register('eventDescription')}
            />,
            <LocalizationProvider key="eventDate" dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{ marginTop: '16px' }}
                defaultValue={today}
                disablePast
                label={t('event:create_event.end_date')}
                onChange={(date): void => setEndDate(dayjs(date))}
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
          {t('event:create_event.action')}
        </Button>
        <Button variant={ButtonVariant.secondary} onClick={handleBackClick}>
          {t('event:create_event.back')}
        </Button>
      </FormWrapper>
      <Snackbar open={snackbarData.open} autoHideDuration={6000}>
        <Alert severity="warning" sx={{ width: '100%' }}>
          {snackbarData.message}
        </Alert>
      </Snackbar>
    </Page>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', [
        'common',
        'group',
        'event',
        'menu',
        'errors',
      ])),
    },
  };
};

export default CreateEvent;
