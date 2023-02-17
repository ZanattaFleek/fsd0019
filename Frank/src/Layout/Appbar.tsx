import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Button, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, styled, Tooltip, Typography } from '@mui/material';
import Icon from '@mui/material/Icon';
import SchoolIcon from '@mui/icons-material/School';
import HomeIcon from '@mui/icons-material/Home';
import { Navigate, useNavigate } from 'react-router-dom';

interface menuSettingsInterface {
    opcao: string
    caminho: string
}

const settings: Array<menuSettingsInterface> = [
    { opcao: 'Escola', caminho: '/Escola' },
    { opcao: 'Home', caminho: '/' }
];
const drawerWidth = 240;


export default function Appbar() {

    const navegar = useNavigate();

    const irPara = (link: string) => {
        navegar(link)
        setOpen(!open)
        handleCloseUserMenu()
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

    let iconeMenu = 'star'

    return (
        <>
            <Box sx={{ flexGrow: 1, height: 50 }}>
                <AppBar >
                    <Toolbar>
                        <Box sx={{ flexGrow: 0 }}>
                            <IconButton
                                edge="end"
                                aria-label="menu"
                                sx={{ mr: 2, color: 'white' }}
                                onClick={handleDrawerOpenClose}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Box>
                        <Box sx={{ flexGrow: 1 }}>
                        </Box>
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Configurações">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, ml: 0 }}>
                                    <Avatar alt="Z" src="/logo192.png" />
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
                                {settings.map((setting, index) => (
                                    <MenuItem key={index} onClick={() => irPara(setting.caminho)}>
                                        <Typography component='p' variant='overline' textAlign="center">{setting.opcao}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
            {/*

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
    */}

        </>
    );
}