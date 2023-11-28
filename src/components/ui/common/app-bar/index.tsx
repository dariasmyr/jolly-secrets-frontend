import { ReactElement } from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // import back arrow icon
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Toolbar, Typography } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';

export interface IAppBarProperties {
  title: string;
  onMenuClick?: () => void;
  onAccountClick?: () => void;
  avatarUrl?: string;
  isChat?: boolean;
  onBackClick?: () => void;
}

export const AppBar = (properties: IAppBarProperties): ReactElement => {
  return (
    <MuiAppBar
      position="static"
      elevation={0}
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
          onClick={
            properties.isChat ? properties.onBackClick : properties.onMenuClick
          } // update click function based on isChat value
        >
          {properties.isChat ? <ArrowBackIcon /> : <MenuIcon />}{' '}
          {/* update icon based on isChat value */}
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
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  backgroundColor: 'white',
                }}
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
