import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TelaProfessor from './components/TelaProfessor/TelaProfessor';
import TelaAluno from './components/telaAluno/telaAluno';
import TelaInfoTurma from './components/telaInfoTurma/TelaInfoTurma';
import TelaInfoTurmaProf from './components/TelaInfoTurmaProfessor/TelaInfoTurmaProfessor';
import Login from './components/login/login'
import TelaFrequencia from './components/TelaFrequenciaTurma/TelaFrequenciaTurma';
import FrenquenciaTurma from './components/TelaFrequenciaProf/TelaFrequenciaProf';
import TelaNotaProfessor from './components/TelaNotaProfessor/TelaNotaProfessor';
import MinhasNotas from './components/telaNotaAluno/telaNotaAluno';
import AdminTurmas from './components/TelaAdmin/TelaAdmin';
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route path="/professor" element={<TelaProfessor/>} />
        <Route path="/professor/info-turma/:turmaId" element={<TelaInfoTurmaProf/>} />
        <Route path="/professor/info-turma/:turmaId/telafrequencia" element={<TelaFrequencia/>} />
        <Route path="/professor/info-turma/:turmaId/telafrequencia/:data" element={<FrenquenciaTurma/>} />
        <Route path="/professor/info-turma/:turmaId/notas" element={<TelaNotaProfessor/>} />
        <Route path="/aluno" element={<TelaAluno/>} />
        <Route path="/aluno/info-turma/:turmaId" element={<TelaInfoTurma/>} />
        <Route path="/aluno/info-turma/:turmaId/minhasnotas" element={<MinhasNotas/>} />
        <Route path="/admin" element={<AdminTurmas/>} />       
      </Routes>
    </Router>
  );
}

export default App;
