import { ReactElement } from 'react';
import { Card } from '@components/ui/common/card';
import { Wrapper } from '@components/ui/custom/card-create/styled-components';
import { TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

export const CardCreateEvent = (): ReactElement => {
  return (
    <Card
      content={
        <Wrapper>
          <TextField
            id="event-name"
            label={'Название события'}
            type="text"
            fullWidth
            size="small"
          />
          <TextField
            id="event-description"
            label={'Описание события'}
            type="text"
            fullWidth
            multiline
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateRangePicker
              localeText={{ start: 'Check-in', end: 'Check-out' }}
            />
          </LocalizationProvider>
        </Wrapper>
      }
    />
  );
};
