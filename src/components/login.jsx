import React from 'react';
import { Box, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import './styles.css';
import LogoUFC from '../assets/LogoUFC.png';

function Login() {
  return (
    <Box className="login-container">
      <Box className="login-card">
      <img src={LogoUFC} alt="Logo UFC" className="login-logo" width={200} />
      <Box
        component="form"
        className="login-form"
        noValidate
        autoComplete="off"
      >
        <TextField label="Usuário ou e-mail" variant="outlined" />
        <TextField label="Senha" type="password" variant="outlined" />
        <FormControl fullWidth margin="normal">
          <InputLabel id="user-type-label">Tipo de usuário</InputLabel>
          <Select
            labelId="user-type-label"
            id="user-type-select"
            label="Tipo de usuário"
          >
            <MenuItem value={10}>Aluno</MenuItem>
            <MenuItem value={20}>Professor</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" className="login-button">LOGIN</Button>
        <div className="login-actions">
          <Button color="primary">Esqueci a senha</Button>
        </div>
      </Box>
      </Box>
    </Box>
  );
}

export default Login;
