import * as React from 'react';
import { AppBar, Box, Toolbar } from '@mui/material';
import Copyright from './Copyright';
import { ContextoGlobal, ContextoGlobalInterface } from '../Contextos/ContextoGlobal';

export default function Footer() {


  const usuarioLogin = (React.useContext(ContextoGlobal) as ContextoGlobalInterface).loginState.nome

  return (
    <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: -15 }}  >
      <Toolbar variant="dense">
        <Box sx={{ flexGrow: 3, color: 'text.secondary' }}>{usuarioLogin}</Box>
        <Box sx={{ flexGrow: 0 }}>
          <Copyright />
        </Box>

      </Toolbar>
    </AppBar>
  );
}