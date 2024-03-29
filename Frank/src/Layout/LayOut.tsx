import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';
import Mensagem from '../Componentes/Mensagem';
import { theme } from '../Config/Theme';
import { ContextoGlobal } from '../Contextos/ContextoGlobal';
import useLayoutState from '../GlobalStates/LayoutState';
import useLoginState from '../GlobalStates/LoginState';
import useMensagemState from '../GlobalStates/MensagemState';
import Login from '../Login/Login';
import { Toolbar } from '@mui/material';
import TopAppbar from './TopAppbar';
import BottomBar from './BottomBar';
import Loading from './Loading';


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
                <TopAppbar />
                <Outlet />
                <Toolbar />
                <BottomBar />
                {/*<Loading />*/}

              </> :
              <>
                <Mensagem />
                <Login />
                {/*<Loading />*/}
              </>
            }

          </>

        </ContextoGlobal.Provider>
      </ThemeProvider>
    </>
  );

}
