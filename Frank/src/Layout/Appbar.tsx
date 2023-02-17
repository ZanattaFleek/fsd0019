import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Divider, Drawer, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuListItem from './MenuListItem';

interface menuSettingsInterface {
    opcao: string
    caminho: string
}

const settings: Array<menuSettingsInterface> = [
    { opcao: 'Perfil', caminho: '/' },
    { opcao: 'Logout', caminho: '/' }
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

    return (
        <>
            <Box sx={{ flexGrow: 1, height: 50 }}>
                <AppBar >
                    <Toolbar variant="dense">
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Menu">
                                <IconButton
                                    edge="end"
                                    aria-label="menu"
                                    sx={{ mr: 2, color: 'white' }}
                                    onClick={handleDrawerOpenClose}
                                >
                                    <MenuIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Box sx={{ flexGrow: 1 }} />
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
                                        <Typography variant='body1' textAlign="center">{setting.opcao}</Typography>
                                        <Divider />
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                            //smarginBottom: -100
                        },
                        zIndex: (theme) => theme.zIndex.appBar - 1
                    }}
                    variant="temporary"
                    anchor="left"
                    open={open}
                    onClose={handleDrawerOpenClose}
                >
                    <MenuListItem />
                </Drawer>
            </Box>
        </>
    );
}