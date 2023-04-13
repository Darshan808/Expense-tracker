import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import { Button } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../store/authSlice';

export default function NavBar() {
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state)=>state.auth);

  function handleLogout(){
    dispatch(logout());
    Cookies.remove('token');
    navigate('/login');
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to={'/'} style={{textDecoration:'none', color:'white'}}>
            Expense tracker
          </Link>
          </Typography>
          <Typography>
          {
            auth.isAuthenticated && <>
          <Link to={'/catagories'} style={{textDecoration:'none', color:'white', marginRight:'1rem'}}>Catagories</Link>
          <Link onClick={handleLogout} style={{textDecoration:'none', color:'white', marginRight:'1rem'}}>Logout</Link>
          </>
          }
          {
            !auth.isAuthenticated && <>
            <Link style={{textDecoration:'none', color:'white', marginRight:'1rem'}} to={'/login'}>Login</Link>
            <Link style={{textDecoration:'none', color:'white'}} to={'/register'}>Register</Link>
            </>
          }

          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
