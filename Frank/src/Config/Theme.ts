import { createTheme } from "@mui/material";
import { orange, red } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: orange[200],
    },
    secondary:{
      main: red[500],
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
})

declare module '@mui/material/styles' {


  interface Palette {
    neutral: Palette['primary'];
  }

  interface PaletteOptions {
    neutral: PaletteOptions['primary'];
  }


}
