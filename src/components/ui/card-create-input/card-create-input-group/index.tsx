import { ReactElement } from 'react';
import { CardCreateInput } from '@components/ui/card-create-input';
import { InputWrapper } from '@components/ui/card-create-input/card-create-input-group/style';
import { SelectOptions } from '@components/ui/select-options';
import { TextField } from '@mui/material';

export const CardCreateInputGroup = (): ReactElement => {
  return (
    <CardCreateInput
      content={
        <InputWrapper>
          <TextField
            margin="dense"
            id="group_name"
            label={'Название группы'}
            type="text"
            fullWidth
            value={''}
            size="small"
          />
          <TextField
            margin="dense"
            id="description"
            label={'Описание группы'}
            type="text"
            fullWidth
            value={''}
            size="medium"
          />
          <SelectOptions
            title="Уровень доступа"
            options={[
              {
                title: 'Публичная',
                onClick: (): void => {
                  // eslint-disable-next-line no-alert
                  alert('Публичная');
                },
              },
              {
                title: 'Приватная',
                onClick: (): void => {
                  // eslint-disable-next-line no-alert
                  alert('Приватная');
                },
              },
            ]}
          />
        </InputWrapper>
      }
    />
  );
};
