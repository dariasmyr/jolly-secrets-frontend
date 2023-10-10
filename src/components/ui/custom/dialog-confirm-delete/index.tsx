import { ReactElement } from 'react';
import { Dialog } from '@components/ui/common/dialog';
import { DialogContentText } from '@mui/material';
import { ButtonVariant } from 'src/components/ui/common/button';

export const DialogConfirmDelete = (properties: {
  isOpen: boolean;
}): ReactElement => {
  function onCancel(): void {
    // eslint-disable-next-line no-alert
    alert('Cancel');
  }

  function onDelete(): void {
    // eslint-disable-next-line no-alert
    alert('Delete');
  }

  return (
    <Dialog
      open={properties.isOpen}
      title={'Вы уверены?'}
      content={
        <div>
          <DialogContentText>
            После удаления аккаунт нельзя будет восстановить.
          </DialogContentText>
        </div>
      }
      buttons={[
        {
          title: 'Отмена',
          onClick: onCancel,
          type: ButtonVariant.outlined,
        },
        {
          title: 'Да, удалить аккаунт',
          onClick: onDelete,
          type: ButtonVariant.warning,
        },
      ]}
    />
  );
};
