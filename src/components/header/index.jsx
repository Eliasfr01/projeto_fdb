import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Exibe um alerta para confirmação
    if (window.confirm('Deseja sair?')) {
      // Limpa o estado de autenticação/localStorage aqui se necessário
      // Por exemplo: localStorage.removeItem('userToken');

      // Redireciona para a página de login
      navigate('/');
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sistema de Notas e Frequência
          </Typography>
          <Tooltip title="Sair">
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleLogout} // Chama handleLogout quando o botão é clicado
            >
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
