// AdicionarTurma.jsx
import React, { useState } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

function AdicionarTurma({ open, handleClose }) {
  const [formData, setFormData] = useState({
    codigo: '',
    nome: '',
    professor: '',
    max_discente: '',
    creditos: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Aqui você pode adicionar a lógica para enviar os dados para a API ou estado global
    handleClose(); // Fechar o modal após o envio
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Adicionar Nova Turma</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            name="codigo"
            label="Código"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.codigo}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="nome"
            label="Nome da Turma"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.nome}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="professor"
            label="Professor"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.professor}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="max_discente"
            label="Máximo de Discentes"
            type="number"
            fullWidth
            variant="outlined"
            value={formData.max_discente}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="creditos"
            label="Créditos"
            type="number"
            fullWidth
            variant="outlined"
            value={formData.creditos}
            onChange={handleChange}
          />
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button type="submit" color="primary">
              Adicionar
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AdicionarTurma;
