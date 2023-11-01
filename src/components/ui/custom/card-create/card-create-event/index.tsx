import { ReactElement, ReactNode } from 'react';
import { Card } from '@components/ui/common/card';
import { Wrapper } from '@components/ui/custom/card-create/styled-components';

interface ICardCreateEventProperties {
  children: ReactNode;
}

export const CardCreateEvent = (
  properties: ICardCreateEventProperties,
): ReactElement => {
  return <Card content={<Wrapper>{properties.children}</Wrapper>} />;
};
