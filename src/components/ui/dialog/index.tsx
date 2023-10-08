import { ReactElement } from 'react';
import { Button, ButtonVariant } from '@components/ui/button';
import {
  Dialog as MUIDialog,
  DialogActions as OrigDialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import styled from 'styled-components';

export interface IDialogButtonProperties {
  title: string;
  onClick: () => void;
  type: ButtonVariant;
}

export interface IDialogProperties {
  open: boolean;
  title: string;
  content: ReactElement;
  inputLabel?: string;
  buttons: IDialogButtonProperties[];
}

const DialogActions = styled(OrigDialogActions)<{ buttonCount: number }>`
  display: flex;
  flex-direction: ${(properties): string =>
    // eslint-disable-next-line no-magic-numbers
    properties.buttonCount >= 3 ? 'column' : 'row'};
  gap: 16px;
`;

export const Dialog = (properties: IDialogProperties): ReactElement => {
  return properties.open ? (
    <MUIDialog open={properties.open}>
      <DialogTitle>{properties.title}</DialogTitle>
      <DialogContent>{properties.content}</DialogContent>
      <DialogActions buttonCount={properties.buttons.length}>
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
