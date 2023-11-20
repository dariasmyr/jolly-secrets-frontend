import { ReactElement, useState } from 'react';
import { Dialog } from '@components/ui/common/dialog';
import { DialogContentText, TextField } from '@mui/material';
import { ButtonVariant } from 'src/components/ui/common/button';

interface DialogInputEmailProperties {
  isOpen: boolean;
  title: string;
  onCancelClick: () => void;
  onSaveClick: (email: string) => void;
  initialEmail: string | null;
}

export const DialogInputEmail = (
  properties: DialogInputEmailProperties,
): ReactElement => {
  const [inputValue, setInputValue] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true); // Добавляем состояние для отслеживания валидности email

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const value = event.target.value;
    setInputValue(value);

    const isValid = /\S+@\S+\.\S+/.test(value);
    setIsValidEmail(isValid);
  }

  function handleSave(): void {
    if (isValidEmail) {
      properties.onSaveClick(inputValue);
    } else {
      console.error('Неверный формат email');
    }
  }

  return (
    <Dialog
      open={properties.isOpen}
      title={properties.title}
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
            error={!isValidEmail}
            helperText={isValidEmail ? '' : 'Введите корректный email'}
          />
        </div>
      }
      buttons={[
        {
          title: 'Отмена',
          onClick: properties.onCancelClick,
          type: ButtonVariant.outlined,
        },
        {
          title: 'Сохранить',
          onClick: handleSave,
          type: ButtonVariant.outlined,
        },
      ]}
    />
  );
};
