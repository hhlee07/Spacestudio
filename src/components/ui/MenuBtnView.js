import * as React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu'
import IconButton from '@mui/material/IconButton';
import MenuBtnViewModel from './MenuBtnViewModel';

export default function MenuBtnView() {
  const { anchorEl, open, handleClick, handleClose } = MenuBtnViewModel();

  return (
    <Box>
      <IconButton edge="start" aria-label="menu" aria-controls={open ? 'basic-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick} sx={{ mr: 5 }}>
        <MenuIcon sx={{color: '#7c7c7c'}} />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>
          undo
        </MenuItem>
        <MenuItem onClick={handleClose}>
          Redo
        </MenuItem>
        <MenuItem onClick={handleClose}>
          Exit
        </MenuItem>
      </Menu>
    </Box>
  );
}
