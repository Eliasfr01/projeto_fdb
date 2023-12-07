import React from 'react';
import Header from '../header/index.jsx';
import { Paper, Table, TableBody, TableContainer, TableHead, TableRow, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import './Style.css';
function createData(codigo, disciplina, periodo, horario) {
  return { codigo, disciplina, periodo, horario };
}

const rows = [
  createData('QXD003', 'Fundamento de Banco de Dados', '5º Semestre', 'Qua 13:30 - 15:30/Qui 13:30 - 15:30'),
  createData('QXD003', 'Fundamento de Banco de Dados', '5º Semestre', 'Qua 13:30 - 15:30/Qui 13:30 - 15:30'),
  createData('QXD003', 'Fundamento de Banco de Dados', '5º Semestre', 'Qua 13:30 - 15:30/Qui 13:30 - 15:30'),
  createData('QXD003', 'Fundamento de Banco de Dados', '5º Semestre', 'Qua 13:30 - 15:30/Qui 13:30 - 15:30'),
  createData('QXD003', 'Fundamento de Banco de Dados', '5º Semestre', 'Qua 13:30 - 15:30/Qui 13:30 - 15:30'),
];

function TelaProfessor() {

  const professorNome = localStorage.getItem('professorNome');

  return(
    <div>
      <Header />
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Rubik&display=swap');
      </style>
      <div style={{padding: '8px 50px 0px' }}>
        <div>
          <h2>Boas Vindas</h2>
          <h1>Prof.(a): {professorNome}</h1>
        </div>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Código</StyledTableCell>
              <StyledTableCell align="center">Disciplina</StyledTableCell>
              <StyledTableCell align="center">Período</StyledTableCell>
              <StyledTableCell align="center">Horário</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow
                key={row.codigo}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">
                  {row.codigo}
                </StyledTableCell>
                <StyledTableCell align="center" >
                  <Link component={RouterLink} to={`/professor/info-turma/${row.codigo}`}>{row.disciplina}</Link>
                </StyledTableCell>
                <StyledTableCell align="center">{row.periodo}</StyledTableCell>
                <StyledTableCell align="center">{row.horario}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        </TableContainer>
      </div>
    </div>
  )
};

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

export default TelaProfessor;