import { ReactElement, useEffect, useState } from 'react';
import { Dialog } from '@components/ui/common/dialog';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { ButtonVariant } from 'src/components/ui/common/button';

import { useCreateGroupInviteMutation } from '@/generated/graphql';

interface DialogGenerateInviteProperties {
  isOpen: boolean;
  title: string;
  onCancelClick: () => void;
  linkLabel: string;
  clipboardMessage: string;
  cancelButtonLabel: string;
  generateButtonLabel: string;
  groupId: number;
}

export const DialogGenerateInvite = (
  properties: DialogGenerateInviteProperties,
): ReactElement => {
  const [inputValue, setInputValue] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [createGroupInvite] = useCreateGroupInviteMutation();

  async function onCopy(inviteLink: string): Promise<void> {
    await navigator.clipboard.writeText(inviteLink);
    setSnackbarOpen(true);
  }

  useEffect(() => {
    if (properties.isOpen) {
      handleClick();
    }
  }, [properties.isOpen]);

  async function handleClick(): Promise<void> {
    const code = await createGroupInvite({
      variables: {
        groupId: properties.groupId,
      },
    });
    const inviteLink = `${process.env.NEXT_PUBLIC_SELF_URL_BASE}/invite?code=${code.data?.createGroupInvite.code}`;
    setInputValue(inviteLink);
  }

  function handleCloseSnackbar(): void {
    setSnackbarOpen(false);
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
          type: ButtonVariant.outlined,
        },
      ]}
    />
  );
};
