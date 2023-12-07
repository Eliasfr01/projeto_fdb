import React from 'react';
import Header from '../header/index.jsx';
import { Paper, Table, TableBody, TableContainer, TableHead, TableRow, Button, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import AdicionarTurma from './AdicionarTurma.jsx';
import AdicionarAlunos from './AdicionarAluno.jsx';
import AdicionarProfessor from './AdicionarProfessor.jsx';
// Dados simulados das turmas
const turmasData = [
  { id: 1, codigo: 'QXD001', nome: 'Fundamentos de Programação', professor: 'Dr. Smith', semestre: '5° semestre', max_discente: '50', creditos: '24'},
  { id: 2, codigo: 'QXD002', nome: 'Estruturas de Dados', professor: 'Dr. Johnson', semestre: '5° semestre', max_discente: '50', creditos: '24'},
  // ... outras turmas
];

function AdminTurmas() {
  // Funções para manipular eventos
  const [isAddTurmaOpen, setIsAddTurmaOpen] = useState(false);
  const [isAddAlunoOpen, setIsAddAlunoOpen] = useState(false);
  const [isAddProfessorOpen, setIsAddProfessorOpen] = useState(false);

  const handleAdd = () => {
    console.log('Adicionar turma');
    // Implemente a lógica de adicionar turma aqui
  };

  const handleOpenAddTurma = () => {
    setIsAddTurmaOpen(true);
  };

  const handleCloseAddTurma = () => {
    setIsAddTurmaOpen(false);
  };

  const handleOpenAddAluno = () => {
    setIsAddAlunoOpen(true);
  };

  const handleCloseAddAluno = () => {
    setIsAddAlunoOpen(false);
  };

  const handleOpenAddProfessor = () => {
    setIsAddProfessorOpen(true);
  };

  const handleCloseAddProfessor = () => {
    setIsAddProfessorOpen(false);
  };

  const handleEdit = (turmaId) => {
    console.log('Editar turma', turmaId);
    // Implemente a lógica de edição aqui
  };

  const handleDelete = (turmaId) => {
    console.log('Remover turma', turmaId);
    // Implemente a lógica de remoção aqui
  };

  const handleAddTurma = (newTurma) => {
    console.log(newTurma);
    // Aqui você pode adicionar a lógica para enviar a nova turma para o backend
  };

  const handleAddAluno = (newAluno) => {
    console.log(newAluno);
    // Aqui você pode adicionar a lógica para enviar a nova turma para o backend
  };

  return (
    <div>
    <Header/>
    <div style={{ padding: 16 }}>
      <Button
        startIcon={<AddCircleOutlineIcon />}
        variant="contained"
        color="primary"
        onClick={handleOpenAddTurma}
        
      >
        Adicionar Turma
      </Button>

      <Button
        startIcon={<AddCircleOutlineIcon />}
        variant="contained"
        color="primary"
        onClick={handleOpenAddAluno}
        style={{marginLeft: '8px'}}

      >
        Adicionar Alunos
      </Button>
        <AdicionarTurma
            open={isAddTurmaOpen}
            onClose={handleCloseAddTurma}
            onAddTurma={handleAddTurma}
        />

        <AdicionarAlunos
          open={isAddAlunoOpen}
          onClose={handleCloseAddAluno}
          onAddAluno={handleAddAluno}
        />
      
      <Button 
        startIcon={<AddCircleOutlineIcon />}
        variant="contained" 
        color="primary" 
        onClick={handleOpenAddProfessor}
        style={{marginLeft: '8px'}}
        >
        Adicionar Professor
      </Button>

      <AdicionarProfessor
        open={isAddProfessorOpen}
        onClose={handleCloseAddProfessor}
      />

      <TableContainer component={Paper} style={{ marginTop: 16 }}>
        <Table>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Código</StyledTableCell>
              <StyledTableCell>Nome</StyledTableCell>
              <StyledTableCell>Professor</StyledTableCell>
              <StyledTableCell>Semestre</StyledTableCell>   
              <StyledTableCell>Máximo de discentes</StyledTableCell>
              <StyledTableCell>Créditos</StyledTableCell>
              <StyledTableCell align="center">Ações</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {turmasData.map((turma) => (
              <StyledTableRow key={turma.id}>
                <StyledTableCell>{turma.codigo}</StyledTableCell>
                <StyledTableCell>{turma.nome}</StyledTableCell>
                <StyledTableCell>{turma.professor}</StyledTableCell>
                <StyledTableCell>{turma.semestre}</StyledTableCell>
                <StyledTableCell>{turma.max_discente}</StyledTableCell>
                <StyledTableCell>{turma.creditos}</StyledTableCell>
                <StyledTableCell align="center">
                  <IconButton onClick={() => handleEdit(turma.id)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(turma.id)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
    </div>
  );
}

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

export default AdminTurmas;

