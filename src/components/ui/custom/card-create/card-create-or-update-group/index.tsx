import { ReactElement, ReactNode } from 'react';
import { Card } from '@components/ui/common/card';
import { SelectOptions } from '@components/ui/common/select-options';
import { Wrapper } from '@components/ui/custom/card-create/styled-components';

interface ICardFieldsProperties {
  accessLevelTitle: string;
  accessLevelOptions: string[];
  defaultOption: string;
  onAccessLevelChange: (option: string) => void;
  children: ReactNode;
}

export const CardCreateOrUpdateGroup = (
  properties: ICardFieldsProperties,
): ReactElement => {
  return (
    <Card
      content={
        <Wrapper>
          {properties.children}
          <SelectOptions
            title={properties.accessLevelTitle}
            options={properties.accessLevelOptions}
            defaultOption={properties.defaultOption}
            onChange={properties.onAccessLevelChange}
          />
        </Wrapper>
      }
    />
  );
};
