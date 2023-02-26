import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import InputText from '../Componentes/InputText';


import { URL_SERVIDOR } from '../Config/Setup';
import { theme } from '../Config/Theme';
import { ContextoGlobal, ContextoGlobalInterface } from '../Contextos/ContextoGlobal';
import Copyright from '../Layout/Copyright';

interface LoginInterface {
  usuario: string
  senha: string
}

export default function Login() {

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  //const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
  //  event.preventDefault();
  //};

  const [login, setLogin] = useState<LoginInterface>({
    usuario: '', senha: ''
  })

  const setLoginState = (useContext(ContextoGlobal) as ContextoGlobalInterface).setLoginState

  const logar = () => {

    // http://localhost:3002/usuarios?usuario=Zanatta&senha=Fleek

    let urlPesquisa = URL_SERVIDOR.concat('/usuarios?usuario=')
    urlPesquisa = urlPesquisa.concat(login.usuario)
    urlPesquisa = urlPesquisa.concat('&senha=')
    urlPesquisa = urlPesquisa.concat(login.senha)

    setTimeout(() => {

      fetch(urlPesquisa).then(rs => {
        return rs.json()
      }).then((rs) => {

        if (rs.length > 0) {

          setLoginState({
            logado: true,
            nome: rs[0].usuario,
            token: rs[0].token,
            avatar: rs[0].avatar
          })
        } else {
          console.log('Usuário Não Encontrado')
        }
      }).catch(e => {
        console.log('Erro no Fetch....', e)
      })
    }, 3000)
  }

  return (
    <>
      <Container maxWidth="xs" sx={{ mt: 5 }}>
        <Paper variant="outlined" sx={{ p: 2 }} >
          <Box maxWidth="500" sx={{ flexGrow: 1 }}>
            <Typography variant="h3" align='center' color={theme.palette.primary.main}>
              Log in
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12} m={2}>
                <InputText
                  dados={login}
                  field="usuario"
                  label="Login"
                  setState={setLogin}

                />
              </Grid>
              <Grid item xs={12} md={12} m={2}>
                <InputText
                  dados={login}
                  field="senha"
                  label="Senha"
                  setState={setLogin}
                  type={showPassword ? 'text' : 'password'}
                  iconeEnd={showPassword ? "visibilityoff"  : "visibility"}
                  onClickIconeEnd={handleClickShowPassword}
                />


              </Grid>
              <Grid item xs={12} md={12} ml={34} >
                <Button
                  variant='contained'
                  onClick={() => logar()}>Log in
                </Button>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Box>
        </Paper>
      </Container>
    </>
  );

}
