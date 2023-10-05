import { ReactElement } from 'react';
import { Button, ButtonVariant } from '@components/ui/button';
import { Description } from '@components/ui/card-add-button/style';
import { Content, Paper } from '@components/ui/card-name-input/style';
import TextField from '@mui/material/TextField';

export interface ICardDeleteInputProperties {
  description: string;
}

export const CardDeleteInput = (
  properties: ICardDeleteInputProperties,
): ReactElement => {
  const handleClick = (): void => {
    // eslint-disable-next-line no-alert
    alert('click');
  };
  return (
    <Paper>
      <Content>
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
      </Content>
    </Paper>
  );
};
