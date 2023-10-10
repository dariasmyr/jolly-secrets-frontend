import { ReactElement } from 'react';
import { Button, ButtonVariant } from '@components/ui/button';
import { Card } from '@components/ui/card';
import { Wrapper } from '@components/ui/card/style';
import { ButtonWrapper } from '@components/ui/card-create-preference/style';
import { SelectOptions } from '@components/ui/select-options';
import { TextField } from '@mui/material';

export const CardCreatePreference = (): ReactElement => {
  const handleClick = (): void => {
    // eslint-disable-next-line no-alert
    alert('click');
  };

  return (
    <Card
      content={
        <Wrapper>
          <SelectOptions
            title="Ограничение по цене"
            options={[
              'Без ограничений',
              '1-10 USD',
              '10-100 USD',
              '100-1000 USD',
            ]}
            onChange={(option): void => {
              // eslint-disable-next-line no-alert
              alert(option);
            }}
          />
          <TextField
            id="dislike"
            label={'Я НЕ хочу чтобы мне дарили'}
            type="text"
            fullWidth
            size="small"
            color={'error'}
          />
          <TextField
            id="like"
            label={'Я хочу чтобы мне дарили'}
            type="text"
            fullWidth
          />
          <TextField
            id="comment"
            label={'Комментарий для партнера'}
            type="text"
            fullWidth
            multiline
          />
          <ButtonWrapper>
            <Button onClick={handleClick} variant={ButtonVariant.warning}>
              Удалить
            </Button>
          </ButtonWrapper>
        </Wrapper>
      }
    />
  );
};
