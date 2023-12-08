import React from 'react';
import Header from '../header/index.jsx';
import { Paper, Table, TableBody, TableContainer, TableHead, TableRow, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { useParams } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import './Style.css';
// Suponha que este seja o formato de seus dados de notas
function createData(ap1, ap2, media) {
  return { ap1, ap2, media };
}

const rows = [
  createData(5.5, 7.0, 6.25),
  // ... outros dados de notas
];

function MinhasNotas() {
  const {turmaId} = useParams();
  return(
    <div>
      <Header />
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Rubik&display=swap');
      </style>
      <div style={{padding: '8px 50px 0px', fontFamily: 'Rubik'}}>
        <Typography variant="h5" component="h2" style={{marginBottom: '20px', fontFamily: 'Rubik'}}>
          Fundamento de Banco de Dados
        </Typography>
        <Typography variant="h4" component="h1" style={{fontFamily: 'Rubik', marginTop: '-25px'}}>
          Discente: Elias
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Ap1</StyledTableCell>
                <StyledTableCell>Ap2</StyledTableCell>
                <StyledTableCell>Média</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell>{row.ap1}</StyledTableCell>
                  <StyledTableCell>{row.ap2}</StyledTableCell>
                  <StyledTableCell>{row.media}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <StyledButton variant='contained' color='primary' style={{ marginLeft: '8px' }} component={RouterLink} to={`/aluno/info-turma/${turmaId}`}>
          Voltar
        </StyledButton>
      </div>
    </div>
  )
};

// Estilos podem ser reutilizados ou adaptados da TelaAluno
const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: '20px',
}))

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
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

export default MinhasNotas;
