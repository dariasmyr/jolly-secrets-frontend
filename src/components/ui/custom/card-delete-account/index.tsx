import { ReactElement } from 'react';
import { Card } from '@components/ui/common/card';
import { Description, Wrapper } from '@components/ui/common/styled-components';
import TextField from '@mui/material/TextField';
import { Button, ButtonVariant } from 'src/components/ui/common/button';

export interface ICardDeleteInputProperties {
  description: string;
  placeholder: string;
  onDeleteButtonClick: () => void;
  button: string;
}

export const CardDeleteAccount = (
  properties: ICardDeleteInputProperties,
): ReactElement => {
  return (
    <Card
      content={
        <Wrapper>
          <Description>{properties.description}</Description>
          <TextField
            fullWidth
            variant="standard"
            placeholder={properties.placeholder}
            size="small"
            color="error"
          />
          <Button
            onClick={properties.onDeleteButtonClick}
            variant={ButtonVariant.error}
          >
            {properties.button}
          </Button>
        </Wrapper>
      }
    />
  );
};
