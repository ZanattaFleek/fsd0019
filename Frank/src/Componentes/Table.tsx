import * as React from 'react';
import { tableCellClasses, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Condicional from '../Layout/Condicional'
import { styled } from '@mui/material/styles'
import { useState } from 'react';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    padding: 10,
    backgroundColor: theme.palette.primary.main,
    fontSize: 15,
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


export interface DataTableCabecalhoInterface {
  campo: string
  cabecalho: string
  alinhamento?: 'left' | 'right' | 'center'
  largura?: number
  format?: (arg?: any) => void
}


export interface DataTableInterface {
  dados: Array<{ [key: string]: any }>
  cabecalho: Array<DataTableCabecalhoInterface>
  onEditar?: (arg?: any) => void
  onExcluir?: (arg?: any) => void
}

export default function CreateTable({
  dados = [],
  cabecalho = [],
  onEditar,
  onExcluir
}: DataTableInterface) {

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <>
      <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
        <Table  size='small' stickyHeader>
          <TableHead>
            <StyledTableRow>
              {cabecalho.map((coluna, indice) => (
                <StyledTableCell
                  key={indice}
                  style={{ minWidth: coluna.largura }}
                  
                >

                  {coluna.cabecalho}

                </StyledTableCell>
              ))}

              <Condicional condicao={typeof onEditar == 'function' || typeof onExcluir == 'function'}>

                <StyledTableCell>
                  Ações
                </StyledTableCell>

              </Condicional>
            </StyledTableRow>
          </TableHead>

          <TableBody>
            {dados
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, i) => {

                return (

                  <StyledTableRow
                    key={i}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    {cabecalho.map((coluna, indice) => {

                      return (
                        <StyledTableCell key={indice} align={coluna.alinhamento ? coluna.alinhamento : 'left'}>

                          {coluna.format ? coluna.format((row as any)[coluna.campo]) : (row as any)[coluna.campo]}
                        </StyledTableCell>
                      )
                    })
                    }
                    <Condicional condicao={typeof onEditar == 'function' || typeof onExcluir == 'function'}>
                      <StyledTableCell>
                        <Stack direction="row" spacing={1}>
                          <Condicional condicao={typeof onExcluir == 'function'}>
                            <IconButton onClick={() => (onExcluir as any)(row)} sx={{ mx: 0, px: 0 }}>
                              <DeleteIcon></DeleteIcon>
                            </IconButton>
                          </Condicional>
                          <Condicional condicao={typeof onEditar == 'function'}>
                            <IconButton onClick={() => (onEditar as any)(row)} sx={{ mx: 0, px: 0 }}>
                              <EditIcon></EditIcon>
                            </IconButton>
                          </Condicional>
                        </Stack>
                      </StyledTableCell>
                    </Condicional>
                  </StyledTableRow>
                )
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        labelRowsPerPage="Qtd: "
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={dados.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}