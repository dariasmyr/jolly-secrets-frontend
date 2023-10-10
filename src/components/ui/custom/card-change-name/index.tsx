import { ReactElement } from 'react';
import { Card } from '@components/ui/common/card';
import { Wrapper } from '@components/ui/common/styled-components';
import TextField from '@mui/material/TextField';
import { Button, ButtonVariant } from 'src/components/ui/common/button';

export const CardChangeName = (): ReactElement => {
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
            placeholder="Имя"
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
