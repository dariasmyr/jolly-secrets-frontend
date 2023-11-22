import { ReactElement, useContext } from 'react';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';
import { ThemeContext } from '@pages/_app.context';
import styled from 'styled-components';

export function FabMode(): ReactElement {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <Tooltip title="Сменить тему">
      <FabModeStyled
        color="primary"
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
