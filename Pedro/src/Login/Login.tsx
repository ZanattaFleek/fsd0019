import React, { useContext, useState } from 'react';
import { URL_SERVIDOR } from '../Config/Setup';
import { ContextoGlobal, ContextoGlobalInterface } from '../Contextos/ContextoGlobal';

import './Login.css'

interface LoginInterface {
  usuario: string
  senha: string
  token: string
}

export default function Login() {

  const [login, setLogin] = useState<LoginInterface>({
    usuario: '', senha: '', token: ''
  })

  const setLoginState = (useContext(ContextoGlobal) as ContextoGlobalInterface).setLoginState

  const logar = () => {

    // http://localhost:3002/usuarios?usuario=Zanatta&senha=Fleek

    let urlPesquisa = URL_SERVIDOR.concat('/usuarios?usuario=')
    urlPesquisa = urlPesquisa.concat(login.usuario)
    urlPesquisa = urlPesquisa.concat('&senha=')
    urlPesquisa = urlPesquisa.concat(login.senha)

    // console.log(urlPesquisa)

    setTimeout(() => {

      fetch(urlPesquisa).then(rs => {
        return rs.json()
      }).then((rs: Array<LoginInterface>) => {

        if (rs.length > 0) {

          setLoginState({
            logado: true,
            nome: rs[0].usuario,
            token: rs[0].token
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
      <div className="borda">
        <h1>Login.tsx</h1>

        <input type="text" placeholder='Login:' id="txtLogin"
          onChange={(e) => setLogin({ ...login, usuario: e.target.value })}
        />

        <input type="password" placeholder='Senha:' id="txtSenha"
          onChange={(e) => setLogin({ ...login, senha: e.target.value })}
        />

        <input type="button" value="Logar" onClick={logar} />

      </div>
    </>
  );

}
