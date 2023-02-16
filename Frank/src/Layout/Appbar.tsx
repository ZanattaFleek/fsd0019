import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, styled, Tooltip, Typography } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

const settings = ['Perfil', 'Conta', 'Dashboard', 'Logout'];
const drawerWidth = 240;


export default function Appbar() {

    const navegar = useNavigate();

    const irPara = (link: string) => {
        navegar(link)
        setOpen(!open)
    }

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const [open, setOpen] = React.useState(false);

    const handleDrawerOpenClose = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar >
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={handleDrawerOpenClose}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Configurações">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, ml: 150 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        //marginBottom: -100
                    },
                    //zIndex: (theme) => theme.zIndex.appBar - 1
                }}
                //variant="persistent"
                anchor="left"
                open={open}
                onClose={handleDrawerOpenClose}
            >

                <Box sx={{ overflow: 'auto' }}>
                    <List>

                        <ListItem disablePadding>
                            <ListItemButton >
                                <ListItemIcon onClick={() => irPara('/')}>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Home'} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton >
                                <ListItemIcon onClick={() => irPara('/escola')}>
                                    <SchoolIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Escola'} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </Box>
    );
}