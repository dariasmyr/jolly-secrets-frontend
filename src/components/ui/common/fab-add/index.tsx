import { ReactElement, useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';
import styled from 'styled-components';

interface IFabAddProperties {
  onClick?: () => void;
}

export function FabAdd({
  onClick,
}: IFabAddProperties): ReactElement | undefined {
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  let lastScrollTop = 0;

  useEffect(() => {
    window.addEventListener('scroll', () => {
      const st = window.scrollY || document.documentElement.scrollTop;
      if (st > lastScrollTop) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollTop = st <= 0 ? 0 : st;
    });
  }, []);

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleOpen = (): void => {
    setOpen(true);
  };

  return isVisible ? (
    <Tooltip open={open} onClose={handleClose} onOpen={handleOpen} title="Add">
      <FabWrapper color="primary" aria-label="add" onClick={onClick}>
        <AddIcon />
      </FabWrapper>
    </Tooltip>
  ) : undefined;
}

const FabWrapper = styled(Fab)`
  position: fixed;
  bottom: 20px;
  right: 20px;
`;
