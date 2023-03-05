
export default class ClsEscola {
  
}
/*
import { URL_SERVIDOR } from "../../Config/Setup"
import { ContextoGlobalInterface } from "../../Contextos/ContextoGlobal"

const TEMPO_REFRESH_TEMPORARIO = 500

export default class ClsEscola {

  public btEditar<T>(
    globalContext: ContextoGlobalInterface,
    idUsurio: number,
    setUsuario: React.Dispatch<React.SetStateAction<T>>,
    setLocalState: React.Dispatch<React.SetStateAction<{ acao: string; }>>,
    acao: string
  ) {
    globalContext.setMensagemState({ exibir: true, mensagem: 'Pesquisando Usuário', tipo: 'processando' })

    setTimeout(() => {

      fetch(URL_SERVIDOR.concat('/usuarios/'.concat(idUsurio.toString())), {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'GET'
      }).then(rs => {

        // Primeiro Then do Fetch - Testo Status + Tratamento dos dados

        if (rs.status === 200) {
          globalContext.setMensagemState({ exibir: false, mensagem: '', tipo: 'aviso' })

          // Envio somente os dados para o próximo Then....
          console.log(rs.json())
          return rs.json()

        } else {
          globalContext.setMensagemState({ exibir: true, mensagem: 'Erro ao Pesquisar Usuário!!!', tipo: 'erro' })
        }
      }).then(rsUsuarios => {
        console.log(rsUsuarios)
        setUsuario(rsUsuarios)
        setLocalState({ acao: acao })

      }).catch(() => {
        globalContext.setMensagemState({ exibir: true, mensagem: 'Erro no Servidor. Não foi possível pesquisar Usuário!!!', tipo: 'erro' })
      })

    }, TEMPO_REFRESH_TEMPORARIO)
  }

}
*/