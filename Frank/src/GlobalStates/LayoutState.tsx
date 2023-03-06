import { useState } from 'react'
import { MenuOpcoesInterface } from '../Layout/TopAppbar'


export interface LayoutStateInterface {
  aliasDB: string
  versaoCompleta: string
  exibirMenu: boolean
  opcoesMenu: Array<MenuOpcoesInterface>
}

export default function useLayoutState() {

  const [layoutState, setLayoutState] = useState<LayoutStateInterface>({ 
    aliasDB: '',
    versaoCompleta: '',
    exibirMenu: false,
    opcoesMenu: []
  })

  return { layoutState, setLayoutState }

}