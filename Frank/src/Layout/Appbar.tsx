import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Divider, Drawer, List, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuListItem from './MenuListItem';
import { ContextoGlobal, ContextoGlobalInterface } from '../Contextos/ContextoGlobal';

export interface MenuOpcoesInterface {
    descricao: string
    path: string
    icon: string
    modulo: string
    permissao: string
    filhos: Array<MenuOpcoesInterface>
}
const MENU: Array<MenuOpcoesInterface> = [
    {
        descricao: 'Cadastros',
        path: '',
        icon: 'app_registration_outlined',
        modulo: '',
        permissao: '',
        filhos: [{
            descricao: 'Atletas',
            path: '/Atletas',
            icon: 'personoutlinetwotone',
            modulo: '',
            permissao: '',
            filhos: []
        },
        {
            descricao: 'Cão',
            path: '/Cao',
            icon: 'pets',
            modulo: '',
            permissao: '',
            filhos: []
        },
        {
            descricao: 'Escolas',
            path: '/Escola',
            icon: 'school',
            modulo: '',
            permissao: '',
            filhos: []
        },
        {
            descricao: 'Duplas',
            path: '/Duplas',
            icon: 'peoplealt',
            modulo: '',
            permissao: '',
            filhos: []
        },
        ]
    },
    {
        descricao: 'Sistema',
        path: '',
        icon: 'app_registration_outlined',
        modulo: '',
        permissao: '',
        filhos: [{
            descricao: 'Grupos de Usuários',
            path: '/Grupos',
            icon: 'people_alt_outlined',
            modulo: '',
            permissao: '',
            filhos: []
        },
        {
            descricao: 'Usuários',
            path: '/Usuario',
            icon: 'person_outline_outlined',
            modulo: '',
            permissao: '',
            filhos: [{
                descricao: 'Alterar Senha',
                path: '/AlterarSenha',
                icon: 'people_alt_outlined',
                modulo: '',
                permissao: '',
                filhos: []
            }],
        },
        ]
    }
]

interface menuSettingsInterface {
    opcao: string
    caminho: string
}

const settings: Array<menuSettingsInterface> = [
    { opcao: 'Perfil', caminho: '/' },
    { opcao: 'Logout', caminho: '/' }
];
const drawerWidth = 300;


export default function Appbar() {

    const { layoutState, setLayoutState } = useContext(ContextoGlobal) as ContextoGlobalInterface
    const avatarLogin:string = (useContext(ContextoGlobal) as ContextoGlobalInterface).loginState.avatar
    const navegar = useNavigate();

    const irPara = (link: string) => {
        navegar(link)
        setLayoutState({ ...layoutState, exibirMenu: !layoutState.exibirMenu })
        handleCloseUserMenu()
    }

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleDrawerOpenClose = () => {
        setLayoutState({ ...layoutState, exibirMenu: !layoutState.exibirMenu })
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
                                    <Avatar alt="Foto de perfil" src={avatarLogin} />
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
                    open={layoutState.exibirMenu}
                    onClose={handleDrawerOpenClose}
                >
                    <Box sx={{ overflow: 'auto', mt: 5 }}>
                        <List>
                            {MENU.map((menu: MenuOpcoesInterface, i:number) => (

                                <MenuListItem deslocamento={0} key={i} menu={menu} />
                            ))}

                        </List>
                    </Box>
                </Drawer>
            </Box>
        </>
    );
}