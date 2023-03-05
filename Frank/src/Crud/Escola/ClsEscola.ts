import { URL_SERVIDOR } from "../../Config/Setup"
import { ContextoGlobalInterface } from "../../Contextos/ContextoGlobal"
import { MensagemStatePadrao, MensagemTipo } from "../../GlobalStates/MensagemState";
import { StatusForm } from "./Escola";

const TEMPO_REFRESH_TEMPORARIO = 500

export default class ClsEscola {

  public btEditar<T>(
    globalContext: ContextoGlobalInterface,
    idEscola: number,
    setEscola: React.Dispatch<React.SetStateAction<T>>,
    setStatusForm: React.Dispatch<React.SetStateAction<StatusForm>>,
    acao: StatusForm
  ) {
    
     
    globalContext.setMensagemState( {
      ...globalContext.mensagemState,
      titulo: 'Pesquisando!',
      exibir: true,
      mensagem: 'Pesquisando informações no banco de dados!',
      tipo: MensagemTipo.Info,
      exibirBotao: false
    } )

    setTimeout(() => {

      fetch(URL_SERVIDOR.concat('/escola/'.concat(idEscola.toString())), {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'GET'
      }).then(rs => {

        // Primeiro Then do Fetch - Testo Status + Tratamento dos dados

        if (rs.status === 200) {
        globalContext.setMensagemState( MensagemStatePadrao )

          // Envio somente os dados para o próximo Then....
          //console.log(rs.json())
          return rs.json()

        } else {
          globalContext.setMensagemState( {
            ...globalContext.mensagemState,
            titulo: 'Erro! Consulte Suporte!',
            exibir: true,
            mensagem: 'Erro ao Consultar Escola',
            tipo: MensagemTipo.Error,
            exibirBotao: true
          } )
        }
      }).then(rsEscola => {
        
        setEscola(rsEscola)
        setStatusForm(acao)

      }).catch(() => {
        globalContext.setMensagemState( {
          ...globalContext.mensagemState,
          titulo: 'Erro! Consulte Suporte!',
          exibir: true,
          mensagem: 'Erro ao Consultar Escola!',
          tipo: MensagemTipo.Error,
          exibirBotao: true
        } )
      })

    }, TEMPO_REFRESH_TEMPORARIO)
  }

}