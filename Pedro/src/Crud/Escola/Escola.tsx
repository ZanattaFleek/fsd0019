import React, { useContext, useState } from 'react';
import { ContextoGlobal, ContextoGlobalInterface } from '../../Contextos/ContextoGlobal';
import { EscolaInterface } from '../../Interfaces/EscolaInterfaces';

import { URL_SERVIDOR } from '../../Config/Setup';

import InputText from '../../Componentes/InputText';

import './Escola.css'
import ClsEscola from './ClsEscola';

import Button from '@mui/material/Button';

const TEMPO_REFRESH_TEMPORARIO = 500

interface LocalStateInterface {
  acao: 'incluindo' | 'excluindo' | 'pesquisando' | 'editando'
}

interface PesquisaInterface {
  nome: string
}

export default function Escola() {

  const [rsPesquisa, setRsPesquisa] = useState<Array<EscolaInterface>>([])

  const globalContext = (useContext(ContextoGlobal) as ContextoGlobalInterface)

  const [localState, setLocalState] = useState({ acao: 'pesquisando' })

  const [escola, setEscola] = useState<EscolaInterface>({
    cnpj: '',
    email: '',
    idEscola: 0,
    nome: ''
  })

  const [pesquisa, setPesquisa] = useState<PesquisaInterface>({ nome: '' })

  const printTable = () =>
    rsPesquisa.map((escola) =>
      <tr key={escola.idEscola}>
        <td>{escola.nome}</td>
        <td>{escola.cnpj}</td>
        <td>{escola.email}</td>
        <td>
          <input type="button" value="Editar" onClick={() => btEditar(escola.idEscola, 'editando')} />
          <input type="button" value="Excluir" onClick={() => btEditar(escola.idEscola, 'excluindo')} />
        </td>
      </tr>
    )


  const btEditar = (idEscola: number, acao: string) => {

    let clsEscola: ClsEscola = new ClsEscola()

    clsEscola.btEditar<EscolaInterface>(
      globalContext,
      idEscola,
      setEscola,
      setLocalState,
      acao
    )

  }

  const btIncluir = () => {
    setLocalState({ acao: 'incluindo' })
  }

  const btCancelar = () => {
    setLocalState({ acao: 'pesquisando' })
  }

  const btConfirmarExclusao = () => {
    globalContext.setMensagemState({ exibir: true, mensagem: 'Excluindo os dados da Escola', tipo: 'processando' })

    setTimeout(() => {

      fetch(URL_SERVIDOR.concat('/escola/'.concat(escola.idEscola.toString())), {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'DELETE'
      }).then(rs => {

        if (rs.ok) {

          globalContext.setMensagemState({ exibir: true, mensagem: 'Escola Excluída com Sucesso', tipo: 'aviso' })

          setEscola({ nome: '', cnpj: '', email: '', idEscola: 0 })

          setLocalState({ acao: 'pesquisando' })

          btPesquisar()

        } else {

          globalContext.setMensagemState({ exibir: true, mensagem: 'Erro ao Excluir Escola!!!', tipo: 'erro' })

        }

      }).catch(() => {

        globalContext.setMensagemState({ exibir: true, mensagem: 'Erro no Servidor. Não foi possível Excluir Escola!!!', tipo: 'erro' })

      })

    }, TEMPO_REFRESH_TEMPORARIO)

  }

  const btConfirmarEdicao = () => {
    globalContext.setMensagemState({ exibir: true, mensagem: 'Alterando os dados da Escola', tipo: 'processando' })

    setTimeout(() => {
      fetch(URL_SERVIDOR.concat('/escola/'.concat(escola.idEscola.toString())), {
        body: JSON.stringify(escola),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT'

      }).then(rs => {
        if (rs.ok) {

          setEscola({ nome: '', cnpj: '', email: '', idEscola: 0 })

          setLocalState({ acao: 'pesquisando' })

          btPesquisar()

          globalContext.setMensagemState({ exibir: true, mensagem: 'Dados Alterados com Sucesso', tipo: 'aviso' })
        } else {
          globalContext.setMensagemState({ exibir: true, mensagem: 'Erro ao Alterar Escola!!!', tipo: 'erro' })
        }
      }).catch(() => {
        globalContext.setMensagemState({ exibir: true, mensagem: 'Erro no Servidor. Não foi possível alterar Escola!!!', tipo: 'erro' })
      })
    }, TEMPO_REFRESH_TEMPORARIO)
  }

  const btConfirmarInclusao = () => {

    globalContext.setMensagemState({ exibir: true, mensagem: 'Incluindo Escola', tipo: 'processando' })

    setTimeout(() => {
      fetch(URL_SERVIDOR.concat('/escola'), {
        body: JSON.stringify(escola),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST'
      }).then(rs => {
        if (rs.status == 201) {
          setEscola({ nome: '', cnpj: '', email: '', idEscola: 0 })
          globalContext.setMensagemState({ exibir: true, mensagem: 'Escola Cadastrada com Sucesso', tipo: 'aviso' })
        } else {
          globalContext.setMensagemState({ exibir: true, mensagem: 'Erro ao Incluir Escola!!!', tipo: 'erro' })
        }
      }).catch(() => {
        globalContext.setMensagemState({ exibir: true, mensagem: 'Erro no Servidor. Não foi possível incluir Escola!!!', tipo: 'erro' })
      })
    }, TEMPO_REFRESH_TEMPORARIO)

  }

  const btPesquisar = () => {

    globalContext.setMensagemState({ exibir: true, mensagem: 'Pesquisando Escola', tipo: 'processando' })

    setTimeout(() => {

      fetch(URL_SERVIDOR.concat('/escola?nome_like='.concat(pesquisa.nome)), {
        // body: JSON.stringify(escola),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'GET'
      }).then(rs => {

        // Primeiro Then do Fetch - Testo Status + Tratamento dos dados

        if (rs.status == 200) {
          globalContext.setMensagemState({ exibir: false, mensagem: '', tipo: 'aviso' })

          // Envio somente os dados para o próximo Then....
          return rs.json()

        } else {
          globalContext.setMensagemState({ exibir: true, mensagem: 'Erro ao Pesquisar Escola!!!', tipo: 'erro' })
        }
      }).then(rsEscolas => {

        // console.log(JSON.stringify(rsEscolas))
        setRsPesquisa(rsEscolas)

      }).catch(() => {
        globalContext.setMensagemState({ exibir: true, mensagem: 'Erro no Servidor. Não foi possível pesquisar Escola!!!', tipo: 'erro' })
      })

    }, TEMPO_REFRESH_TEMPORARIO)

  }

  return (
    <>
      <h1>Cadastro de Escola</h1>

      {localState.acao == 'pesquisando' &&
        <>
          <InputText label="Pesquisa" type="text" dados={pesquisa} field="nome" setState={setPesquisa} />
          <Button variant="contained" onClick={btPesquisar}>Pesquisar</Button>
          <Button variant="contained" onClick={btIncluir}>Incluir</Button>
        </>
      }


      {localState.acao != 'pesquisando' &&
        <>
          <InputText label="Nome" type="text" dados={escola} field="nome" setState={setEscola} disabled={localState.acao == 'excluindo' ? true : false} />
          <InputText label="CNPJ" type="text" dados={escola} field="cnpj" setState={setEscola} disabled={localState.acao == 'excluindo' ? true : false} />
          <InputText label="e-mail" type="text" dados={escola} field="email" setState={setEscola} disabled={localState.acao == 'excluindo' ? true : false} />
        </>

      }

      {localState.acao == 'incluindo' &&

        <input type="button" onClick={btConfirmarInclusao} value="Confirmar Inclusão" />

      }

      {localState.acao == 'editando' &&

        <input type="button" onClick={btConfirmarEdicao} value="Confirmar Edição" />

      }

      {localState.acao == 'excluindo' &&

        <input type="button" onClick={btConfirmarExclusao} value="Confirmar Exclusão" />

      }

      {localState.acao != 'pesquisando' &&

        <input type="button" onClick={btCancelar} value="Cancelar" />

      }

      {
        localState.acao == 'pesquisando' &&

        <table className='clsTableEscola'>
          <thead>
            <tr>
              <td>Nome</td>
              <td>CNPJ</td>
              <td>e-mail</td>
              <td>Ações</td>
            </tr>
          </thead>
          <tbody>

            {
              printTable()
            }

          </tbody>

        </table>

      }

    </>
  );

}
