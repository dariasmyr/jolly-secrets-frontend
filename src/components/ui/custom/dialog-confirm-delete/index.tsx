import { ReactElement } from 'react';
import { Dialog } from '@components/ui/common/dialog';
import { DialogContentText } from '@mui/material';
import { ButtonVariant } from 'src/components/ui/common/button';

interface DialogConfirmDeleteProperties {
  isOpen: boolean;
  title: string;
  description: string;
  cancelButtonText: string;
  confirmButtonText: string;
  onCancelClick: () => void;
  onConfirmClick: () => void;
}

export const DialogConfirmDelete = (
  properties: DialogConfirmDeleteProperties,
): ReactElement => {
  const {
    isOpen,
    title,
    description,
    cancelButtonText,
    confirmButtonText,
    onCancelClick,
    onConfirmClick,
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
          title: cancelButtonText,
          onClick: onCancelClick,
          type: ButtonVariant.outlined,
        },
        {
          title: confirmButtonText,
          onClick: onConfirmClick,
          type: ButtonVariant.warning,
        },
      ]}
    />
  );
};
