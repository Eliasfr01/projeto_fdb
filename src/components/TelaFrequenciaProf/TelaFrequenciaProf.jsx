import React from 'react';
import Header from '../header/index.jsx';
import { Paper, Table, TableBody, TableContainer, TableHead, TableRow, Button, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { useParams } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import './Style.css';

function createData(matricula, nome, presente) {
  return {matricula, nome, presente};
}

const rows = [
  createData('537710', 'Carlos Henrique Andrade de Carvalho', true),
  createData('537710', 'Pedro Virginio Maciel Alcantra Mendonça', true),
  createData('537710', 'José Elias Farias Rocha Pinto', false),
];

function FrenquenciaTurma() {
  const {turmaId} = useParams();
  return(
    <div>
      <Header />
      <div style={{padding: '8px 50px 0px' }}>
        <Paper component="form" style={{padding: '2px 4px', display: 'flex', alignItems: 'center', width: 400, margin: '20px 0'}}>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Busque por Participante"
            inputProps={{ 'aria-label': 'busque por participante' }}
          />
          <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell align="center">Matricula</StyledTableCell>
                <StyledTableCell align="center">Nome</StyledTableCell>
                <StyledTableCell align="center">Frequência</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow
                  key={row.nome}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >   
                  <StyledTableCell align="center">{row.matricula}</StyledTableCell>
                  <StyledTableCell align="center">{row.nome}</StyledTableCell>
                  <StyledTableCell align="center">
                    <IconButton>
                      <CheckCircleIcon color="success" />
                    </IconButton>
                    <IconButton>
                      <CancelIcon color="error" />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <StyledButton variant='contained' color='primary' style={{ marginLeft: '8px' }} component={RouterLink} to={`/professor/info-turma/${turmaId}`}>
          Concluir
        </StyledButton>
        <StyledButton variant='contained' color='primary' style={{ marginLeft: '8px' }} component={RouterLink} to={`/professor/info-turma/${turmaId}`}>
          Voltar
        </StyledButton>
      </div>
    </div>
  )
};

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
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default FrenquenciaTurma;
