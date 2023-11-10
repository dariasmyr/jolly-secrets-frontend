import { ReactElement } from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Toolbar, Typography } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';

export interface IAppBarProperties {
  title: string;
  onMenuClick?: () => void;
  onAccountClick?: () => void;
  avatarUrl?: string;
}

export const AppBar = (properties: IAppBarProperties): ReactElement => {
  return (
    <MuiAppBar
      position="static"
      sx={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 9999,
      }}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={properties.onMenuClick}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {properties.title}
        </Typography>
        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            onClick={properties.onAccountClick}
          >
            {properties.avatarUrl ? (
              <img
                src={properties.avatarUrl}
                alt="avatar"
                style={{ width: '30px', height: '30px', borderRadius: '50%' }}
              />
            ) : (
              <AccountCircle />
            )}
          </IconButton>
        </div>
      </Toolbar>
    </MuiAppBar>
  );
};
