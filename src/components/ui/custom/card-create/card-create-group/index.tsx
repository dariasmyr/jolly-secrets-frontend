import { ReactElement } from 'react';
import { Card } from '@components/ui/common/card';
import { SelectOptions } from '@components/ui/common/select-options';
import { Wrapper } from '@components/ui/custom/card-create/styled-components';
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
