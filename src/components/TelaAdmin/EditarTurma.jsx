import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function EditarTurma({ open, onClose, onUpdateTurma, turmaAtual }) {
  const [turma, setTurma] = useState({
    id_cadeira: '',
    nome: '',
    semestre_pertence: '',
    max_discente: '',
    creditos: '',
    id_professor: ''
  });

  const [professores, setProfessores] = useState([]);

  useEffect(() => {
    // Carrega os professores do banco de dados e atualiza o estado com a turma atual para edição
    const fetchProfessores = async () => {
      try {
        const response = await fetch('http://localhost:5000/professores');
        if (response.ok) {
          const data = await response.json();
          setProfessores(data);
        }
      } catch (error) {
        console.error('Erro ao buscar professores:', error);
      }
    };

    fetchProfessores();
    if (turmaAtual) {
      setTurma(turmaAtual);
    }
  }, [turmaAtual]);

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:5000/turmas/${turma.id_cadeira}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(turma),
      });

      if (response.ok) {
        alert('Turma atualizada com sucesso.');
        onUpdateTurma(turma); // Atualiza a lista de turmas na interface do usuário
        onClose();
      } else {
        alert('Falha ao atualizar turma. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao enviar dados para o servidor:', error);
      alert('Erro ao conectar ao servidor. Por favor, verifique sua conexão e tente novamente.');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTurma({ ...turma, [name]: value });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Editar Turma</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="nome_cadeira"
          label="Nome da Cadeira"
          type="text"
          fullWidth
          value={turma.nome_cadeira}
          onChange={handleChange}
        />
        <TextField 
          margin="dense"
          name="semestre_pertence"
          label="Semestre"
          type="number"
          fullWidth
          value={turma.semestre_pertence}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="max_discentes"
          label="Máximo de Discentes"
          type="number"
          fullWidth
          value={turma.max_discentes}
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
        <FormControl margin="normal" fullWidth>
          <InputLabel id="professorLabel">Selecione um professor</InputLabel>
          <Select
            labelId="professorLabel"
            id="professorSelect"
            name="id_professor"
            value={turma.id_professor}
            onChange={handleChange}
          >
            {professores.map((professor) => (
              <MenuItem key={professor.id_professor} value={professor.id_professor}>
                {professor.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Atualizar
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default EditarTurma;
