import React from 'react';
import Header from '../header/index.jsx';
import { Paper, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Calendar from 'react-calendar';
import { useParams } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Style.css';

function TelaFrequencia() {
  const {turmaId, data} = useParams();
  const navigate = useNavigate();
  const handleDayClick = (value, event) => {
    const formattedDate = value.toISOString().split('T')[0];
    navigate(`/professor/info-turma/${turmaId}/telafrequencia/${formattedDate}`);
  };
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
            onClickDay={handleDayClick}
          />
        </Paper>
        <StyledButton variant='contained' color='primary' style={{ marginTop: '20px' }} component={RouterLink} to={`/professor/info-turma/${turmaId}`}>
          Voltar
        </StyledButton>
      </div>
    </div>
  )
};

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: '20px',
}));

export default TelaFrequencia;
