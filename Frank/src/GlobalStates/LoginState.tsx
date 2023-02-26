import { useState } from 'react'

export interface LoginStateInterface {
  nome: string
  logado: boolean
  token: string
  avatar: string
}

export default function useLoginState() {

  const [loginState, setLoginState] = useState<LoginStateInterface>({
    logado: false,
    nome:'',
    token: '',
    avatar:''
  })

  return { loginState, setLoginState }

}

/**
      logado: true,
    nome:'Frank',
    token: '',
    avatar:'/1.jpg'
*/