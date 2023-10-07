// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable unicorn/no-null */
import React, { ReactElement, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export const ButtonSplit = (): ReactElement => {
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorElement(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorElement(null);
  };

  const handleDelete = (): void => {
    // eslint-disable-next-line no-alert
    alert('Удалить');
    handleClose();
  };

  const handleEdit = (): void => {
    // eslint-disable-next-line no-alert
    alert('Изменить');
    handleClose();
  };

  return (
    <div>
      <IconButton
        style={{ backgroundColor: 'transparent', border: 'none' }}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorElement}
        keepMounted
        open={Boolean(anchorElement)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleDelete}>Удалить</MenuItem>
        <MenuItem onClick={handleEdit}>Изменить</MenuItem>
      </Menu>
    </div>
  );
};
