import { ReactElement } from 'react';
import { Chip } from '@mui/material';

interface ITagProperties {
  title: string;
  warning?: boolean;
}

export const Tag = (properties: ITagProperties): ReactElement => {
  return (
    <Chip
      label={properties.title}
      color={properties.warning ? 'secondary' : 'default'}
    />
  );
};
