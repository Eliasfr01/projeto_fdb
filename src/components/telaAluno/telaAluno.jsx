import React from 'react';
import Header from '../header/index.jsx';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

function createData(codigo, disciplina, prof, periodo, freq, horario) {
  return { codigo, disciplina, prof, periodo, freq, horario };
}

const rows = [
  createData('QXD003', 'Fundamento de Banco de Dados', 'Livia Almada', '5º Semestre', '100%', 'Qua 13:30 - 15:30/Qui 13:30 - 15:30'),
  createData('QXD003', 'Fundamento de Banco de Dados', 'Livia Almada', '5º Semestre', '100%', 'Qua 13:30 - 15:30/Qui 13:30 - 15:30'),
  createData('QXD003', 'Fundamento de Banco de Dados', 'Livia Almada', '5º Semestre', '100%', 'Qua 13:30 - 15:30/Qui 13:30 - 15:30'),
  createData('QXD003', 'Fundamento de Banco de Dados', 'Livia Almada', '5º Semestre', '100%', 'Qua 13:30 - 15:30/Qui 13:30 - 15:30'),
  createData('QXD003', 'Fundamento de Banco de Dados', 'Livia Almada', '5º Semestre', '100%', 'Qua 13:30 - 15:30/Qui 13:30 - 15:30'),
];

function TelaAluno() {
  return(
    <div>
      <Header />
      <div style={{padding: '8px 50px 0px' }}>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell align="right">Disciplina</TableCell>
              <TableCell align="right">Professor</TableCell>
              <TableCell align="right">Período</TableCell>
              <TableCell align="right">Frequência</TableCell>
              <TableCell align="right">Horário</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.codigo}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.codigo}
                </TableCell>
                <TableCell align="right">{row.disciplina}</TableCell>
                <TableCell align="right">{row.prof}</TableCell>
                <TableCell align="right">{row.periodo}</TableCell>
                <TableCell align="right">{row.freq}</TableCell>
                <TableCell align="right">{row.horario}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </TableContainer>
      </div>
    </div>
  )
};

export default TelaAluno;