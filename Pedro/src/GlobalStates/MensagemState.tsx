import React, { useState } from 'react'

export interface MensagemStateInterface {
  exibir: boolean
  mensagem: string
  tipo: 'aviso' | 'erro' | 'processando'
}

export default function useMensagemState() {

  const [mensagemState, setMensagemState] = useState<MensagemStateInterface>({ exibir: false, mensagem: '', tipo: 'aviso' })

  return { mensagemState, setMensagemState }

}