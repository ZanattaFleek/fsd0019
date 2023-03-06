import { useContext, useState } from 'react';
import { ContextoGlobal, ContextoGlobalInterface } from '../../Contextos/ContextoGlobal';
import { EscolaInterface } from '../../Interfaces/EscolaInterfaces';
import { URL_SERVIDOR } from '../../Config/Setup';
import InputText from '../../Componentes/InputText';
import ClsEscola from './ClsEscola';
import Button from '@mui/material/Button';
import { Box, Checkbox, FormControl, FormControlLabel, FormLabel, Grid, IconButton, InputLabel, MenuItem, Paper, Radio, RadioGroup, Rating, Select, SelectChangeEvent, Switch, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import CheckIcon from '@mui/icons-material/Check';
import CreateTable, { DataTableCabecalhoInterface } from '../../Componentes/Table';
import Condicional from '../../Layout/Condicional';
import { MensagemStatePadrao, MensagemTipo } from '../../GlobalStates/MensagemState';


const TEMPO_REFRESH_TEMPORARIO = 500

interface PesquisaInterface {
  nome: string
}

export enum StatusForm {
  Incluindo,
  Excluindo,
  Pesquisando,
  Editando
}

export default function Escola() {


  const [statusForm, setStatusForm] = useState<StatusForm>(StatusForm.Pesquisando)
  const { mensagemState, setMensagemState } = (useContext(ContextoGlobal) as ContextoGlobalInterface)


  const TituloForm = {
    [StatusForm.Incluindo]: 'Inclusão de uma nova Escola.',
    [StatusForm.Excluindo]: 'Exclusão de uma Escola desativada.',
    [StatusForm.Pesquisando]: 'Academia de agility - Escola de treinamento e adastramento de cães.',
    [StatusForm.Editando]: 'Alteração de Dados da Escola.'
  }

  const Cabecalho: Array<DataTableCabecalhoInterface> = [
    {
      campo: 'idEscola',
      cabecalho: 'ID',
      alinhamento: 'left'
    },
    {
      campo: 'nome',
      cabecalho: 'Escola',
      alinhamento: 'left'
    },
    {
      campo: 'cnpj',
      cabecalho: 'CNPJ',
      alinhamento: 'left'
    },
    {
      campo: 'ativo',
      cabecalho: 'Ativo',
      alinhamento: 'left',
      format: (v: boolean) => { return v ? 'Sim' : 'Não' }
    },

  ]

  const [rsPesquisa, setRsPesquisa] = useState<Array<EscolaInterface>>([])

  const globalContext = (useContext(ContextoGlobal) as ContextoGlobalInterface)

  const ZeraDados: EscolaInterface = {
    cnpj: '',
    email: '',
    idEscola: 0,
    nome: '',
    ativo: false,
    tipo: '',
    federacao: '',
    veterinario: false,
    qualidade: 2
  }
  const [escola, setEscola] = useState<EscolaInterface>(ZeraDados)

  const [pesquisa, setPesquisa] = useState<PesquisaInterface>({ nome: '' })

  const federacoes = [
    'Federação Brasileira',
    'Federação Carioca',
    'Federação Mineira',
    'Federação Paulista'
  ]

  const labels: { [index: string]: string } = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
  };

  const getLabelText = (value: number) => {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
  }

  const [hover, setHover] = React.useState(-1);

  const handleChangeFederacao = (event: SelectChangeEvent) => {
    setEscola({ ...escola, federacao: event.target.value as string });
  };

  const handleChangeVeterinario = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEscola({ ...escola, veterinario: event.target.checked });
  };

  const handleChangeAtivo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEscola({ ...escola, ativo: event.target.checked });
  };

  const handleChangeTipo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEscola({ ...escola, tipo: (event.target as HTMLInputElement).value });
  };
  const validarDados = (): boolean => {
    let retorno: boolean = false

    if (escola.nome &&
      escola.cnpj &&
      escola.email) {
      retorno = true
    }

    return retorno
  }

  const btEditar = (arg: any, acao: StatusForm) => {

    let clsEscola: ClsEscola = new ClsEscola()
    clsEscola.btEditar<EscolaInterface>(
      globalContext,
      arg.idEscola,
      setEscola,
      setStatusForm,
      acao
    )

  }

  const btIncluir = () => {
    setEscola(ZeraDados)
    setStatusForm(StatusForm.Incluindo)
  }

  const btCancelar = () => {
    setEscola(ZeraDados)
    setStatusForm(StatusForm.Pesquisando)
    btPesquisar()
  }

  const btConfirmarExclusao = () => {

    setTimeout(() => {

      fetch(URL_SERVIDOR.concat('/escola/'.concat(escola.idEscola.toString())), {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'DELETE'
      }).then(rs => {

        if (rs.ok) {
          setMensagemState({
            ...mensagemState,
            titulo: 'Confirmado!',
            exibir: true,
            mensagem: 'Escola Excluída com Sucesso!',
            tipo: MensagemTipo.Sucesso,
            exibirBotao: true
          })


        } else {

          setMensagemState({
            ...mensagemState,
            titulo: 'Erro ao excluir',
            exibir: true,
            mensagem: 'Erro ao excluir!',
            tipo: MensagemTipo.Error,
            exibirBotao: true
          })
        }

      }).catch(() => {
        setMensagemState({
          ...mensagemState,
          titulo: 'Erro! Consulte Suporte!',
          exibir: true,
          mensagem: 'Erro ao Consultar Escola!',
          tipo: MensagemTipo.Error,
          exibirBotao: true
        })

      })
      
    }, TEMPO_REFRESH_TEMPORARIO)

  }

  const btConfirmarEdicao = () => {

    setTimeout(() => {
      fetch(URL_SERVIDOR.concat('/escola/'.concat(escola.idEscola.toString())), {
        body: JSON.stringify(escola),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT'

      }).then(rs => {
        if (rs.ok) {

          setMensagemState({
            ...mensagemState,
            titulo: 'Confirmado!',
            exibir: true,
            mensagem: statusForm === StatusForm.Incluindo ? 'Escola Cadastrada com Sucesso!' : 'Dados Alterados!',
            tipo: MensagemTipo.Sucesso,
            exibirBotao: true
          })


        } else {
          setMensagemState({
            ...mensagemState,
            exibir: true,
            mensagem: 'Escola Não Atualizado!',
            tipo: MensagemTipo.Error,
            exibirBotao: true
          })
        }

      }).catch(() => {
        setMensagemState({
          ...mensagemState,
          titulo: 'Erro! Consulte Suporte!',
          exibir: true,
          mensagem: 'Erro ao Consultar Escola!',
          tipo: MensagemTipo.Error,
          exibirBotao: true
        })
      })
    }, TEMPO_REFRESH_TEMPORARIO)
  }

  const btConfirmarInclusao = () => {

    if (validarDados()) {
      setTimeout(() => {
        fetch(URL_SERVIDOR.concat('/escola'), {
          body: JSON.stringify(escola),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST'
        }).then(rs => {
          if (rs.status === 201) {

            setEscola(ZeraDados)
            setMensagemState({
              ...mensagemState,
              titulo: 'Confirmado!',
              exibir: true,
              mensagem: statusForm === StatusForm.Incluindo ? 'Escola Cadastrada com Sucesso!' : 'Dados Alterados!',
              tipo: MensagemTipo.Sucesso,
              exibirBotao: true
            })

          } else {
            setMensagemState({
              ...mensagemState,
              exibir: true,
              mensagem: 'Escola Não Cadastrada!',
              tipo: MensagemTipo.Error,
              exibirBotao: true
            })
          }
        }).catch(() => {
          setMensagemState({
            ...mensagemState,
            titulo: 'Erro! Consulte Suporte!',
            exibir: true,
            mensagem: 'Erro ao Consultar Escola!',
            tipo: MensagemTipo.Error,
            exibirBotao: true
          })
        })
      }, TEMPO_REFRESH_TEMPORARIO)

    } else {
      setMensagemState({
        ...mensagemState,
        titulo: 'Dados Obrigatórios!',
        exibir: true,
        mensagem: 'Alguns dados são obrigatórios!! Preencha os campos.',
        tipo: MensagemTipo.Warning,
        exibirBotao: true
      })
    }
  }

  const btPesquisar = () => {
    setMensagemState({
      ...mensagemState,
      titulo: 'Pesquisando!',
      exibir: true,
      mensagem: 'Pesquisando informações no bando de dados.',
      tipo: MensagemTipo.Loading,
      exibirBotao: false
    })
    setTimeout(() => {

      fetch(URL_SERVIDOR.concat('/escola?nome_like='.concat(pesquisa.nome)), {
        // body: JSON.stringify(escola),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'GET'
      }).then(rs => {

        // Primeiro Then do Fetch - Testo Status + Tratamento dos dados

        if (rs.status === 200) {
          setMensagemState(MensagemStatePadrao)

          // Envio somente os dados para o próximo Then....
          return rs.json()

        } else {
          setMensagemState(MensagemStatePadrao)
        }
      }).then(rsEscolas => {

        setRsPesquisa(rsEscolas)

      }).catch(() => {
        setMensagemState({
          ...mensagemState,
          titulo: 'Erro! Consulte Suporte!',
          exibir: true,
          mensagem: 'Erro ao Consultar Produtos!',
          tipo: MensagemTipo.Error,
          exibirBotao: true
        })
      })

    }, TEMPO_REFRESH_TEMPORARIO)

  }
  const irpara = useNavigate()

  const btFechar = () => {
    irpara('/')
  }

  return (
    <>
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Paper variant="outlined" sx={{ padding: 2 }}>

          <Grid container sx={{ display: 'flex', alignItems: 'center' }}>

            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography component="h5" variant="h5" align="left">
                Cadastro de Escola
                <Typography variant="body2" gutterBottom>
                  {TituloForm[statusForm]}
                </Typography>
              </Typography>

              <IconButton onClick={() => btFechar()}>
                <CloseIcon />
              </IconButton>
            </Grid>

            <Condicional condicao={statusForm === StatusForm.Pesquisando}>

              <Grid item xs={7} sm={10} sx={{ mb: 5 }}>
                <InputText
                  label='Pesquisar'
                  tipo="text"
                  dados={pesquisa}
                  field="nome"
                  setState={setPesquisa}
                  iconeEnd='search'
                  onClickIconeEnd={() => btPesquisar()}
                  teclaPress={[{ key: 'Enter', onKey: btPesquisar }]}

                />

              </Grid>
              <Grid item xs={5} sm={2} sx={{ textAlign: { xs: 'right', sm: 'center' }, mb: 5 }}>
                {/*<IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={() => btPesquisar()}>
                  <SearchIcon />
                  </IconButton>*/}

                <Button variant='contained' onClick={() => btIncluir()}>Incluir</Button>

              </Grid>
            </Condicional>

            <Condicional condicao={statusForm !== StatusForm.Pesquisando}>
              <Grid item xs={12} sm={10} mt={3}>
                <InputText
                  autofoco
                  label="Nome"
                  tipo="txt"
                  dados={escola}
                  field="nome"
                  setState={setEscola}
                  disabled={statusForm === StatusForm.Excluindo}
                />
              </Grid>
              <Grid item xs={12} sm={2} mt={3} sx={{ pl: { sm: 2 } }}>
                <FormControlLabel
                  value="ativo"
                  control={
                    <Checkbox
                      disabled={statusForm === StatusForm.Excluindo}
                      checked={escola.ativo}
                      onChange={handleChangeAtivo}
                      inputProps={{ 'aria-label': 'controlled' }}

                    />}
                  label="Ativo"
                  labelPlacement="top"
                />
              </Grid>
              <Grid item xs={12} sm={8} mt={1}>
                <InputText label="CNPJ" tipo="cnpj" dados={escola} field="cnpj" setState={setEscola} disabled={statusForm === StatusForm.Excluindo} />
              </Grid>

              <Grid item xs={12} sm={2} mt={2} ml={1} sx={{ pl: { sm: 2 } }} borderRadius={3} border={1} borderColor={'lightgray'}>
                <FormControl>
                  <FormLabel id="demo-controlled-radio-buttons-group">Tipo</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={escola.tipo}
                    onChange={handleChangeTipo}
                  >
                    <FormControlLabel value="oficial" control={<Radio />} label="Oficial" disabled={statusForm === StatusForm.Excluindo} />
                    <FormControlLabel value="match" control={<Radio />} label="Match" disabled={statusForm === StatusForm.Excluindo} />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={8} mt={3} mr={1}>
                <InputText label="e-mail" tipo="email" dados={escola} field="email" setState={setEscola} disabled={statusForm === StatusForm.Excluindo} />
              </Grid>
              <Grid item xs={12} sm={3} mt={3}>
                <Box>
                  <FormControl fullWidth>
                    <InputLabel sx={{ mt: -1 }}>Federação</InputLabel>
                    <Select
                      size='small'
                      value={escola.federacao}
                      label="Federação"
                      onChange={handleChangeFederacao}
                      disabled={statusForm === StatusForm.Excluindo}
                    >
                      {federacoes.map((federacao, i) => (
                        <MenuItem key={i} value={i}>{federacao}</MenuItem>
                      ))}

                    </Select>

                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12} sm={8} mt={3} >

                <Box
                  sx={{
                    width: 200,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Rating
                    disabled={statusForm === StatusForm.Excluindo}
                    name="hover-feedback"
                    value={escola.qualidade}
                    precision={0.5}
                    getLabelText={getLabelText}
                    onChange={(event, newValue) => {
                      setEscola({ ...escola, qualidade: newValue });
                    }}
                    onChangeActive={(event, newHover) => {
                      setHover(newHover);
                    }}
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                  />
                  {escola.qualidade !== null && (
                    <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : escola.qualidade]}</Box>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} sm={2} mt={3} mb={3}>

                <FormControlLabel control={
                  <Switch
                    disabled={statusForm === StatusForm.Excluindo}
                    checked={escola.veterinario}
                    onChange={handleChangeVeterinario}
                  />}
                  label="Tem Veterinário?" />
              </Grid>
            </Condicional>

            <Condicional condicao={statusForm === StatusForm.Incluindo}>
              <Button sx={{ mr: 2 }} startIcon={<CheckIcon />} variant="contained" onClick={btConfirmarInclusao}>Confirmar</Button>
            </Condicional>

            <Condicional condicao={statusForm === StatusForm.Editando}>
              <Button sx={{ mr: 2 }} startIcon={<CheckIcon />} variant="contained" onClick={btConfirmarEdicao}>Confirmar</Button>
            </Condicional>

            <Condicional condicao={statusForm === StatusForm.Excluindo}>
              <Button sx={{ mr: 2 }} startIcon={<CheckIcon />} variant="contained" onClick={btConfirmarExclusao}>Confirmar</Button>
            </Condicional>

            <Condicional condicao={statusForm !== StatusForm.Pesquisando}>
              <Button startIcon={<CloseIcon />} variant="contained" onClick={btCancelar}>Cancelar</Button>
            </Condicional>

            <Condicional condicao={statusForm === StatusForm.Pesquisando}>

              <Grid item xs={12} sx={{ mt: 3 }}>
                <CreateTable
                  dados={rsPesquisa}
                  cabecalho={Cabecalho}
                  onEditar={(arg) => btEditar(arg, StatusForm.Editando)}
                  onExcluir={(arg) => btEditar(arg, StatusForm.Excluindo)} />
              </Grid>

            </Condicional>
          </Grid>
        </Paper >
      </Container >
    </>
  );
}
