import { FC, useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Button, ButtonVariant } from '@components/ui/common/button';
import { Page } from '@components/ui/common/page';
import { CardCreatePreference } from '@components/ui/custom/card-create/card-create-preference';
import { DialogConfirmAction } from '@components/ui/custom/dialog-confirm-action';
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

type FormData = {
  preferences: {
    likes: string;
    dislikes: string;
    comment?: string | null;
    priceRange: PriceRange;
  }[];
};

const validationSchema = Yup.object().shape({
  preferences: Yup.array()
    .of(
      Yup.object().shape({
        // eslint-disable-next-line sonarjs/no-duplicate-string
        likes: Yup.string().required('Обязательное поле'),
        dislikes: Yup.string().required('Обязательное поле'),
        comment: Yup.string().nullable(),
        priceRange: Yup.mixed<PriceRange>()
          .oneOf(Object.values(PriceRange))
          .default(PriceRange.NoMatter),
      }),
    )
    .required('Обязательное поле'),
});

const PriceRangeDisplay = {
  [PriceRange.NoMatter]: 'Без ограничений',
  [PriceRange.Min_0Max_10]: '0-10$',
  [PriceRange.Min_10Max_20]: '10-20$',
  [PriceRange.Min_20Max_30]: '20-30$',
};

const CreateApplication: FC = () => {
  const router = useRouter();
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
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const { register, handleSubmit, formState, control, trigger } =
    useForm<FormData>({
      defaultValues: {
        preferences: [
          {
            likes: '',
            dislikes: '',
            comment: '',
            priceRange: PriceRange.NoMatter,
          },
        ],
      },
      resolver: yupResolver(validationSchema),
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'preferences',
  });

  const handleBackClick = async (): Promise<void> => {
    await router.push(`/event?id=${eventId}`);
  };

  const handleConfirmDialogOpen = async (): Promise<void> => {
    if (await trigger()) {
      setOpenConfirmDialog(true);
    } else {
      console.log('Form is invalid, please correct errors');
    }
  };

  const handleConfirmDialogClose = (): void => {
    setOpenConfirmDialog(false);
  };

  const handleFormSubmit = async (formData: FormData): Promise<void> => {
    log.debug('Data', formData);

    const preferences = formData.preferences.map((pref) => ({
      likes: pref.likes,
      dislikes: pref.dislikes,
      comment: pref.comment?.trim() || '',
      priceRange: pref.priceRange,
    }));

    const createEventApplicationResponse = await createEventApplication({
      variables: {
        accountId: Number(authStore.account?.id),
        eventId: Number(eventId),
        preferences: preferences,
      },
    });

    log.debug(
      'Create event application response',
      createEventApplicationResponse,
    );

    if (createEventApplicationResponse.data?.createEventApplication) {
      reset();
      await router.push(`/event?id=${eventId}`);
    }
  };

  useEffect(() => {
    if (!authStore.token) {
      router.push('/auth/login');
    }
  }, [authStore]);

  if (eventIsLoading) {
    return <Page title="Заявка">Loading...</Page>;
  }

  return (
    <Page title={eventData!.event.name} style={{ gap: 16, marginTop: 24 }}>
      <Header>Я хочу</Header>
      <FormWrapper
        onSubmit={handleSubmit(async (formData) => {
          try {
            await handleFormSubmit(formData);
          } catch (submitError) {
            log.error('Create event application error', submitError);
          }
        })}
      >
        {fields.map((item, index) => (
          <CardCreatePreference
            key={item.id}
            selectTitle="Ограничение по цене"
            priceOptions={[
              PriceRangeDisplay[PriceRange.NoMatter],
              PriceRangeDisplay[PriceRange.Min_0Max_10],
              PriceRangeDisplay[PriceRange.Min_10Max_20],
              PriceRangeDisplay[PriceRange.Min_20Max_30],
            ]}
            {...register(`preferences.${index}.priceRange`)}
            button={'Удалить'}
            onDeleteButtonClick={(): void => {
              remove(index);
            }}
          >
            {[
              <TextField
                key="dislikes"
                id={`field-dislikes${index}`}
                label="Я НЕ хочу чтобы мне дарили"
                type="text"
                fullWidth
                size="small"
                multiline={false}
                /* eslint-disable-next-line security/detect-object-injection */
                error={Boolean(formState.errors.preferences?.[index]?.dislikes)}
                helperText={
                  // eslint-disable-next-line security/detect-object-injection
                  formState.errors.preferences?.[index]?.dislikes?.message
                }
                {...register(`preferences.${index}.dislikes`)}
              />,
              <TextField
                key="likes"
                id={`field-likes${index}`}
                label="Я хочу чтобы мне дарили"
                type="text"
                fullWidth
                size="medium"
                multiline={true}
                /* eslint-disable-next-line security/detect-object-injection */
                error={Boolean(formState.errors.preferences?.[index]?.likes)}
                helperText={
                  // eslint-disable-next-line security/detect-object-injection
                  formState.errors.preferences?.[index]?.likes?.message
                }
                {...register(`preferences.${index}.likes`)}
              />,
              <TextField
                key="comment"
                id={`field-comment${index}`}
                label="Комментарий"
                type="text"
                fullWidth
                size="medium"
                multiline={true}
                /* eslint-disable-next-line security/detect-object-injection */
                error={Boolean(formState.errors.preferences?.[index]?.comment)}
                helperText={
                  // eslint-disable-next-line security/detect-object-injection
                  formState.errors.preferences?.[index]?.comment?.message
                }
                {...register(`preferences.${index}.comment`)}
              />,
            ]}
          </CardCreatePreference>
        ))}
        <AddButtonWrapper>
          <Button
            variant={ButtonVariant.borderless}
            onClick={(): void =>
              append({
                likes: '',
                dislikes: '',
                comment: '',
                priceRange: PriceRange.NoMatter,
              })
            }
          >
            + Добавить
          </Button>
        </AddButtonWrapper>
        <Button
          variant={ButtonVariant.primary}
          onClick={handleConfirmDialogOpen}
        >
          Создать событие
        </Button>
        <Button variant={ButtonVariant.secondary} onClick={handleBackClick}>
          Назад
        </Button>
      </FormWrapper>
      <DialogConfirmAction
        isOpen={openConfirmDialog}
        title="Вы уверены?"
        description="После подтверждения заявку нельзя будет изменить"
        cancelButtonText="Отмена"
        confirmButtonText="Да, создать заявку"
        onCancelClick={handleConfirmDialogClose}
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        onConfirmClick={(): any =>
          handleSubmit(async (formData) => {
            try {
              handleConfirmDialogClose(); // Важно сначала закрыть диалог
              await handleFormSubmit(formData);
            } catch (submitError) {
              log.error('Create application error', submitError);
            }
          })()
        }
      />
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

const AddButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
`;

export default CreateApplication;
