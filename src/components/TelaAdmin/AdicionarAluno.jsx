import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableContainer, TableHead, TableRow, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

function AdicionarAlunos({ open, onClose }) {

  const [showDelete, setShowDelete] = useState({});
  const [alunos, setAlunos] = useState([]); 

  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        const response = await fetch('http://localhost:5000/alunos');
        if (response.ok) {
          const data = await response.json();
          setAlunos(data);
        } else {
          console.error('Erro ao buscar alunos');
        }
      } catch (error) {
        console.error('Erro ao conectar com o servidor', error);
      }
    };

    fetchAlunos();
  }, []);

  // Funções para adicionar e remover alunos (a serem implementadas)
  const handleAddAluno = (aluno) => {
    // ...
  };

  const handleRemoveAluno = (matricula) => {
    // ...
  };

  const handleEditAluno = (aluno) => {

  }

  const toggleDelete = (matricula) => {
    setShowDelete(prev => ({ ...prev, [matricula]: !prev[matricula] }));
  };

  const handleConfirm = () => {

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
                <StyledTableCell>Matrícula</StyledTableCell>
                <StyledTableCell>Ação</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {alunos.map((aluno, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell>{aluno.nome}</StyledTableCell>
                  <StyledTableCell>{aluno.matricula}</StyledTableCell>
                  <StyledTableCell align="center">
                  <IconButton onClick={() => handleEditAluno()} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => toggleDelete()} color="secondary">
                    <DeleteIcon />
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
