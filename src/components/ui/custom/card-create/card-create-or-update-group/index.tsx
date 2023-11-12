import { ReactElement, ReactNode } from 'react';
import { Card } from '@components/ui/common/card';
import { SelectOptions } from '@components/ui/common/select-options';
import { Wrapper } from '@components/ui/custom/card-create/styled-components';

import { GroupType, PriceRange } from '@/generated/graphql';

interface ICardFieldsProperties {
  accessLevelTitle: string;
  accessLevelOptions: {
    value: GroupType;
    label: string;
  }[];
  defaultOption: {
    value: GroupType;
    label: string;
  };
  onAccessLevelChange: (option: {
    value: GroupType | PriceRange;
    label: string;
  }) => void;
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
