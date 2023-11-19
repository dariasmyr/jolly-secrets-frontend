import { ReactElement } from 'react';
import { Card } from '@components/ui/common/card';

export interface ICardEmailToggleProperties {
  content: ReactElement;
}

export const CardEmailToggle = (
  properties: ICardEmailToggleProperties,
): ReactElement => {
  return <Card content={properties.content} />;
};
