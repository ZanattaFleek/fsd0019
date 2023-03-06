import * as React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Condicional from './Condicional';
import { ContextoGlobal, ContextoGlobalInterface } from '../Contextos/ContextoGlobal';
import { MensagemTipo } from '../GlobalStates/MensagemState';




export default function Loading() {

    const { mensagemState } = React.useContext(ContextoGlobal) as ContextoGlobalInterface

    return (

        <Condicional condicao={mensagemState.tipo === MensagemTipo.Loading}>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{ height: 40 }}>

                    <CircularProgress />

                </Box>
            </Box>
    
        </Condicional>
    );
}