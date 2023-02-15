import { createTheme } from "@mui/material";
import { green, red } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: green[200],
    },
    secondary:{
      main: red[500],
    },
  },
})