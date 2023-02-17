/*

xs, extra-small: 0px
sm, small: 600px
md, medium: 900px
lg, large: 1200px
xl, extra-large: 1536px

*/

import React from 'react'

//import Box from '@mui/material/Box';
//import Button from '@mui/material/Button';

import { Box, Button, createTheme, Select, TextField, ThemeProvider } from '@mui/material'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'

const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  backgroundColor: 'black',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  // color: theme.palette.text.secondary
  color: 'white'
}));

export default function Aula() {

  const tema = createTheme({
    palette: {
      primary: {
        main: '#ff00aa',
      },
      secondary: {
        main: '#aa00ff',
      },
    },

  });

  return (
    <>
      <ThemeProvider theme={tema}>
        <Paper sx={{
          p: 2,
          margin: 'auto',
          maxWidth: 600,
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        }}>
          <Grid
            container
            spacing={1}
          >
            <Grid item xs={12}>
              <TextField size='small' sx={{ width: '100%' }} label="Nome" />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField size='small' sx={{ width: '100%' }} label="Cep" />
            </Grid>
            <Grid item xs={12} md={9}>
              <TextField size='small' sx={{ width: '100%' }} label="Endereço Completo" />
            </Grid>
            <Grid item xs={12} md={5}>
              <TextField size='small' sx={{ width: '100%' }} label="Bairro" />
            </Grid>
            <Grid item xs={10} md={5}>
              <TextField size='small' sx={{ width: '100%' }} label="Cidade" />
            </Grid>
            <Grid item xs={2}>
              <TextField size='small' sx={{ width: '100%' }} label="UF" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField size='small' sx={{ width: '100%' }} label="Telefone" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField size='small' sx={{ width: '100%' }} label="Data Nascimento" />
            </Grid>

          </Grid>

        </Paper>
      </ThemeProvider>
    </>
  )
}