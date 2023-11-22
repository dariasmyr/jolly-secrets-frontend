import { ReactElement } from 'react';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';
import styled from 'styled-components';

import { useThemeStore } from '@/store/theme.store';

export function FabMode(): ReactElement {
  const { darkMode, toggleDarkMode } = useThemeStore();

  return (
    <Tooltip title="Сменить тему">
      <FabModeStyled
        color="warning"
        aria-label="theme"
        onClick={toggleDarkMode}
      >
        {darkMode ? <WbSunnyIcon /> : <DarkModeIcon />}
      </FabModeStyled>
    </Tooltip>
  );
}

const FabModeStyled = styled(Fab)`
  position: fixed;
  bottom: 20px;
  right: 20px;
`;
