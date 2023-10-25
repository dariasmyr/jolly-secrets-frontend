import { ReactElement, ReactNode } from 'react';
import { Card } from '@components/ui/common/card';
import { SelectOptions } from '@components/ui/common/select-options';
import { Wrapper } from '@components/ui/custom/card-create/styled-components';

interface ICardCreateFieldsProperties {
  accessLevelTitle: string;
  accessLevelOptions: string[];
  onAccessLevelChange: (option: string) => void;
  children: ReactNode;
}

export const CardCreateGroup = (
  properties: ICardCreateFieldsProperties,
): ReactElement => {
  return (
    <Card
      content={
        <Wrapper>
          {properties.children}
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
