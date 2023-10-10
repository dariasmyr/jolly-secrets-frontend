// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable unicorn/no-null */
import React, { ReactElement, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export interface IMenuOption {
  title: string;
  onClick: () => void;
}

export interface IMenuProperties {
  options: IMenuOption[];
}

export const MenuOptions = (properties: IMenuProperties): ReactElement => {
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorElement(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorElement(null);
  };

  return (
    <div
      style={{
        backgroundColor: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
        width: '20px',
        height: '20px',
      }}
    >
      <IconButton
        style={{ backgroundColor: 'transparent', border: 'none' }}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon fontSize="small" />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorElement}
        keepMounted
        open={Boolean(anchorElement)}
        onClose={handleClose}
      >
        {properties.options.map((option, index) => (
          <MenuItem
            key={index}
            onClick={(): void => {
              option.onClick();
              handleClose();
            }}
          >
            {option.title}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
