import { Grid, Box, Button, Autocomplete, TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import React from "react";
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: 'black',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: 'white'
}));

const UFs = [
  { label: 'Acre', sigla: "AC" },
  { label: 'Alagoas', sigla: "AL" },
  { label: 'Amapá', sigla: "AP" },
  { label: 'Amazonas', sigla: "AM" },
  { label: 'Bahia', sigla: "BA" },
  { label: "Ceará", sigla: "CE" },
  { label: 'Distrito Federal', sigla: "DF" },
  {
    label: 'Espirito Santo',
    sigla: "ES",
  },
  { label: 'Goiás', sigla: "GO" },
  { label: 'Maranhão', sigla: "MA" },
  {
    label: 'Mato Grosso',
    sigla: "MT",
  },
  {
    label: 'Mato Grosso do Sul',
    sigla: "MS",
  },
  { label: 'Minas Gerais', sigla: "MG" },
  { label: 'Pará', sigla: "PA" },
  {
    label: 'Paraíba',
    sigla: "PB"
  },
  { label: 'Paraná', sigla: "PR" },
  { label: 'Pernambuco', sigla: "PE" },
  { label: 'Piauí', sigla: "PI " },
  { label: 'Rio de Janiero', sigla: "RJ" },
  { label: 'Rio Grande do Norte', sigla: "RN" },
  { label: 'Rio Grande do Sul', sigla: "RS" },
  { label: 'Rondônia', sigla: "RO" },
  { label: 'Roraima', sigla: "RR" },
  { label: 'Santa Catarina', sigla: "SC" },
  { label: 'São Paulo', sigla: "SP" },
  { label: 'Sergipe', sigla: "SE" },
  { label: 'Tocantins', sigla: "TO" },
]

export default function ComboBox() {

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ display: 12 }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              App agility
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {['Home', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box>
      

      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={UFs}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="UF" />}
      />

      <Paper>
        <Grid
          container spacing={3}
        >
          <Grid item xs={12} sm={6}>
            <TextField id="outlined-basic" label="Nome" variant="outlined" sx={{ width: '100%'}}/>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField id="outlined-basic" label="Sobrenome" variant="outlined" sx={{ width: '100%' }} />
          </Grid>
          <Grid item xs={12} >
            <TextField id="outlined-basic" label="Endereço Completo" variant="outlined" sx={{ width: '100%' }} />
          </Grid>
          <Grid item xs={10} >
            <TextField id="outlined-basic" label="CEP" variant="outlined" sx={{ width: '100%' }}/>
          </Grid>
          <Grid item xs={2}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={UFs}
              sx={{ width: "100%" }}
              renderInput={(params) => <TextField {...params} label="UF" />}
            />
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}

