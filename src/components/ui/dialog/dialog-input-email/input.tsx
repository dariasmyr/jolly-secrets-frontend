import { ReactElement, useState } from 'react';
import { ButtonVariant } from '@components/ui/button';
import { Dialog } from '@components/ui/dialog';
import { DialogContentText, TextField } from '@mui/material';

export const DialogInputEmail = (properties: {
  isOpen: boolean;
}): ReactElement => {
  const [inputValue, setInputValue] = useState('');
  function onCancel(): void {
    // eslint-disable-next-line no-alert
    alert('Cancel');
  }

  function onConfirm(): void {
    // eslint-disable-next-line no-alert
    alert(inputValue);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setInputValue(event.target.value);
  }

  return (
    <Dialog
      open={properties.isOpen}
      title={'Укажите почту'}
      content={
        <div>
          <DialogContentText>
            По этому адресу мы будем уведомлять вас о статусе заявок.
          </DialogContentText>
          <TextField
            margin="dense"
            id="name"
            label={'Ваша почта'}
            type="text"
            fullWidth
            value={inputValue}
            onChange={handleChange}
          />
        </div>
      }
      buttons={[
        {
          title: 'Отмена',
          onClick: onCancel,
          type: ButtonVariant.outlined,
        },
        {
          title: 'Сохранить',
          onClick: onConfirm,
          type: ButtonVariant.outlined,
        },
      ]}
    />
  );
};
