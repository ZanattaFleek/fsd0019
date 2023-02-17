import * as React from 'react';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useNavigate } from 'react-router-dom';
import { AppBar, Box, Toolbar } from '@mui/material';

export default function Footer() {
  const [value, setValue] = React.useState(0);

  const navigate = useNavigate();

  const navegar = (link: string) => {
    navigate(link)
  }


  return (
    <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}  >
      <Toolbar>


        {/*
                    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                    <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                    >
                    <BottomNavigationAction onClick={() => navegar('/escola')} label="Escola" icon={<RestoreIcon />} />
                    <BottomNavigationAction onClick={() => navegar('/')} label="Home" icon={<FavoriteIcon />} />
                    <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
                    </BottomNavigation>
                    </Paper>
                  */}

      </Toolbar>
    </AppBar>

  );
}