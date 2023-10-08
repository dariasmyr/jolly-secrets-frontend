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
export const DialogGenerateInvite = (properties: {
  isOpen: boolean;
}): ReactElement => {
  return (
    <Dialog
      open={properties.isOpen}
      title={'Скопируй и отправь другу'}
      inputLabel={'Ссылка'}
      buttons={[
        {
          title: 'Отмена',
          onClick: onCancel,
          type: ButtonVariant.outlined,
        },
        {
          title: 'Пригласить еще',
          onClick: onConfirm,
          type: ButtonVariant.warning,
        },
      ]}
    />
  );
};
