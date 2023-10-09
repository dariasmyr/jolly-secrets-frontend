import { ReactElement } from 'react';
import { Content, Paper } from '@components/ui/card-create-input/style';

export interface ICardCreateInputProperties {
  content: ReactElement;
}

export const CardCreateInput = (
  properties: ICardCreateInputProperties,
): ReactElement => {
  return (
    <Paper>
      <Content>{properties.content}</Content>
    </Paper>
  );
};
