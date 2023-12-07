import React from 'react';
import Header from '../header/index.jsx';
import { styled } from '@mui/material/styles';
import { Paper, Table, TableBody, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { useParams } from 'react-router-dom';

function createData(codigo, disciplina, prof, periodo, freq, horario) {
  return { codigo, disciplina, prof, periodo, freq, horario };
}

const rows = [
  createData('QXD003', 'Fundamento de Banco de Dados', 'Livia Almada', '5º Semestre', '100%', 'Qua 13:30 - 15:30/Qui 13:30 - 15:30'),
  createData('QXD003', 'Fundamento de Banco de Dados', 'Livia Almada', '5º Semestre', '100%', 'Qua 13:30 - 15:30/Qui 13:30 - 15:30'),
  createData('QXD003', 'Fundamento de Banco de Dados', 'Livia Almada', '5º Semestre', '100%', 'Qua 13:30 - 15:30/Qui 13:30 - 15:30'),
  createData('QXD003', 'Fundamento de Banco de Dados', 'Livia Almada', '5º Semestre', '100%', 'Qua 13:30 - 15:30/Qui 13:30 - 15:30'),
  createData('QXD003', 'Fundamento de Banco de Dados', 'Livia Almada', '5º Semestre', '100%', 'Qua 13:30 - 15:30/Qui 13:30 - 15:30'),
];

function TelaAluno() {
  const {turmaId} = useParams();
  return(
    <div>
      <Header />
      <div style={{padding: '8px 50px 0px' }}>
        <div>
          <h2>Boas Vindas</h2>
          <h1>Aluno(a): José Elias</h1>
        </div>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Código</StyledTableCell>
              <StyledTableCell align="right">Disciplina</StyledTableCell>
              <StyledTableCell align="right">Professor</StyledTableCell>
              <StyledTableCell align="right">Período</StyledTableCell>
              <StyledTableCell align="right">Frequência</StyledTableCell>
              <StyledTableCell align="right">Horário</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.codigo}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">
                  {row.codigo}
                </StyledTableCell>
                <StyledTableCell align="right"  component={RouterLink} to={`/aluno/info-turma/${row.codigo}`}>
                  {row.disciplina}
                </StyledTableCell>
                <StyledTableCell align="right">{row.prof}</StyledTableCell>
                <StyledTableCell align="right">{row.periodo}</StyledTableCell>
                <StyledTableCell align="right">{row.freq}</StyledTableCell>
                <StyledTableCell align="right">{row.horario}</StyledTableCell>
              </TableRow>
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

export default TelaAluno;