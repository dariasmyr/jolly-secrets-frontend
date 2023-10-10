import { ReactElement } from 'react';
import { Button, ButtonVariant } from '@components/ui/button';
import { Card } from '@components/ui/card';
import { Description } from '@components/ui/card/style';
import { Wrapper } from '@components/ui/card-delete-account/style';
import TextField from '@mui/material/TextField';

export interface ICardDeleteInputProperties {
  description: string;
}

export const CardDeleteAccount = (
  properties: ICardDeleteInputProperties,
): ReactElement => {
  const handleClick = (): void => {
    // eslint-disable-next-line no-alert
    alert('click');
  };
  return (
    <Card
      content={
        <Wrapper>
          <Description>{properties.description}</Description>
          <TextField
            fullWidth
            defaultValue="Удалить аккаунт"
            size="small"
            color="error"
          />
          <Button onClick={handleClick} variant={ButtonVariant.warning}>
            Удалить
          </Button>
        </Wrapper>
      }
    />
  );
};
