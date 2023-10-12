import { ReactElement, useState } from 'react';
import { Dialog } from '@components/ui/common/dialog';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import { ButtonVariant } from 'src/components/ui/common/button';

// Функция для генерации случайной строки
function generateRandomString(length: number): string {
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let index = 0; index < length; index++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result += charset.charAt(randomIndex);
  }
  return result;
}

export const DialogGenerateInvite = (properties: {
  isOpen: boolean;
}): ReactElement => {
  const [inputValue, setInputValue] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  function onCancel(): void {
    // eslint-disable-next-line no-alert
    alert('Cancel');
  }

  function onGenerate(): void {
    const codeLength = 10;
    const randomString = generateRandomString(codeLength);
    setInputValue(randomString);
  }

  function onCopy(): void {
    setSnackbarOpen(true);
  }

  function handleCloseSnackbar(): void {
    setSnackbarOpen(false);
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
            onChange={(): void => {}}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={onCopy} color="primary">
                    <FileCopyIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            message="Скопировано в буфер обмена"
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
          title: 'Сгенерировать',
          onClick: onGenerate,
          type: ButtonVariant.primary,
        },
      ]}
    />
  );
};
