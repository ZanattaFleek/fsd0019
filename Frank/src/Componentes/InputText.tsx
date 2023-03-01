import React, { useState } from 'react';
import { FormControl, Icon, IconButton, InputAdornment, InputLabel, Typography } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import ClsValidaCampo from '../Utils/ClsValidaCampos';
import Condicional from '../Layout/Condicional';
import MaskedInput from 'react-text-mask';

const maskCNPJ = [/[0-9]/,/[0-9]/,'.',/[0-9]/,/[0-9]/,/[0-9]/, '.', /[0-9]/,/[0-9]/,/[0-9]/,'/',/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,'-',/[0-9]/,/[0-9]/]
const maskCPF = [/[0-9]/,/[0-9]/,/[0-9]/,'.',/[0-9]/,/[0-9]/,/[0-9]/, '.', /[0-9]/,/[0-9]/,/[0-9]/,'-',/[0-9]/,/[0-9]/]
const maskCEP = [/[0-9]/,/[0-9]/,'.',/[0-9]/,/[0-9]/,/[0-9]/, '-',/[0-9]/,/[0-9]/,/[0-9]/]
const maskTEL = ['(',/[0-9]/,/[0-9]/, ')', ' ',/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/, '-',/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/]

function TextMaskCustom() {
 
  return (
    <MaskedInput
      mask={maskCNPJ}
      onChange={() => {}}
    />
  );
}
interface TeclaPressInterface {
  key: string
  onKey: () => void
}

interface InputTextInterface {
  autofoco?: boolean,
  label: string,
  disabled?: boolean,
  type?: string,
  placeholder?: string,
  dados: { [key: string]: string | number | readonly string[] | undefined | any },
  field: string,
  setState: React.Dispatch<React.SetStateAction<any>>,
  tipo?: string,
  teclaPress?: Array<TeclaPressInterface>,
  iconeStart?: string,
  iconeEnd?: string,
  onClickIconeStart?: () => void,
  onClickIconeEnd?: () => void
}

export default function InputText(this: any,
  { autofoco = false,
    label, dados,
    field,
    setState,
    disabled = false,
    type = 'text',
    placeholder,
    tipo = 'txt',
    teclaPress = [],
    iconeStart = '',
    onClickIconeStart = () => { },
    iconeEnd = '',
    onClickIconeEnd = () => { }


  }: InputTextInterface) {

  const onKey = (key: string) => {
    if (teclaPress.length > 0) {
      let encontrou: boolean = false
      for (let contador: number = 0; contador < teclaPress.length && !encontrou; contador++) {
        if (teclaPress[contador].key === key) {
          encontrou = true
          teclaPress[contador].onKey()
        }
      }
    }
  }

  /*const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (autofoco && inputRef.current) {
      inputRef.current.focus()
    }
  }, [autofoco])*/

  const validaCampo: ClsValidaCampo = new ClsValidaCampo()

  const [validacao, setValidacao] = useState('')

  const testaCEP = (_CEP: string) => {

    validaCampo.verificaCEP(_CEP).then(temCEP => {
      if (temCEP) {

        setValidacao('')

      } else {
        setValidacao('CEP Inválido!')
      }
    })
  }

  const validarNaoVazio = (evento: any) => {

    let vr: any = evento.target.value

    if (tipo === 'txt' && validaCampo.campoVazio(vr)) {
      setValidacao("Campo não pode ser vázio!")
    } else if (tipo === 'cpf' && !validaCampo.eCPF(vr)) {
      setValidacao("CPF Inválido!")
    } else if (tipo === 'cnpj' && !validaCampo.eCNPJ(vr)) {
      setValidacao("CNPJ Inválido!")
    } else if (tipo === 'uf' && !validaCampo.eUF(vr)) {
      setValidacao("UF Inválido!")
    } else if (tipo === 'sexo' && !validaCampo.eSEXO(vr)) {
      setValidacao('SEXO inválido!')
    } else if (tipo === 'tel' && !validaCampo.eTEL(vr)) {
      setValidacao('Formato correto do tel é (xx) xxxxx-xxxx')
    } else if (tipo === 'cep') {
      testaCEP(vr)
    } else if (tipo === 'email' && !validaCampo.eEMAIL(vr)) {
      setValidacao('E-mail com formato inválido!')
    } else {
      setValidacao("")
    }
  }

  const exibirIcone = (posicao: 'start' | 'end', icone: string, onclick: () => void) => {
    if (icone.length > 0) {
      return (
        <InputAdornment position={posicao} sx={{ margin: 0, padding: 0 }}>
          <IconButton sx={{ margin: 0, padding: 0 }} onClick={() => {
            if (onclick) {
              onclick()
            }
          }}>
            <Icon sx={{ margin: 0, padding: 0 }}>{icone}</Icon>
          </IconButton>
        </InputAdornment>
      )
    }
  }

  return (
    <>
      <FormControl sx={{ width: '100%' }} variant="outlined">
        <InputLabel sx={{ mt: -1 }} htmlFor="outlined-adornment-password">{label}</InputLabel>
        <OutlinedInput
          autoFocus={autofoco}
          size="small"
          sx={{ my: 0, py: 0, height: 40 }}
          id="outlined-name"
          placeholder={placeholder}
          label={label}
          value={dados[field]}
          disabled={disabled}
          onChange={(e: any) => setState({ ...dados, [field]: e.target.value })}
          type={type}
          onKeyDown={(e) => onKey(e.key)}
          endAdornment={exibirIcone('end', iconeEnd, onClickIconeEnd)}
          startAdornment={exibirIcone('start', iconeStart, onClickIconeStart)}
          onBlur={validarNaoVazio}
          inputComponent={TextMaskCustom as any}


        />

        <Condicional condicao={validacao.length !== 0}>
          <Typography variant='caption' textAlign='left' color='warning.main' >{validacao}</Typography>
        </Condicional>
      </FormControl>
    </>
  )
}
