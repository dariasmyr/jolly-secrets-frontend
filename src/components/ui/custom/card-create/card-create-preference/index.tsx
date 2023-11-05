import { ReactElement, ReactNode } from 'react';
import { Card } from '@components/ui/common/card';
import { SelectOptions } from '@components/ui/common/select-options';
import {
  ButtonWrapper,
  Wrapper,
} from '@components/ui/custom/card-create/styled-components';
import { Button, ButtonVariant } from 'src/components/ui/common/button';

interface ICardCreatePreferenceProperties {
  selectTitle: string;
  priceOptions: string[];
  onPriceOptionChange: (option: string) => void;
  onDeleteButtonClick: () => void;
  children: ReactNode;
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
            defaultOption={properties.priceOptions[0]}
            onChange={properties.onPriceOptionChange}
          />
          {properties.children}
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
