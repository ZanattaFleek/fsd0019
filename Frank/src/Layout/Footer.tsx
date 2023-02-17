import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Box, Toolbar } from '@mui/material';
import Copyright from './Copyright';

export default function Footer() {
  const [value, setValue] = React.useState(0);

  const navigate = useNavigate();

  const navegar = (link: string) => {
    navigate(link)
  }


  return (
    <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: -15 }}  >
      <Toolbar variant="dense">
        <Box sx={{ flexGrow: 3 }} />
        <Box sx={{ flexGrow: 0 }}>
          <Copyright />
        </Box>

      </Toolbar>
    </AppBar>

  );
}