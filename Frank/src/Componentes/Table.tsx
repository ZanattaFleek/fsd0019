import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
    idEscola: number,
    nome: string,
    cnpj: string,
    email: string,
    onEditar?: (arg?: any) => void,
    onExcluir?: (arg?: any) => void
) {
  return {
    idEscola,
    nome,
    cnpj,
    email,
    onEditar,
    onExcluir
  };
}

const rows = [
  createData(1,'Cupcake', '20278531000158', 'cupcake@gmail.com',),
  createData(2,'Brigadeiro', '20278531000158', 'cupcake@gmail.com'),
  createData(3,'Pe de moleque', '20278531000158', 'cupcake@gmail.com'),
  createData(4,'Cocada', '20278531000158', 'cupcake@gmail.com')
  

];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="left">NOME</TableCell>
            <TableCell align="left">CNPJ</TableCell>
            <TableCell align="left">E-MAIL</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.idEscola}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.idEscola}
              </TableCell>
              <TableCell align="left">{row.nome}</TableCell>
              <TableCell align="left">{row.cnpj}</TableCell>
              <TableCell align="left">{row.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}