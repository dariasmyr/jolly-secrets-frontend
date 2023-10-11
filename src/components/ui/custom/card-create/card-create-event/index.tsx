import { ReactElement } from 'react';
import { Card } from '@components/ui/common/card';
import { Wrapper } from '@components/ui/custom/card-create/styled-components';
import { TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

interface IDateRangeProperties {
  start: string;
  end: string;
}

interface ITextFieldProperties {
  label: string;
  isMultiline: boolean; // Добавляем свойство для определения многострочного поля
}

interface ICardCreateEventProperties {
  textFields: ITextFieldProperties[];
  dateRange: IDateRangeProperties;
}

export const CardCreateEvent = (
  properties: ICardCreateEventProperties,
): ReactElement => {
  return (
    <Card
      content={
        <Wrapper>
          {properties.textFields.map((textField, index) => (
            <div key={index}>
              <TextField
                id={`event-${index}`}
                label={textField.label}
                type="text"
                fullWidth
                size={textField.isMultiline ? 'medium' : 'small'}
                multiline={textField.isMultiline}
              />
            </div>
          ))}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateRangePicker
              localeText={{
                start: properties.dateRange.start,
                end: properties.dateRange.end,
              }}
            />
          </LocalizationProvider>
        </Wrapper>
      }
    />
  );
};
