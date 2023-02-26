import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, Divider, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import Icon from '@mui/material/Icon';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextoGlobal, ContextoGlobalInterface } from '../Contextos/ContextoGlobal';
import { MenuOpcoesInterface } from './Appbar';

interface PropsMenuItem {
    deslocamento: number
    menu: MenuOpcoesInterface
}
export default function MenuListItem({ deslocamento, menu }: PropsMenuItem) {

    const { layoutState, setLayoutState } = useContext(ContextoGlobal) as ContextoGlobalInterface

    const [openSubMenu, setOpenSubMenu] = useState(false)

    const handleClickSubMenu = (oque: any) => {
        setOpenSubMenu(!openSubMenu)
    }

    const navegar = useNavigate();

    const irPara = (link: string) => {
        navegar(link)
        setLayoutState({ ...layoutState, exibirMenu: !layoutState.exibirMenu })
    }

    if (menu.filhos.length === 0) {
        return (
            <>
            <ListItemButton onClick={() => irPara(menu.path)}>
                <ListItemIcon >
                    <Icon sx={{ textAlign: 'center', marginLeft: deslocamento }}>{menu.icon}</Icon>
                </ListItemIcon>
                <ListItemText sx={{ marginLeft: deslocamento - 2 }} primary={menu.descricao} />
            </ListItemButton>
         
            </>
        )

    } else {

        return (
            <>
                <ListItemButton onClick={handleClickSubMenu}>
                    <ListItemIcon >
                        <Icon sx={{ marginLeft: deslocamento }}>{menu.icon}</Icon>
                    </ListItemIcon>
                    <ListItemText sx={{ marginLeft: deslocamento - 2 }} primary={menu.descricao} />
                    {openSubMenu ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                {menu.filhos.map((menu, index) => (
                    <Collapse in={openSubMenu} timeout="auto" unmountOnExit key={index}>
                        <List component="div" disablePadding>
                            <MenuListItem deslocamento={deslocamento + 2} menu={menu} />
                        </List>
                    </Collapse>))
                }
                <Divider/>
            </>
        )
    }
}
