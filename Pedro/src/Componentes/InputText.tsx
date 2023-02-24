import React, { useRef } from 'react';

import TextField from '@mui/material/TextField'

interface InputTextInterface {
  label: string,
  type: string,
  disabled?: boolean,
  dados: { [key: string]: string | number | readonly string[] | undefined | any },
  field: string,
  setState: React.Dispatch<React.SetStateAction<any>>
}

export default function InputText<T>(
  { label, type, dados, field, setState, disabled = false }: InputTextInterface) {

  return (
    <>
      { /*
      <label>{label}</label>
    */}

      <TextField
        id="outlined-name"
        label={label}
        value={dados[field]}
        onChange={(e: any) => setState({ ...dados, [field]: e.target.value })}
      />

      { /*
      <input type={type} value={dados[field]}
      disabled={disabled}
      onChange={(e) => setState({ ...dados, [field]: e.target.value })}
      />
  */}
    </>
  )
}
