import React, { createContext } from 'react'
import { LayoutStateInterface } from '../GlobalStates/LayoutState'
import { LoginStateInterface } from '../GlobalStates/LoginState'
import { MensagemStateInterface } from '../GlobalStates/MensagemState'

export interface ContextoGlobalInterface {
  loginState: LoginStateInterface
  setLoginState: React.Dispatch<React.SetStateAction<LoginStateInterface>>
  layoutState: LayoutStateInterface
  setLayoutState: React.Dispatch<React.SetStateAction<LayoutStateInterface>>
  mensagemState: MensagemStateInterface
  setMensagemState: React.Dispatch<React.SetStateAction<MensagemStateInterface>>
}

export const ContextoGlobal = createContext<ContextoGlobalInterface | null>(null)
