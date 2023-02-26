import { URL_SERVIDOR } from "../../Config/Setup"
import { ContextoGlobalInterface } from "../../Contextos/ContextoGlobal"
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
    globalContext.setMensagemState({ exibir: true, mensagem: 'Pesquisando Escola', tipo: 'processando' })

    setTimeout(() => {

      fetch(URL_SERVIDOR.concat('/escola/'.concat(idEscola.toString())), {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'GET'
      }).then(rs => {

        // Primeiro Then do Fetch - Testo Status + Tratamento dos dados

        if (rs.status === 200) {
          globalContext.setMensagemState({ exibir: false, mensagem: '', tipo: 'aviso' })

          // Envio somente os dados para o próximo Then....
          //console.log(rs.json())
          return rs.json()

        } else {
          globalContext.setMensagemState({ exibir: true, mensagem: 'Erro ao Pesquisar Escola!!!', tipo: 'erro' })
        }
      }).then(rsEscola => {
        
        setEscola(rsEscola)
        setStatusForm(acao)

      }).catch(() => {
        globalContext.setMensagemState({ exibir: true, mensagem: 'Erro no Servidor. Não foi possível pesquisar Escola!!!', tipo: 'erro' })
      })

    }, TEMPO_REFRESH_TEMPORARIO)
  }

}