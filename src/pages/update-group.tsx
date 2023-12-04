import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
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

import {
  GroupType,
  PriceRange,
  useGroupQuery,
  useUpdateGroupMutation,
} from '@/generated/graphql';
import { log } from '@/services/log';
import { useAuthStore } from '@/store/auth.store';

const validationSchema = Yup.object().shape({
  groupName: Yup.string().required('Required field'),
  groupDescription: Yup.string().required('Required field'),
});

type FormData = {
  groupName: string;
  groupDescription: string;
};

const UpdateGroup: FC = () => {
  const { t } = useTranslation(['common', 'group', 'menu']);
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
        await router.push(`/`);
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
    <Page
      title={t('group:group.change.title')}
      style={{ gap: 16, marginTop: 24 }}
    >
      <Header>{t('group:group.change.title')}</Header>
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
          accessLevelTitle={t(
            'group:create_or_update_group.access_level.title',
          )}
          accessLevelOptions={[
            {
              value: GroupType.Public,
              label: t('group:create_or_update_group.access_level.public'),
            },
            {
              value: GroupType.Private,
              label: t('group:create_or_update_group.access_level.private'),
            },
          ]}
          defaultOption={
            groupData?.group.type === GroupType.Private
              ? {
                  value: GroupType.Private,
                  label: t(
                    'group:create_or_update_group.change.access_level.public',
                  ),
                }
              : {
                  value: GroupType.Public,
                  label: t(
                    'group:create_or_update_group.change.access_level.private',
                  ),
                }
          }
          onAccessLevelChange={handleAccessLevelChange}
        >
          {[
            <TextField
              key="groupName"
              id="field-groupName"
              label={t('group:create_or_update_group.group_name')}
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
              label={t('group:create_or_update_group.group_description')}
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
            title={t('group:create_or_update_group.invite.title')}
            description={t('group:create_or_update_group.invite.description')}
            onGenerateInviteClick={handleClickOpenDialog}
            button={t('group:create_or_update_group.invite.action')}
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
          {t('group:create_or_update_group.update_action')}
        </Button>
        <Button variant={ButtonVariant.secondary} onClick={handleBackClick}>
          {t('group:create_or_update_group.back')}
        </Button>
      </FormWrapper>
      <DialogGenerateInvite
        isOpen={showGenerateInviteDialog}
        title={t('group:create_or_update_group.invite.dialog.title')}
        onCancelClick={handleClickCloseDialog}
        cancelButtonLabel={t(
          'group:create_or_update_group.invite.dialog.cancel',
        )}
        linkLabel={t('group:create_or_update_group.invite.dialog.label')}
        clipboardMessage={t(
          'group:create_or_update_group.invite.dialog.success',
        )}
        generateButtonLabel={t(
          'group:create_or_update_group.invite.dialog.generate',
        )}
        groupId={Number(groupId)}
      />
      <DialogConfirmAction
        isOpen={showConfirmDialog}
        title={t('group:create_or_update_group.confirm_dialog.title')}
        description={t(
          'group:create_or_update_group.confirm_dialog.description',
        )}
        cancelButtonText={t(
          'group:create_or_update_group.confirm_dialog.cancel',
        )}
        confirmButtonText={t(
          'group:create_or_update_group.confirm_dialog.confirm',
        )}
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

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', [
        'group',
        'common',
        'menu',
      ])),
    },
  };
};

export default UpdateGroup;
