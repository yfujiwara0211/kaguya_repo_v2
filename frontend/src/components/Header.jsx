'use client'

import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, Grid } from '@mui/material';
import BasicMenu from "./BasicMenu";
import { LoginUserContext } from "./LoginUserProvider";
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme/theme'
// import Link from "next/link";

const Header = () => {
    const { loginUser } = useContext(LoginUserContext);
    console.log("loginUser:", loginUser); // loginUser の値をログに出力
  return (
    <ThemeProvider theme={theme}>
        <AppBar position="static">
            <Toolbar>
                <Grid container alignItems="center" sx={{ maxWidth: '1200px', margin: 'auto' }}>
                    <Grid item xs={6}>
                    <BasicMenu/>
                    </Grid>
                    <Grid item xs={6} sx={{ py:0 }}>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'right', fontSize: 'large'}}>
                        ログインユーザー:{loginUser || 'Guest'} 
                        {/* <br/> */}
                        {/* <Link href="/login/home/recommend/cart">カート</Link> */}
                        </Typography>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    </ThemeProvider>
  );
};

export default Header;
