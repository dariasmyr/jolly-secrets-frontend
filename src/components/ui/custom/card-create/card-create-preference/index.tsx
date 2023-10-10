import { ReactElement } from 'react';
import { Card } from '@components/ui/common/card';
import { SelectOptions } from '@components/ui/common/select-options';
import {
  ButtonWrapper,
  Wrapper,
} from '@components/ui/custom/card-create/styled-components';
import { TextField } from '@mui/material';
import { Button, ButtonVariant } from 'src/components/ui/common/button';

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
