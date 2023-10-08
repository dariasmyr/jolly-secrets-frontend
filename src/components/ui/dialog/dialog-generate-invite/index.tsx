import { ReactElement, useState } from 'react';
import { ButtonVariant } from '@components/ui/button';
import { Dialog } from '@components/ui/dialog';
import { TextField } from '@mui/material';

export const DialogGenerateInvite = (properties: {
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
      title={'Скопируй и отправь другу'}
      content={
        <div>
          <TextField
            margin="dense"
            id="name"
            label={'Ссылка'}
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
          title: 'Пригласить еще',
          onClick: onConfirm,
          type: ButtonVariant.warning,
        },
      ]}
    />
  );
};
