import { ReactElement } from 'react';
import { Content, Paper } from '@components/ui/card/style';

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
