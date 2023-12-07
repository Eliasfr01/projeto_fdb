import React from 'react';
import Header from '../header/index.jsx';
import { Paper, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Calendar from 'react-calendar'; 
import './Style.css';

function TelaFrequencia() {

  return(
    <div>
      <Header />
      <div style={{padding: '8px 50px 0px' }}>
        <Typography variant="h5" component="h2" style={{marginBottom: '20px'}}>
          Fundamento de Banco de Dados
        </Typography>
        <Typography variant="subtitle1" component="h3">
          Discente: Livia Almada
        </Typography>
        <Paper elevation={3} style={{padding: '15px', marginTop: '20px'}}>

          <Calendar
          />
        </Paper>
        <StyledButton variant='contained' color='primary' style={{ marginTop: '20px' }}>Voltar</StyledButton>
      </div>
    </div>
  )
};

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: '20px',
}));

export default TelaFrequencia;
