'use client'

import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Logo from "./kaguya_logo.png";

export default function BasicMenu() {
  const router = useRouter(); // useRouterフックを使用
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickHome =() =>{
    router.push('/login/home');
  };
  const handleClickLogout =() =>{
    router.push('/login');
  };

  return (
    <div>
      {/* <div className='m-2'>
        <Image src={Logo} alt="logo"/>
      </div> */}
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        color='inherit'
        sx={{ flexGrow: 1, textAlign: 'left', fontSize: 'large'}}
      >
        メニュー
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClickHome}>ホーム</MenuItem>
        <MenuItem onClick={handleClickLogout}>ログアウト</MenuItem>
      </Menu>
    </div>
  );
}