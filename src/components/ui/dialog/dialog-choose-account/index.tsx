import { ReactElement } from 'react';
import { ButtonVariant } from '@components/ui/button';
import { Dialog } from '@components/ui/dialog';
import { DialogContentText } from '@mui/material';
export const DialogChooseAccount = (properties: {
  isOpen: boolean;
}): ReactElement => {
  function onChoice(choice: string): void {
    // eslint-disable-next-line no-alert
    alert(choice);
  }

  return (
    <Dialog
      open={properties.isOpen}
      title={'Выберите аккаунт, который хотите оставить'}
      content={
        <div>
          <DialogContentText>
            У вас уже есть аккаунт, привязанный к Telegram/Google профилю.
            Выберите аккаунт, который хотите оставить, и мы привяжен к нему ваш
            Telegram/Google профиль.
          </DialogContentText>
        </div>
      }
      buttons={[
        {
          title: 'Аккаунт telegram',
          onClick: () => onChoice('Аккаунт telegram'),
          type: ButtonVariant.primary,
        },
        {
          title: 'Аккаунт google',
          onClick: () => onChoice('Аккаунт google'),
          type: ButtonVariant.primary,
        },
        {
          title: 'Отмена',
          onClick: () => onChoice,
          type: ButtonVariant.borderless,
        },
      ]}
    />
  );
};
