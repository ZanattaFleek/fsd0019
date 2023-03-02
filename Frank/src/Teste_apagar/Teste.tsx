import * as React from 'react';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MaskedInput from 'react-text-mask';
import { OutlinedInput } from '@mui/material';


function TextMaskCustom() {

  const maskCNPJ = [/[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/]
  return (
    <MaskedInput
      mask={maskCNPJ}
      placeholder="CNPJ"
      onChange={() => { }}
    />
  );
}

interface State {
  textmask: string;
}

export default function FormattedInputs() {
  const [values, setValues] = React.useState<State>({
    textmask: '(100) 000-0000'
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Box
      sx={{
        '& > :not(style)': {
          m: 1,
        },
      }}
    >
      <FormControl variant="standard">
        <InputLabel htmlFor="formatted-text-mask-input">react-imask</InputLabel>
        <OutlinedInput
          value={values.textmask}
          onChange={handleChange}
          inputComponent={TextMaskCustom as any}
        />
      </FormControl>
    </Box>
  );
}