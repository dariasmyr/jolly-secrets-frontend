import { ReactElement } from 'react';
import { Card } from '@components/ui/card';
import { Wrapper } from '@components/ui/card/style';
import { SelectOptions } from '@components/ui/select-options';
import { TextField } from '@mui/material';

export const CardCreateGroup = (): ReactElement => {
  return (
    <Card
      content={
        <Wrapper>
          <TextField
            id="group_name"
            label={'Название группы'}
            type="text"
            fullWidth
            size="small"
          />
          <TextField
            id="description"
            label={'Описание группы'}
            type="text"
            fullWidth
            multiline
          />
          <SelectOptions
            title="Уровень доступа"
            options={['Публичная', 'Приватная']}
            onChange={(option): void => {
              // eslint-disable-next-line no-alert
              alert(option);
            }}
          />
        </Wrapper>
      }
    />
  );
};
