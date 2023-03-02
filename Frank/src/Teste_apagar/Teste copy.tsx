import * as React from 'react';

import { NumericFormat, NumericFormatProps } from 'react-number-format';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import MaskedInput from 'react-text-mask';
import { OutlinedInput } from '@mui/material';

//interface CustomProps {
//  onChange: (event: { target: { name: string; value: string } }) => void;
//  name: string;
//}


//const TextMaskCustom = React.forwardRef<any, CustomProps>(
//const TextMaskCustom = React.forwardRef<any>(
function TextMaskCustom() {
    //const { onChange, ...other } = props;
    
    const maskCNPJ = [/[0-9]/,/[0-9]/,'.',/[0-9]/,/[0-9]/,/[0-9]/, '.', /[0-9]/,/[0-9]/,/[0-9]/,'/',/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,'-',/[0-9]/,/[0-9]/]
    return (
      <MaskedInput
        //mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        //mask={[/[0-9]/,/[0-9]/,'.',/[0-9]/,/[0-9]/,/[0-9]/, '.', /[0-9]/,/[0-9]/,/[0-9]/,'/',/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,'-',/[0-9]/,/[0-9]/]}
        mask={maskCNPJ}
        placeholder="CNPJ"
        //guide={false}
        //id="my-input-id"
        //onBlur={() => {}}
        onChange={() => {}}
      />
    );
  }
//)
/*const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        valueIsNumericString
        prefix="R$"
        //suffix='R$'
      />
    );
  },
);*/

interface State {
  textmask: string;
  //numberformat: string;
}

export default function FormattedInputs() {
  const [values, setValues] = React.useState<State>({
    textmask: '(100) 000-0000'
    //numberformat: '1320',
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
          //name="textmask"
          //id="formatted-text-mask-input"
          inputComponent={TextMaskCustom as any}
          //InputProps={{
          //  inputComponent: TextMaskCustom as any,
          //}}
          //variant="standard"

        />
      </FormControl>
      {/*<TextField
        label="react-number-format"
        value={values.numberformat}
        onChange={handleChange}
        name="numberformat"
        id="formatted-numberformat-input"
        InputProps={{
          inputComponent: NumericFormatCustom as any,
        }}
        variant="standard"
    />*/}
    </Box>
  );
}