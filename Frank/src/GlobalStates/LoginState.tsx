import { useState } from 'react'

export interface LoginStateInterface {
  nome: string
  logado: boolean
  token: string
}

export default function useLoginState() {

  const [loginState, setLoginState] = useState<LoginStateInterface>({
    logado: false,
    nome: '',
    token: ''
  })

  return { loginState, setLoginState }

}