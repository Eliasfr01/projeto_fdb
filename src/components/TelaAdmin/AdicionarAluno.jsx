import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableContainer, TableHead, TableRow, IconButton, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

function AdicionarAlunos({ open, onClose }) {
  const [showDelete, setShowDelete] = useState({});
  // Dados simulados dos alunos
  const alunosData = [
    { nome: 'Carlos Henrique', curso: 'Ciência da Computação', matricula: 531231 },
    { nome: 'Pedro Maciel', curso: 'Ciência da Computação', matricula: 531232 },
    { nome: 'Elias Farias', curso: 'Ciência da Computação', matricula: 531233 },
  // ... outros alunos
  ];

  // Funções para adicionar e remover alunos (a serem implementadas)
  const handleAddAluno = (aluno) => {
    // ...
  };

  const handleRemoveAluno = (matricula) => {
    // ...
  };

  const toggleDelete = (matricula) => {
    setShowDelete(prev => ({ ...prev, [matricula]: !prev[matricula] }));
  };

  const handleConfirm = () => {
    // Aqui você pode colocar qualquer lógica que precisa acontecer quando confirma
    // Por exemplo, enviar os dados para um backend ou atualizar o estado local

    // Chame onClose para fechar o diálogo
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Adicionar Aluno</DialogTitle>
      <DialogContent>
        <TableContainer>
          <Table>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Alunos</StyledTableCell>
                <StyledTableCell>Curso</StyledTableCell>
                <StyledTableCell>Matrícula</StyledTableCell>
                <StyledTableCell>Ação</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {alunosData.map((aluno, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell>{aluno.nome}</StyledTableCell>
                  <StyledTableCell>{aluno.curso}</StyledTableCell>
                  <StyledTableCell>{aluno.matricula}</StyledTableCell>
                  <StyledTableCell>
                  <IconButton onClick={() => toggleDelete(aluno.matricula)}>
                      {showDelete[aluno.matricula] ? <DeleteIcon /> : <AddIcon />}
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleConfirm} color="primary">
          Confirmar
        </Button>
      </DialogActions>

    </Dialog>
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

export default AdicionarAlunos;
