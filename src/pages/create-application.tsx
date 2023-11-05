import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { router } from 'next/client';
import { Button, ButtonVariant } from '@components/ui/common/button';
import { Page } from '@components/ui/common/page';
import { CardCreatePreference } from '@components/ui/custom/card-create/card-create-preference';
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import * as Yup from 'yup';

import {
  PriceRange,
  useCreateEventApplicationMutation,
  useEventQuery,
} from '@/generated/graphql';
import { log } from '@/services/log';
import { useAuthStore } from '@/store/auth.store';
const validationSchema = Yup.object().shape({
  likes: Yup.string().required('Обязательное поле'),
  dislikes: Yup.string().required('Обязательное поле'),
});

type FormData = {
  likes: string;
  dislikes: string;
};

const CreateApplication: FC = () => {
  const authStore = useAuthStore();
  // eslint-disable-next-line unicorn/no-null
  const [createEventApplication, { reset }] =
    useCreateEventApplicationMutation();
  const eventId = router.query.eventId;
  const { data: eventData, loading: eventIsLoading } = useEventQuery({
    variables: {
      id: Number(eventId),
    },
  });

  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  const handleBackClick = async (): Promise<void> => {
    await router.push(`/events?id=${eventId}`);
  };

  const handleFormSubmit = async (formData: FormData): Promise<void> => {
    if (Object.keys(formState.errors).length > 0) {
      log.debug('Error', formState.errors);
      return;
    }
    log.debug('Data', formData);
    const createEventApplicationResponse = await createEventApplication({
      variables: {
        accountId: Number(authStore.account?.id),
        eventId: Number(eventId),
        preferences: [
          {
            applicationId: 0,
            likes: formData.likes,
            dislikes: formData.dislikes,
            comment: '',
            priceRange: PriceRange.NoMatter,
          },
        ],
      },
    });
    log.debug(
      'Create event application response',
      createEventApplicationResponse,
    );
    if (createEventApplicationResponse.data?.createEventApplication) {
      reset();
      await router.push(`/events?id=${eventId}`);
    }
  };

  useEffect(() => {
    if (!authStore.token) {
      router.push('/auth/login');
    }
  }, [authStore]);

  if (eventIsLoading) {
    return <Page title="Событие">Loading...</Page>;
  }

  return (
    <Page title={eventData!.event.name} style={{ gap: 16, marginTop: 24 }}>
      <Header>{eventData?.event.name}</Header>
      <FormWrapper
        onSubmit={handleSubmit(async (formData) => {
          try {
            await handleFormSubmit(formData);
          } catch (submitError) {
            log.error('Create event application error', submitError);
          }
        })}
      >
        <CardCreatePreference
          selectTitle="Ограничение по цене"
          priceOptions={[
            PriceRange.NoMatter,
            PriceRange.Min_0Max_10,
            PriceRange.Min_10Max_20,
            PriceRange.Min_20Max_30,
          ]}
          onPriceOptionChange={(option: string): void => {
            log.debug('Option', option);
          }}
          button={'Удалить'}
          onDeleteButtonClick={(): void => {
            log.debug('Delete button clicked');
          }}
        >
          {[
            <TextField
              key="dislikes"
              id="field-dislikes"
              label="Я не хочу чтобы мне дарили"
              type="text"
              fullWidth
              size="small"
              multiline={false}
              error={true}
              helperText={formState.errors.dislikes?.message}
              {...register('dislikes')}
            />,
            <TextField
              key="likes"
              id="field-likes"
              label="Я хочу чтобы мне дарили"
              type="text"
              fullWidth
              size="medium"
              multiline={true}
              error={Boolean(formState.errors.likes)}
              helperText={formState.errors.likes?.message}
              {...register('likes')}
            />,
          ]}
        </CardCreatePreference>
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

export default CreateApplication;
