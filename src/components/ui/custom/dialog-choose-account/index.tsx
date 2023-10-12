import { ReactElement } from 'react';
import { Dialog } from '@components/ui/common/dialog';
import { DialogContentText } from '@mui/material';
import { ButtonVariant } from 'src/components/ui/common/button';

interface DialogChooseAccountProperties {
  isOpen: boolean;
  title: string;
  description: string;
  telegramButtonText: string;
  googleButtonText: string;
  cancelButtonText: string;
  onTelegramClick: () => void;
  onGoogleClick: () => void;
  onCancelClick: () => void;
}

export const DialogChooseAccount = (
  properties: DialogChooseAccountProperties,
): ReactElement => {
  const {
    isOpen,
    title,
    description,
    telegramButtonText,
    googleButtonText,
    cancelButtonText,
    onTelegramClick,
    onGoogleClick,
    onCancelClick,
  } = properties;

  return (
    <Dialog
      open={isOpen}
      title={title}
      content={
        <div>
          <DialogContentText>{description}</DialogContentText>
        </div>
      }
      buttons={[
        {
          title: telegramButtonText,
          onClick: onTelegramClick,
          type: ButtonVariant.primary,
        },
        {
          title: googleButtonText,
          onClick: onGoogleClick,
          type: ButtonVariant.primary,
        },
        {
          title: cancelButtonText,
          onClick: onCancelClick,
          type: ButtonVariant.borderless,
        },
      ]}
    />
  );
};
