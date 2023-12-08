import React, { useState } from 'react';
import { Paper, Table, TableBody, TableContainer, TableHead, TableRow, Button, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Header from '../header/index.jsx';
import { styled } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import './Style.css';

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

function TelaProfessor() {
  const { turmaId } = useParams();
  const [aps, setAps] = useState(['Ap1']); // Inicialmente, apenas Ap1 é exibido

  const handleAddAp = () => {
    const nextApNum = aps.length + 1;
    setAps([...aps, `Ap${nextApNum}`]);
  };

  // Função para criar dados da linha da tabela
  function createData(matricula, nome, notas) {
    return {
      matricula, 
      nome, 
      notas, // notas é um array que contém as notas das APs
      media: notas.reduce((acc, nota) => acc + parseFloat(nota), 0) / notas.length // Calcula a média
    };
  }

  // Inicializando os dados das linhas
  const rows = [
    createData(537710, 'Carlos Henrique Andrade de Carvalho', Array(aps.length).fill('0.0')),
    createData(537710, 'Pedro Virginio Maciel Alcantra Mendonça', Array(aps.length).fill('0.0')),
    createData(496543, 'José Elias Farias Rocha', Array(aps.length).fill('0.0')),
  ];

  return (
    <div>
      <Header />
      <div style={{ padding: '8px 50px 0px' }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell align="center">Matrícula</StyledTableCell>
                <StyledTableCell align="center">Aluno</StyledTableCell>
                {aps.map((ap, index) => (
                  <StyledTableCell key={index} align="center">
                    {ap}
                    {index === aps.length - 1 && ( // Adicionar botão apenas na última AP
                      <IconButton onClick={handleAddAp}>
                        <AddCircleOutlineIcon />
                      </IconButton>
                    )}
                  </StyledTableCell>
                ))}
                <StyledTableCell align="center">Média</StyledTableCell>
                <StyledTableCell align="center">Ação</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, rowIndex) => (
                <StyledTableRow key={rowIndex}>
                  <StyledTableCell align="center">{row.matricula}</StyledTableCell>
                  <StyledTableCell align="center">{row.nome}</StyledTableCell>
                  {row.notas.map((nota, notaIndex) => (
                    <StyledTableCell key={notaIndex} align="center">{nota}</StyledTableCell>
                  ))}
                  <StyledTableCell align="center">{row.media.toFixed(1)}</StyledTableCell>
                  <StyledTableCell align="center">
                  <IconButton color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error">
                    <CloseIcon />
                  </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button variant='contained' color='primary' component={RouterLink} to={`/professor/info-turma/${turmaId}`} style={{ marginTop: 20 }}>
          {/* Ícone ou texto para botão de voltar */}
          Voltar
        </Button>
      </div>
    </div>
  );
}

export default TelaProfessor;
