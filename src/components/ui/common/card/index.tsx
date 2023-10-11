import { ReactElement } from 'react';
import { Content, Paper } from '@components/ui/common/styled-components';

export interface ICardProperties {
  content: ReactElement;
}

export const Card = (properties: ICardProperties): ReactElement => {
  return (
    <Paper>
      <Content>{properties.content}</Content>
    </Paper>
  );
};
