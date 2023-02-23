import { useState } from 'react'

export interface LoginStateInterface {
  nome: string
  logado: boolean
  token: string
  avatar: string
}

export default function useLoginState() {

  const [loginState, setLoginState] = useState<LoginStateInterface>({
    logado: true,
    nome:'Frank',
    token: '',
    avatar:'/1.jpg'
  })

  return { loginState, setLoginState }

}