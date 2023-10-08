import { ReactElement } from 'react';
import { Button, ButtonVariant } from '@components/ui/button';
import {
  Dialog as MUIDialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';

export interface IDialogButtonProperties {
  title: string;
  onClick: () => void;
  type: ButtonVariant;
}

export interface IDialogProperties {
  open: boolean;
  title: string;
  content?: string;
  inputLabel?: string;
  buttons: IDialogButtonProperties[];
}

export const Dialog = (properties: IDialogProperties): ReactElement => {
  return properties.open ? (
    <MUIDialog open={properties.open}>
      <DialogTitle>{properties.title}</DialogTitle>
      <DialogContent>
        {properties.content && (
          <DialogContentText>{properties.content}</DialogContentText>
        )}
        {properties.inputLabel && (
          <TextField
            margin="dense"
            id="name"
            label={properties.inputLabel}
            type="text"
            fullWidth
          />
        )}
      </DialogContent>
      <DialogActions>
        {properties.buttons.map((button) => (
          <Button
            onClick={button.onClick}
            variant={button.type}
            key={button.title}
          >
            {button.title}
          </Button>
        ))}
      </DialogActions>
    </MUIDialog>
  ) : (
    <></>
  );
};
