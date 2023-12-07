import React from 'react';
import Header from '../header/index.jsx';
import { Paper, Table, TableBody, TableContainer, TableHead, TableRow, Button} from '@mui/material';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { useParams } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import './Style.css';
function createData(matricula, nome, ap1, ap2, media) {
  return {matricula, nome, ap1, ap2, media};
}

const rows = [
  createData(537710, 'Carlos Henrique Andrade de Carvalho', '0.0', '0.0', '0.0'),
  createData(537710, 'Pedro Virginio Maciel Alcantra Mendonça', '0.0', '0.0', '0.0'),
  createData(496543, 'José Elias Farias Rocha', '0.0', '0.0', '0.0'),
];

function TelaProfessor() {
  const {turmaId} = useParams();
  return(
    <div>
      <Header />
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Rubik&display=swap');
      </style>
      <div style={{padding: '8px 50px 0px' }}>
        
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="center">matricula</StyledTableCell>
              <StyledTableCell align="center">nome</StyledTableCell>
              <StyledTableCell align="center">ap1</StyledTableCell>
              <StyledTableCell align="center">ap2</StyledTableCell>
              <StyledTableCell align="center">média</StyledTableCell>
              <StyledTableCell align="center">ação</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow
                key={row.codigo}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >   
                <StyledTableCell align="center">{row.matricula}</StyledTableCell>
                <StyledTableCell align="center">{row.nome}</StyledTableCell>
                <StyledTableCell align="center">{row.ap1}</StyledTableCell>
                <StyledTableCell align="center">{row.ap2}</StyledTableCell>
                <StyledTableCell align="center">{row.media}</StyledTableCell>
                <StyledTableCell align="center">
                  <StyledButton variant='contained' color='primary'>Editar</StyledButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        </TableContainer>
        <StyledButton variant='contained' color='primary' component={RouterLink} to={`/professor/info-turma/${turmaId}`}>
          Voltar
        </StyledButton>

      </div>
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

export default TelaProfessor;