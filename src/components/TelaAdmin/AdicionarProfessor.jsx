import React, { useState } from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, FormControl, InputLabel, Select, MenuItem, OutlinedInput
} from '@mui/material';

function AdicionarProfessor({ open, onClose }) {
  const [professor, setProfessor] = useState({
    nome: '',
    graduacao: '',
    matricula: '',
    disciplinas: []
  });

  const [disciplinasDisponiveis, setDisciplinasDisponiveis] = useState([
    'Programação I', 'Programação II', 'Banco de Dados', 'Estrutura de Dados' // Exemplos de disciplinas
  ]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfessor({ ...professor, [name]: value });
  };

  const handleDisciplinaChange = (event) => {
    setProfessor({ ...professor, disciplinas: event.target.value });
  };

  const handleConfirm = () => {
    // Aqui você pode colocar qualquer lógica que precisa acontecer quando confirma
    // Por exemplo, enviar os dados para um backend ou atualizar o estado local
    console.log(professor);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Adicionar Professor</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="nome"
          label="Nome"
          type="text"
          fullWidth
          value={professor.nome}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          name="graduacao"
          label="Graduação"
          type="text"
          fullWidth
          value={professor.graduacao}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          name="matricula"
          label="Matrícula"
          type="text"
          fullWidth
          value={professor.matricula}
          onChange={handleInputChange}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel id="disciplinas-label">Disciplinas</InputLabel>
          <Select
            labelId="disciplinas-label"
            multiple
            value={professor.disciplinas}
            onChange={handleDisciplinaChange}
            input={<OutlinedInput label="Disciplinas" />}
          >
            {disciplinasDisponiveis.map((disciplina) => (
              <MenuItem key={disciplina} value={disciplina}>
                {disciplina}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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

export default AdicionarProfessor;
