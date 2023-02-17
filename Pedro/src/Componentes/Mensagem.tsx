import React, { useContext } from 'react';
import { ContextoGlobal, ContextoGlobalInterface } from '../Contextos/ContextoGlobal';
import { MensagemStateInterface } from '../GlobalStates/MensagemState';

import './Mensagem.css'

export default function Mensagem() {

  const { mensagemState, setMensagemState } = (useContext(ContextoGlobal) as ContextoGlobalInterface)

  const fecharJanela = () => {
    setMensagemState({ exibir: false, mensagem: '', tipo: 'aviso' })
  }

  if (mensagemState.exibir) {

    return (
      <>
        <div id="mensagem" className="modal">
          <div className="modal-content">
            <p>{mensagemState.mensagem}</p>
            <span>{(mensagemState.tipo == 'erro' || mensagemState.tipo == 'aviso') &&

              <>
                <input type="button" onClick={fecharJanela} value="Fechar" />
              </>

            }
            </span>
          </div>
        </div>
      </>
    )

  } else {
    return (<></>)
  }

}
