import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export interface CabecalhoInterface {
  nomeCampo: string
  tituloCampo: string
  alinhamento: 'right' | 'left' | 'center'
}

export interface DataTableInterface {
  dados: Array<{ [key: string]: any }>
  cabecalho: Array<CabecalhoInterface>
  nomeCampoId: string
  onEdit: (id: number) => void
  onDelete: (id: number) => void
}

export default function DataTable({
  dados,
  cabecalho,
  nomeCampoId,
  onDelete,
  onEdit
}: DataTableInterface) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: '100%' }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {cabecalho.map((valor, indice) =>
              <StyledTableCell
                key={indice}
                align={valor.alinhamento}>
                {valor.tituloCampo}
              </StyledTableCell>
            )}
            <StyledTableCell>Ações</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dados.map((registro, indice) => (
            <StyledTableRow key={indice}>
              {cabecalho.map((cabecalho, indice) =>
                <StyledTableCell
                  key={indice}
                  align={cabecalho.alinhamento}>
                  {registro[cabecalho.nomeCampo]}
                </StyledTableCell>
              )}
              <StyledTableCell>
                <IconButton
                  aria-label="edit"
                  onClick={() => onEdit(registro[nomeCampoId])}>
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => onDelete(registro[nomeCampoId])}>
                  <DeleteIcon />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}