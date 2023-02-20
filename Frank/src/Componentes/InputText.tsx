import React from 'react';


import { FormControl, TextField } from '@mui/material';

interface InputTextInterface {
  label: string,
  disabled?: boolean,
  type?: string,
  placeholder?: string,
  dados: { [key: string]: string | number | readonly string[] | undefined | any },
  field: string,
  setState: React.Dispatch<React.SetStateAction<any>>,
  tipo?: 'text' | 'checkbox'
}

export default function InputText(
  { label, dados, field, setState, disabled = false, type = 'text', placeholder, tipo = 'text' }: InputTextInterface) {


  return (
    <>
      <FormControl sx={{ width: '100%' }}>
        <TextField
          size="small"
          sx={{ my: 0, py: 0, height: 40 }}
          id="outlined-name"
          placeholder={placeholder}
          label={label}
          value={dados[field]}
          disabled={disabled}
          onChange={(e: any) => setState({ ...dados, [field]: e.target.value })}
          type={type}
        />
      </FormControl>
    </>
  )
}
