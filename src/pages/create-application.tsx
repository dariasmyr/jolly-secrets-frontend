import { FC, useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Button, ButtonVariant } from '@components/ui/common/button';
import { Page } from '@components/ui/common/page';
import { FormWrapper } from '@components/ui/common/styled-components';
import { CardCreatePreference } from '@components/ui/custom/card-create/card-create-preference';
import { DialogConfirmAction } from '@components/ui/custom/dialog-confirm-action';
import { yupResolver } from '@hookform/resolvers/yup';
import { CircularProgress } from '@mui/material';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import * as Yup from 'yup';

import { Header } from '@/components/ui/common/page/styled-components';
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

export const PriceRangeDisplay = [
  { value: PriceRange.NoMatter, label: 'Без ограничений' },
  { value: PriceRange.Min_0Max_10, label: '0-10$' },
  { value: PriceRange.Min_10Max_20, label: '10-20$' },
  { value: PriceRange.Min_20Max_30, label: '20-30$' },
];

const CreateApplication: FC = () => {
  const router = useRouter();
  const authStore = useAuthStore();
  // eslint-disable-next-line unicorn/no-null
  const [createEventApplication, { reset, loading }] =
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
      {loading && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <CircularProgress color="inherit" size={60} />
        </div>
      )}
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
            priceOptions={PriceRangeDisplay}
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
                variant="standard"
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
                variant="standard"
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
                variant="standard"
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
          Создать заявку
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
              handleConfirmDialogClose();
              await handleFormSubmit(formData);
              router.push(`/event?id=${eventId}`);
            } catch (submitError) {
              log.error('Create application error', submitError);
            }
          })()
        }
      />
    </Page>
  );
};

const AddButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
`;

export default CreateApplication;
