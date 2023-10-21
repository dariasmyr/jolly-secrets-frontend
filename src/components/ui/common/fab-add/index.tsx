import React, { ReactElement } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';
import styled from 'styled-components';

interface IFabAddProperties {
  onClick?: () => void;
}

export function FabAdd({ onClick }: IFabAddProperties): ReactElement {
  const [open, setOpen] = React.useState(false);

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleOpen = (): void => {
    setOpen(true);
  };

  return (
    <Tooltip open={open} onClose={handleClose} onOpen={handleOpen} title="Add">
      <FabWrapper color="primary" aria-label="add" onClick={onClick}>
        <AddIcon />
      </FabWrapper>
    </Tooltip>
  );
}

const FabWrapper = styled(Fab)`
  position: fixed;
  bottom: 20px;
  right: 20px;
`;
