import { ReactElement, useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';
import styled from 'styled-components';

interface IFabAddProperties {
  onClick?: () => void;
}

export function FabAdd({ onClick }: IFabAddProperties): ReactElement {
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  let lastScrollTop = 0;

  useEffect(() => {
    function handleScroll(): void {
      const st = window.scrollY || document.documentElement.scrollTop;
      if (st > lastScrollTop) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      lastScrollTop = st <= 0 ? 0 : st;
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleOpen = (): void => {
    setOpen(true);
  };

  return (
    <Tooltip open={open} onClose={handleClose} onOpen={handleOpen} title="Add">
      <FabWrapper
        className={isVisible ? 'show' : 'hide'}
        color="warning"
        aria-label="add"
        onClick={onClick}
      >
        <AddIcon />
      </FabWrapper>
    </Tooltip>
  );
}

const FabWrapper = styled(Fab)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  transition: all 0.3s ease-in-out;
  @media only screen and (min-width: 431px) {
    size: 'large';
  }
`;
