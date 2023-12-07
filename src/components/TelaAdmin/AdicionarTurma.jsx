import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

function AdicionarTurma({ open, onClose, onAddTurma }) {
  const [turma, setTurma] = useState({
    codigo: '',
    nome: '',
    professor: '',
    maxDiscente: '',
    creditos: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTurma({ ...turma, [name]: value });
  };

  const handleSubmit = () => {
    onAddTurma(turma);
    onClose(); // Fechar o modal após o envio
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Adicionar Nova Turma</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="codigo"
          label="Código"
          type="text"
          fullWidth
          value={turma.codigo}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="nome"
          label="Nome da Turma"
          type="text"
          fullWidth
          value={turma.nome}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="professor"
          label="Professor"
          type="text"
          fullWidth
          value={turma.professor}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="maxDiscente"
          label="Máximo de Discentes"
          type="number"
          fullWidth
          value={turma.maxDiscente}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="creditos"
          label="Créditos"
          type="number"
          fullWidth
          value={turma.creditos}
          onChange={handleChange}
        />
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Adicionar
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default AdicionarTurma;
