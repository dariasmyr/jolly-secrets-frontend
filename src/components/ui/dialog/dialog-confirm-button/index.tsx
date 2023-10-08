import { ReactElement } from 'react';
import { ButtonVariant } from '@components/ui/button';
import { Dialog } from '@components/ui/dialog';
function onCancel(): void {
  // eslint-disable-next-line no-alert
  alert('Cancel');
}

function onConfirm(): void {
  // eslint-disable-next-line no-alert
  alert('Confirm');
}
export const DialogConfirmEmail = (properties: {
  isOpen: boolean;
}): ReactElement => {
  return (
    <Dialog
      open={properties.isOpen}
      title={'Вы уверены?'}
      content={'После удаления аккаунт нельзя будет восстановить.'}
      buttons={[
        {
          title: 'Отмена',
          onClick: onCancel,
          type: ButtonVariant.outlined,
        },
        {
          title: 'Да, удалить аккаунт',
          onClick: onConfirm,
          type: ButtonVariant.warning,
        },
      ]}
    />
  );
};
