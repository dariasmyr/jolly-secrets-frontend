import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Button, ButtonVariant } from '@components/ui/common/button';
import { Page } from '@components/ui/common/page';
import { Header } from '@components/ui/common/page/styled-components';
import { FormWrapper } from '@components/ui/common/styled-components';
import { CardGenerateInvite } from '@components/ui/custom/card-generate-invite';
import { DialogConfirmAction } from '@components/ui/custom/dialog-confirm-action';
import { DialogGenerateInvite } from '@components/ui/custom/dialog-generate-invite';
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@mui/material/TextField';
import { CardCreateOrUpdateGroup } from 'src/components/ui/custom/card-create/card-create-or-update-group';
import * as Yup from 'yup';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import {
  GroupType,
  PriceRange,
  useGroupQuery,
  useUpdateGroupMutation,
} from '@/generated/graphql';
import { log } from '@/services/log';
import { useAuthStore } from '@/store/auth.store';

const validationSchema = Yup.object().shape({
  groupName: Yup.string().required('Обязательное поле'),
  groupDescription: Yup.string().required('Обязательное поле'),
});

type FormData = {
  groupName: string;
  groupDescription: string;
};

const UpdateGroup: FC = () => {
  const { t } = useTranslation(['common', 'auth']);
  const locale = localeDetectorService.detect();
  const authStore = useAuthStore();
  const router = useRouter();
  const { data: groupData, loading: groupIsLoading } = useGroupQuery({
    variables: {
      id: Number(router.query.id),
    },
  });
  const [updateGroup, { reset }] = useUpdateGroupMutation();
  const [isPrivate, setIsPrivate] = useState(false);
  const [showGenerateInviteDialog, setShowGenerateInviteDialog] =
    useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });
  // eslint-disable-next-line unicorn/no-null
  const groupId = router.query.id;

  useEffect(() => {
    if (groupData) {
      setIsPrivate(groupData.group.type === GroupType.Private);
    }
  }, [groupData]);
  const handleBackClick = async (): Promise<void> => {
    await router.push(isPrivate ? '/private-groups' : '/public-groups');
  };
  const handleClickOpenDialog = (): void => {
    setShowGenerateInviteDialog(true);
  };

  const handleClickCloseDialog = (): void => {
    setShowGenerateInviteDialog(false);
  };

  const handleAccessLevelChange = (option: {
    value: GroupType | PriceRange;
    label: string;
  }): void => {
    console.log('Is private', option.value === 'PRIVATE');
    setIsPrivate(option.value === 'PRIVATE');
  };

  const handleFormSubmit = async (formData: FormData): Promise<void> => {
    if (Object.keys(formState.errors).length > 0) {
      log.debug('Error', formState.errors);
      return;
    }
    log.debug('Data', formData);
    const updateGroupResponse = await updateGroup({
      variables: {
        id: Number(groupId),
        name: formData.groupName,
        description: formData.groupDescription,
        type: isPrivate ? GroupType.Private : GroupType.Public,
      },
    });
    log.debug('Update group response', updateGroupResponse);
    if (updateGroupResponse.data?.updateGroup) {
      if (isPrivate) {
        await router.push(`/private-groups`);
      }
      reset();
      if (!isPrivate) {
        await router.push(`/public-groups`);
      }
    }
  };

  useEffect(() => {
    if (!authStore.token) {
      router.push('/auth/login');
    }
  }, [authStore]);

  if (groupIsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Page title={t('groups:change:title')} style={{ gap: 16, marginTop: 24 }}>
      <Header>{t('groups:change:title')}</Header>
      <FormWrapper
        onSubmit={handleSubmit(async (formData) => {
          try {
            await handleFormSubmit(formData);
          } catch (submitError) {
            log.error('Update group error', submitError);
          }
        })}
      >
        <CardCreateOrUpdateGroup
          accessLevelTitle={t('create_or_update_group:change:access_level:title')}
          accessLevelOptions={[
            { value: GroupType.Public, label: {t('create_or_update_group:change:access_level:public')} },
            { value: GroupType.Private, label: {t('create_or_update_group:change:access_level:private')} },
          ]}
          defaultOption={
            groupData?.group.type === GroupType.Private
              ? { value: GroupType.Private, label: {t('create_or_update_group:change:access_level:public')} }
              : { value: GroupType.Public, label: {t('create_or_update_group:change:access_level:private')} }
          }
          onAccessLevelChange={handleAccessLevelChange}
        >
          {[
            <TextField
              key="groupName"
              id="field-groupName"
              label="Название группы"
              type="text"
              fullWidth
              size="small"
              multiline={false}
              error={Boolean(formState.errors.groupName)}
              helperText={formState.errors.groupName?.message}
              defaultValue={groupData?.group?.name}
              {...register('groupName')}
            />,
            <TextField
              key="groupDescription"
              id="field-groupDescription"
              label="Описание группы"
              type="text"
              fullWidth
              size="medium"
              multiline={true}
              error={Boolean(formState.errors.groupDescription)}
              helperText={formState.errors.groupDescription?.message}
              defaultValue={groupData?.group?.description}
              {...register('groupDescription')}
            />,
          ]}
        </CardCreateOrUpdateGroup>
        {isPrivate && (
          <CardGenerateInvite
            title={'Участники'}
            description={'Нажми на кнопку чтобы сгенерировать приглашение.'}
            onGenerateInviteClick={handleClickOpenDialog}
            button={'Пригласить'}
          />
        )}
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
          Изменить группу
        </Button>
        <Button variant={ButtonVariant.secondary} onClick={handleBackClick}>
          Назад
        </Button>
      </FormWrapper>
      <DialogGenerateInvite
        isOpen={showGenerateInviteDialog}
        title="Скопируй и отправь другу"
        onCancelClick={handleClickCloseDialog}
        cancelButtonLabel={'Закрыть'}
        linkLabel={'Ссылка на приглашение'}
        clipboardMessage={'Ссылка скопирована'}
        generateButtonLabel={'Сгенерировать'}
        groupId={Number(groupId)}
      />
      <DialogConfirmAction
        isOpen={showConfirmDialog}
        title="Сделать группу приватной?"
        description="Приглашение будет сгенерировано после подтверждения."
        cancelButtonText="Отмена"
        confirmButtonText="ОК"
        onCancelClick={(): void => setShowConfirmDialog(false)}
        onConfirmClick={(): void => {
          setShowConfirmDialog(false);
          setIsPrivate(true);
          setShowGenerateInviteDialog(true);
        }}
      />
    </Page>
  );
};

export default UpdateGroup;
