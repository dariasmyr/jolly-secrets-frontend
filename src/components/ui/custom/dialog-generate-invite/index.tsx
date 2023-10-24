import { ReactElement, useState } from 'react';
import { Dialog } from '@components/ui/common/dialog';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { ButtonVariant } from 'src/components/ui/common/button';

interface DialogGenerateInviteProperties {
  isOpen: boolean;
  title: string;
  onCancelClick: () => void;
  linkLabel: string;
  clipboardMessage: string;
  cancelButtonLabel: string;
  generateButtonLabel: string;
}

export const DialogGenerateInvite = (
  properties: DialogGenerateInviteProperties,
): ReactElement => {
  const [inputValue, setInputValue] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  async function onCopy(inviteLink: string): Promise<void> {
    await navigator.clipboard.writeText(inviteLink);
    setSnackbarOpen(true);
  }

  async function handleClick(): Promise<void> {
    const codeLength = 10;
    const randomString = generateRandomString(codeLength);
    const inviteLink = `${process.env.NEXT_PUBLIC_SELF_URL}invite?code=${randomString}`;
    setInputValue(inviteLink);
  }

  function handleCloseSnackbar(): void {
    setSnackbarOpen(false);
  }

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

  return (
    <Dialog
      open={properties.isOpen}
      title={properties.title}
      content={
        <div>
          <TextField
            margin="dense"
            id="name"
            label={properties.linkLabel}
            type="text"
            fullWidth
            value={inputValue}
            onChange={(): void => {}}
            multiline
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={(): Promise<void> => onCopy(inputValue)}
                    color="primary"
                  >
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
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity="info"
              sx={{ width: '100%' }}
            >
              {properties.clipboardMessage}
            </Alert>
          </Snackbar>
        </div>
      }
      buttons={[
        {
          title: properties.cancelButtonLabel,
          onClick: properties.onCancelClick,
          type: ButtonVariant.outlined,
        },
        {
          title: properties.generateButtonLabel,
          onClick: handleClick,
          type: ButtonVariant.primary,
        },
      ]}
    />
  );
};
