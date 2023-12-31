import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function AdicionarTurma({ open, onClose, onAddTurma }) {
  const [turma, setTurma] = useState({
    codigo: '',
    nome: '',
    semestre_pertence: '',
    max_discente: '',
    creditos: '',
    id_professor: ''
  });

  const [professores, setProfessores] = useState([]);

  useEffect(() => {
    // Carrega os professores do banco de dados
    const fetchProfessores = async () => {
      try {
        const response = await fetch('http://localhost:5000/professores'); // Substitua pela URL correta
        if (response.ok) {
          const data = await response.json();
          setProfessores(data); // Atualiza o estado com os dados dos professores
        }
      } catch (error) {
        console.error('Erro ao buscar professores:', error);
      }
    };

    fetchProfessores();
  }, []);

  const handleSubmit = async () => {
    try {
      // Realiza a requisição POST para o servidor
      const response = await fetch('http://localhost:5000/turmas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          codigo: turma.codigo,
          nome: turma.nome,
          semestre_pertence: turma.semestre_pertence,
          max_discentes: turma.max_discente,
          creditos: turma.creditos,
          id_professor: turma.id_professor,
        }),
      });
  
      // Verifica se a requisição foi bem sucedida
      if (response.ok) {
        // Se for bem sucedida, fecha o modal e opcionalmente limpa o formulário ou atualiza a lista de turmas
        setTurma({ // Limpa o formulário
          codigo: '',
          nome: '',
          semestre_pertence: '',
          maxDiscente: '',
          creditos: '',
          professorId: ''
        });
        onClose();
      } else {
        // Se houver um erro na resposta do servidor, mostra um alerta ou trata o erro
        alert('Falha ao adicionar turma. Por favor, tente novamente.');
      }
    } catch (error) {
      // Se houver um erro ao enviar a requisição, mostra um alerta ou trata o erro
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
      <DialogTitle>Adicionar Nova Turma</DialogTitle>
      <DialogContent>
      <TextField
          margin="dense"
          name="codigo"
          label="Codigo da Cadeira"
          type="text"
          fullWidth
          value={turma.codigo}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="nome"
          label="Nome da Cadeira"
          type="text"
          fullWidth
          value={turma.nome}
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
          name="max_discente"
          label="Máximo de Discentes"
          type="number"
          fullWidth
          value={turma.max_discente}
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
          <InputLabel id="user-type-label">Selecione um professor</InputLabel>
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
          Adicionar
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default AdicionarTurma;
