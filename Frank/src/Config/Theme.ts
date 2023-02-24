import { createTheme } from "@mui/material";
import { orange, red } from "@mui/material/colors";
import {ptBR} from '@mui/material/locale';

export const theme = createTheme({
  
  components: {
    MuiIconButton:{
      defaultProps: {
        color: 'primary',
        style: {
          height: '35px', 
          width: '35px'
        }
      },
    },
  },
  menu:{
    corIcone: '#0E5E53',
    tamanhoIcone:40
  },
  
  mensagens:{
    corWarning: 'orange',
    corError: 'red',
    corInfo: 'blue',
    corSucess: 'green',
    corFundo: 'black',
    corTitulo: 'black',
    corMensagem: 'gray',
    tamanhoIcone: 50
  },
  palette: {
    primary: {
      main: orange[200],
    },
    secondary:{
      main: red[500],
    },
  },
}, ptBR);

declare module '@mui/material/styles' {

  interface ThemeOptions {

    menu:{
      corIcone: string
      tamanhoIcone: number
    },
    mensagens:{
      corWarning: string,
      corError: string,
      corInfo: string,
      corSucess: string,
      corFundo: string,
      corTitulo: string,
      corMensagem: string,
      tamanhoIcone: number
    }
  }
}
