import { useContext, useState } from 'react';
import { ContextoGlobal, ContextoGlobalInterface } from '../../Contextos/ContextoGlobal';
import { URL_SERVIDOR } from '../../Config/Setup';
import InputText from '../../Componentes/InputText';
import Button from '@mui/material/Button';
import { Grid, IconButton, Paper, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { styled } from '@mui/material/styles';
import { LoginStateInterface } from '../../GlobalStates/LoginState';
import ClsUsuario from './ClsUsuario';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const TEMPO_REFRESH_TEMPORARIO = 500

interface PesquisaInterface {
  nome: string
}

export interface UsuarioInterface{
  idUsuario: number
    nome: string
    token: string
    avatar: string
    senha: string
}

export default function Escola() {

  const [rsPesquisa, setRsPesquisa] = useState<Array<UsuarioInterface>>([])

  const globalContext = (useContext(ContextoGlobal) as ContextoGlobalInterface)

  const [localState, setLocalState] = useState({ acao: 'pesquisando' })

  const [usuario, setUsuario] = useState<UsuarioInterface>({
    idUsuario: 0,
    nome: '',
    token: '',
    avatar: '',
    senha:''
  })

  const [pesquisa, setPesquisa] = useState<PesquisaInterface>({ nome: '' })

  const printTable = () =>

    <>
      {rsPesquisa.map((row) => (
        <TableRow
          key={row.idUsuario}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            {row.idUsuario}
          </TableCell>
          <TableCell align="left">{row.nome}</TableCell>
          <TableCell align="left">{row.token}</TableCell>
          <TableCell align="left">{row.avatar}</TableCell>
          <TableCell align="left">{row.senha}</TableCell>
          <TableCell align='left'>
            <IconButton
              type="button"
              sx={{ p: '10px' }}
              aria-label="delete"
              onClick={() => btEditar(row.idUsuario, 'excluindo')}>
              <DeleteOutlineOutlinedIcon />
            </IconButton>
            <IconButton
              type="button"
              sx={{ p: '10px' }}
              aria-label="editar"
              onClick={() => btEditar(row.idUsuario, 'editando')}>
              <EditOutlinedIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </>


  const btEditar = (idUsuario: number, acao: string) => {

    let clsUsuario: ClsUsuario = new ClsUsuario()

    clsUsuario.btEditar<UsuarioInterface>(
      globalContext,
      idUsuario,
      setUsuario,
      setLocalState,
      acao
    )

  }

  const btIncluir = () => {
    setLocalState({ acao: 'incluindo' })
  }

  const btCancelar = () => {
    setLocalState({ acao: 'pesquisando' })
    btPesquisar()
  }

  const btConfirmarExclusao = () => {
    globalContext.setMensagemState({ exibir: true, mensagem: 'Excluindo os dados da Usuário', tipo: 'processando' })

    setTimeout(() => {

      fetch(URL_SERVIDOR.concat('/usuarios/'.concat(usuario.idUsuario.toString())), {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'DELETE'
      }).then(rs => {

        if (rs.ok) {

          globalContext.setMensagemState({ exibir: true, mensagem: 'Usuário Excluído com Sucesso', tipo: 'aviso' })

          setUsuario({
            idUsuario: 0,
            nome: '',
            token: '',
            avatar: '',
            senha:''
          })

          setLocalState({ acao: 'pesquisando' })

          btPesquisar()

        } else {

          globalContext.setMensagemState({ exibir: true, mensagem: 'Erro ao Excluir Usuário!!!', tipo: 'erro' })

        }

      }).catch(() => {

        globalContext.setMensagemState({ exibir: true, mensagem: 'Erro no Servidor. Não foi possível Excluir Usuário!!!', tipo: 'erro' })

      })

    }, TEMPO_REFRESH_TEMPORARIO)

  }

  const btConfirmarEdicao = () => {
    globalContext.setMensagemState({ exibir: true, mensagem: 'Alterando os dados da Escola', tipo: 'processando' })

    setTimeout(() => {
      fetch(URL_SERVIDOR.concat('/usuarios/'.concat(usuario.idUsuario.toString())), {
        body: JSON.stringify(usuario),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT'

      }).then(rs => {
        if (rs.ok) {

          setUsuario({
            idUsuario: 0,
            nome: '',
            token: '',
            avatar: '',
            senha:''
          })

          setLocalState({ acao: 'pesquisando' })

          btPesquisar()

          globalContext.setMensagemState({ exibir: true, mensagem: 'Dados Alterados com Sucesso', tipo: 'aviso' })
        } else {
          globalContext.setMensagemState({ exibir: true, mensagem: 'Erro ao Alterar Usuário!!!', tipo: 'erro' })
        }
      }).catch(() => {
        globalContext.setMensagemState({ exibir: true, mensagem: 'Erro no Servidor. Não foi possível alterar Usuário!!!', tipo: 'erro' })
      })
    }, TEMPO_REFRESH_TEMPORARIO)
  }

  const btConfirmarInclusao = () => {

    globalContext.setMensagemState({ exibir: true, mensagem: 'Incluindo Usuário', tipo: 'processando' })

    setTimeout(() => {
      fetch(URL_SERVIDOR.concat('/usuarios'), {
        body: JSON.stringify(usuario),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST'
      }).then(rs => {
        if (rs.status === 201) {
          setUsuario({
            idUsuario: 0,
            nome: '',
            token: '',
            avatar: '',
            senha:''
          })

          globalContext.setMensagemState({ exibir: true, mensagem: 'Usuário Cadastrado com Sucesso', tipo: 'aviso' })

        } else {
          globalContext.setMensagemState({ exibir: true, mensagem: 'Erro ao Incluir Usuário!!!', tipo: 'erro' })
        }
      }).catch(() => {
        globalContext.setMensagemState({ exibir: true, mensagem: 'Erro no Servidor. Não foi possível incluir Usuário!!!', tipo: 'erro' })
      })
    }, TEMPO_REFRESH_TEMPORARIO)

  }

  const btPesquisar = () => {

    globalContext.setMensagemState({ exibir: true, mensagem: 'Pesquisando Usuário', tipo: 'processando' })

    setTimeout(() => {

      fetch(URL_SERVIDOR.concat('/usuarios?nome_like='.concat(pesquisa.nome)), {
        // body: JSON.stringify(escola),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'GET'
      }).then(rs => {

        // Primeiro Then do Fetch - Testo Status + Tratamento dos dados

        if (rs.status === 200) {
          globalContext.setMensagemState({ exibir: false, mensagem: '', tipo: 'aviso' })

          // Envio somente os dados para o próximo Then....
          return rs.json()

        } else {
          globalContext.setMensagemState({ exibir: true, mensagem: 'Erro ao Pesquisar Usuário!!!', tipo: 'erro' })
        }
      }).then(rsUsuarios => {

        setRsPesquisa(rsUsuarios)

      }).catch(() => {
        globalContext.setMensagemState({ exibir: true, mensagem: 'Erro no Servidor. Não foi possível pesquisar Usuário!!!', tipo: 'erro' })
      })

    }, TEMPO_REFRESH_TEMPORARIO)

  }
  const irpara = useNavigate()

  const btFechar = () => {
    irpara('/')
  }

  return (
    <>
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Paper variant="outlined" sx={{ padding: 2 }}>

          <Grid container sx={{ display: 'flex', alignItems: 'center' }}>

            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography component="h5" variant="h5" align="left">
                Cadastro de Usuários
                <Typography variant="body2" gutterBottom>
                  Inclusão de um nova usuário
                </Typography>
              </Typography>

              <IconButton onClick={() => btFechar()}>
                <CloseIcon />
              </IconButton>
            </Grid>

            {localState.acao === 'pesquisando' &&

              <>
                <Grid item xs={12} sm={8} sx={{ mb: 5 }}>
                  <InputText label='' placeholder='Pesquisar' tipo="text" dados={pesquisa} field="nome" setState={setPesquisa} />

                </Grid>
                <Grid item xs={12} sm={3} sx={{ textAlign: { xs: 'right', sm: 'center' }, mb: 5, ml: 2 }}>
                  <IconButton type="button" sx={{ p: '5px' }} aria-label="search" onClick={() => btPesquisar()}>
                    <SearchIcon />
                  </IconButton>

                  <Button variant='contained' onClick={() => btIncluir()}>Incluir</Button>

                </Grid>
              </>
            }

            {localState.acao !== 'pesquisando' &&
              <>
                
                  <Grid item xs={12} sm={12} mt={3}>
                    <InputText label="Nome" tipo="text" dados={usuario} field="nome" setState={setUsuario} disabled={localState.acao === 'excluindo' ? true : false} />
                  </Grid>
                  <Grid item xs={12} sm={12} mt={3}>
                    <InputText label="Token" tipo="text" dados={usuario} field="token" setState={setUsuario} disabled={localState.acao === 'excluindo' ? true : false} />
                  </Grid>
                  <Grid item xs={12} sm={12} mt={3}>
                    <InputText label="Avatar" tipo="text" dados={usuario} field="avatar" setState={setUsuario} disabled={localState.acao === 'excluindo' ? true : false} />
                  </Grid>
                  <Grid item xs={12} sm={12} mt={3} mb={3}>
                    <InputText label="Senha" tipo="text" dados={usuario} field="senha" setState={setUsuario} disabled={localState.acao === 'excluindo' ? true : false} />
                  </Grid>
                
              </>
            }

            {localState.acao === 'incluindo' &&
              <Button variant="contained" onClick={btConfirmarInclusao}>Confirmar Inclusão</Button>
            }

            {localState.acao === 'editando' &&
              <Button variant="contained" onClick={btConfirmarEdicao}>Confirmar Edição</Button>
            }

            {localState.acao === 'excluindo' &&
              <Button variant="contained" onClick={btConfirmarExclusao}>Confirmar Exclusão</Button>
            }

            {localState.acao !== 'pesquisando' &&
              <Button variant="contained" onClick={btCancelar}>Cancelar</Button>
            }

            {
              localState.acao === 'pesquisando' &&
              <TableContainer component={Paper}>
                <Table sx={{ width: '100%', p: 3 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="left">ID</StyledTableCell>
                      <StyledTableCell align="left">NOME</StyledTableCell>
                      <StyledTableCell align="left">TOKEN</StyledTableCell>
                      <StyledTableCell align="left">AVATAR</StyledTableCell>
                      <StyledTableCell align="left">SENHA</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      printTable()
                    }
                  </TableBody>
                </Table>
              </TableContainer>
            }
          </Grid>
        </Paper >
      </Container >
    </>
  );
}
