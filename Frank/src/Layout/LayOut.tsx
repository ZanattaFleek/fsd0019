import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import React from 'react';

import { Outlet } from 'react-router-dom';
import Mensagem from '../Componentes/Mensagem';
import { theme } from '../Config/Theme';

import { ContextoGlobal } from '../Contextos/ContextoGlobal';
import useLayoutState from '../GlobalStates/LayoutState';
import useLoginState from '../GlobalStates/LoginState';
import useMensagemState from '../GlobalStates/MensagemState';

import Login from '../Login/Login';
import Appbar from './Appbar';


export default function LayOut() {

  const { loginState, setLoginState } = useLoginState()
  const { layoutState, setLayoutState } = useLayoutState()
  const { mensagemState, setMensagemState } = useMensagemState()

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <ContextoGlobal.Provider value={{
          loginState: loginState,
          setLoginState: setLoginState,
          layoutState: layoutState,
          setLayoutState: setLayoutState,
          mensagemState: mensagemState,
          setMensagemState: setMensagemState
        }}>
          <>
            {loginState.logado ?
              <>
                <Mensagem />
                <Appbar />
                <Outlet />
                
              </> :
              <>
                <Login />
              </>
            }

          </>

        </ContextoGlobal.Provider>
      </ThemeProvider>
    </>
  );

}
