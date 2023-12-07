import React from 'react';
import Header from '../header/index.jsx';
import { Button, Paper, Table, TableBody, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
function createData(matricula, nome, curso, email) {
  return { matricula, nome, curso, email };
}

const rows = [
  createData(537710, 'Carlos Henrique Andrade de Carvalho', 'Ciência da Computação', 'chenriqueac00@gmail.com'),
  createData(537710, 'Pedro Virginio Maciel Alcantra Mendonça', 'Sistema de Informação', 'pedrovirginio01@gmail.com'),
  createData(496543, 'José Elias Farias Rocha', 'Ciência da Computação', 'eliasfarias624@gmail.com'),
];

function TelaInfoTurma() {
  return(
    <div>
      <Header />
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Rubik&display=swap');
      </style>
      <div style={{padding: '8px 50px 0px' }}>
        <div>
          <h2>Fundamento de Banco de Dados</h2>
          <h1>Discente: Elias</h1>
        </div>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Participantes</StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  variant='filled'
                  label='Buscar por participantes'
                  style={{ backgroundColor: 'white' }}
                  size='small'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow
                key={row.matricula}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">
                  {row.matricula}
                </StyledTableCell>
                <StyledTableCell align="center">{row.nome}</StyledTableCell>
                <StyledTableCell align="center">{row.curso}</StyledTableCell>
                <StyledTableCell align="center">{row.email}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        </TableContainer>
      </div>
      <StyledButton variant='contained' color='primary'>Notas</StyledButton>
      <StyledButton variant='contained' color='primary'>Frequência</StyledButton>
    </div>
  )
};

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: '20px',
  marginLeft: '50px',
}))

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1976d2",
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

export default TelaInfoTurma;