import { ReactElement } from 'react';
import { Content, Paper } from '@components/ui/common/styled-components';

export interface ICardCreateInputProperties {
  content: ReactElement;
}

export const Card = (properties: ICardCreateInputProperties): ReactElement => {
  return (
    <Paper>
      <Content>{properties.content}</Content>
    </Paper>
  );
};
