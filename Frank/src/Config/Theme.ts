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
  },
})