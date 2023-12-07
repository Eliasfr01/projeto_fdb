import React, { useState } from 'react';
import { Box, TextField, Button, Select, MenuItem, InputLabel, FormControl, InputAdornment, IconButton } from '@mui/material';
import './styles.css';
import LogoUFC from '../../assets/LogoUFC.png';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function Login() {

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState('');

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          user_type: userType
        }),
      });
      const data = await response.json();
      if (response.ok){
        console.log('Login realizado com sucesso', data);
      } else {
        console.error('Erro ao realizar login', data.error);
      }
    } catch (error) {
      console.error('Erro de rede', error);
    }
  };

  return (
    <Box className="login-container">
      <Box className="login-card">
      <img src={LogoUFC} alt="Logo UFC" className="login-logo" width={200} />
      <form
        className="login-form"
        onSubmit={handleLogin}
        noValidate
        autoComplete="off"
      >
        <TextField
          label="Usuário ou e-mail"
          variant="outlined"
          value={username}
          onChange={(event) => setUserName(event.target.value)}
          fullWidth
        />
        <TextField
          label="Senha"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          fullWidth
          margin='normal'
          InputProps={{ // Início da adição
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="user-type-label">Tipo de usuário</InputLabel>
          <Select
            labelId="user-type-label"
            id="user-type-select"
            value={userType}
            label="Tipo de usuário"
            onChange={(event) => setUserType(event.target.value)}
          >
            <MenuItem value="alu">Aluno</MenuItem>
            <MenuItem value="prof">Professor</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" type='submit' className="login-button">LOGIN</Button>
        <div className="login-actions">
          <Button color="primary">Esqueci a senha</Button>
        </div>
      </form>
      </Box>
    </Box>
  );
}

export default Login;
