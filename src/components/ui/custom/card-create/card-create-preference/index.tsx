import { ReactElement } from 'react';
import { Card } from '@components/ui/common/card';
import { SelectOptions } from '@components/ui/common/select-options';
import {
  ButtonWrapper,
  Wrapper,
} from '@components/ui/custom/card-create/styled-components';
import { TextField } from '@mui/material';
import { Button, ButtonVariant } from 'src/components/ui/common/button';

interface ITextFieldProperties {
  label: string;
  multiline: boolean;
  warn: boolean;
}

interface ICardCreatePreferenceProperties {
  selectTitle: string;
  priceOptions: string[];
  onPriceOptionChange: (option: string) => void;
  textFields: ITextFieldProperties[];
  onDeleteButtonClick: () => void;
  button: string;
}

export const CardCreatePreference = (
  properties: ICardCreatePreferenceProperties,
): ReactElement => {
  return (
    <Card
      content={
        <Wrapper>
          <SelectOptions
            title={properties.selectTitle}
            options={properties.priceOptions}
            onChange={properties.onPriceOptionChange}
          />
          {properties.textFields.map((field, index) => (
            <TextField
              key={index}
              id={`field-${index}`}
              label={field.label}
              type="text"
              fullWidth
              size={field.multiline ? 'medium' : 'small'}
              multiline={field.multiline}
              color={field.warn ? 'error' : 'primary'}
            />
          ))}
          <ButtonWrapper>
            <Button
              onClick={properties.onDeleteButtonClick}
              variant={ButtonVariant.warning}
            >
              {properties.button}
            </Button>
          </ButtonWrapper>
        </Wrapper>
      }
    />
  );
};
