import { ReactElement } from 'react';
import { Content, Paper } from '@components/ui/common/styled-components';

export interface ICardProperties {
  content: ReactElement;
}

export const Card = (properties: ICardProperties): ReactElement => {
  return (
    <Paper elevation={0}>
      <Content>{properties.content}</Content>
    </Paper>
  );
};
