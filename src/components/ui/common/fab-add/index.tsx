import { ReactElement } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';

export const FabAdd = (): ReactElement => {
  return (
    <Fab color="primary" aria-label="add">
      <AddIcon />
    </Fab>
  );
};
