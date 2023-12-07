import React, { useState } from 'react';
import { Box, TextField, Button, Select, MenuItem, InputLabel, FormControl, InputAdornment, IconButton } from '@mui/material';
import './styles.css';
import LogoUFC from '../../assets/LogoUFC.png';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router';

function Login() {

  const navigate = useNavigate();
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
        if (data.user.tipo_usuario === 'alu') {
          //quero armazenar o nome de usuário do aluno no localStorage
          localStorage.setItem('alunoNome', data.user.nome_usuario);
          navigate('/aluno');
        } else if (data.user.tipo_usuario === 'prof') {
          navigate('/professor');
          localStorage.setItem('professorNome', data.user.nome);
        } else if (data.user.tipo_usuario === 'adm') {
          navigate('/admin');
        }
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

        />
        <TextField
          label="Senha"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
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
        <FormControl margin="normal">
          <InputLabel id="user-type-label">Tipo de usuário</InputLabel>
          <Select
            labelId="user-type-label"
            id="user-type-select"
            value={userType}
            label="Tipo de usuário"
            onChange={(event) => setUserType(event.target.value)}
          >
            <MenuItem value="adm">Administrador</MenuItem>
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
