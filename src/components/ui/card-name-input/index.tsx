import { ReactElement } from 'react';
import { Button, ButtonVariant } from '@components/ui/button';
import { Card } from '@components/ui/card';
import { Wrapper } from '@components/ui/card/style';
import TextField from '@mui/material/TextField';

export const CardNameInput = (): ReactElement => {
  const handleClick = (): void => {
    // eslint-disable-next-line no-alert
    alert('click');
  };
  return (
    <Card
      content={
        <Wrapper>
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
        </Wrapper>
      }
    />
  );
};
