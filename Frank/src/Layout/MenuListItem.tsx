import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import Icon from '@mui/material/Icon';
import { useNavigate } from 'react-router-dom';

export default function MenuListItem() {

    const navegar = useNavigate();

    const irPara = (link: string) => {
        navegar(link)
    }
    return (
        <>
            
            <Box sx={{ overflow: 'auto', mt: 5 }}>
                <List>

                    <ListItem disablePadding>
                        <ListItemButton onClick={() => irPara('/')}>
                            <ListItemIcon >
                                <Icon>home</Icon>
                            </ListItemIcon>
                            <ListItemText primary={'Home'} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => irPara('/escola')}>
                            <ListItemIcon >
                                <Icon >star</Icon>
                            </ListItemIcon>
                            <ListItemText primary={'Escola'} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
            
        </>
    )
}