import { ReactElement } from 'react';
import { Card } from '@components/ui/common/card';
import { SelectOptions } from '@components/ui/common/select-options';
import { Wrapper } from '@components/ui/custom/card-create/styled-components';
import { TextField } from '@mui/material';

interface ITextFieldProperties {
  label: string;
  multiline: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  isError?: boolean;
}

interface ICardCreateFieldsProperties {
  textFields: ITextFieldProperties[];
  accessLevelTitle: string;
  accessLevelOptions: string[];
  onAccessLevelChange: (option: string) => void;
}

export const CardCreateGroup = (
  properties: ICardCreateFieldsProperties,
): ReactElement => {
  return (
    <Card
      content={
        <Wrapper>
          {properties.textFields.map((field, index) => (
            <TextField
              key={index}
              id={`field-${index}`}
              label={field.label}
              type="text"
              fullWidth
              size={field.multiline ? 'medium' : 'small'}
              multiline={field.multiline}
              onChange={field.onChange}
            />
          ))}
          <SelectOptions
            title={properties.accessLevelTitle}
            options={properties.accessLevelOptions}
            onChange={properties.onAccessLevelChange}
          />
        </Wrapper>
      }
    />
  );
};
