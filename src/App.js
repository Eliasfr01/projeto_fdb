import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TelaProfessor from './components/TelaProfessor/TelaProfessor';
import TelaAluno from './components/telaAluno/telaAluno';
import TelaInfoTurma from './components/TelaFrequenciaTurma/TelaFrequenciaTurma';
import TelaInfoTurmaProf from './components/TelaInfoTurmaProfessor/TelaInfoTurmaProfessor';
import Login from './components/login/login'
import TelaFrequencia from './components/TelaFrequenciaTurma/TelaFrequenciaTurma';
import TelaNotaProfessor from './components/TelaNotaProfessor/TelaNotaProfessor'
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route path="/professor" element={<TelaProfessor/>} />
        <Route path="/professor/info-turma/:turmaId" element={<TelaInfoTurmaProf/>} />
        <Route path="/aluno" element={<TelaAluno/>} />
        <Route path="/aluno/info-turma/:turmaId" element={<TelaInfoTurma/>} />
        <Route path="/aluno/info-turma/:turmaId/telafrequencia" element={<TelaFrequencia/>} />
        <Route path="/aluno/info-turma/:turmaId/notas" element={<TelaNotaProfessor/>} />
      </Routes>
    </Router>
  );
}

export default App;
