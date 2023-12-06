import { AppBar, Box, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';

function Header(){
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
            >
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </Box>
    )
}

export default Header;