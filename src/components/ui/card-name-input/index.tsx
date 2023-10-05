import { ReactElement } from 'react';
import { Button, ButtonVariant } from '@components/ui/button';
import { Content, Paper } from '@components/ui/card-name-input/style';
import TextField from '@mui/material/TextField';

export const CardNameInput = (): ReactElement => {
  const handleClick = (): void => {
    // eslint-disable-next-line no-alert
    alert('click');
  };
  return (
    <Paper>
      <Content>
        <TextField
          fullWidth
          label="Имя пользователя"
          defaultValue="John"
          size="small"
          color="primary"
        />
        <Button onClick={handleClick} variant={ButtonVariant.primary}>
          Сохранить
        </Button>
      </Content>
    </Paper>
  );
};
