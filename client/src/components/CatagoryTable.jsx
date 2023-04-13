import React from "react";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Cookies from "js-cookie";
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../store/authSlice';

function CatagoryTable(props) {
    const token = Cookies.get('token');
    const dispatch = useDispatch();
    const user =useSelector((state)=>state.auth.user);

    async function removeCatagory(id){
        if(!window.confirm('Are you sure?')){
            return;
        }
        const res = await fetch(`${process.env.REACT_APP_API_URL}/catagories/${id}`,{
            method:'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
            },
        });
        const { newCatagories } = await res.json();
        dispatch(getUser({...user,catagories: newCatagories}));
    }

  return (

    <Container maxWidth='lg' className="input-form">
    <Typography variant="h6">Catagories</Typography>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Label</TableCell>
            <TableCell align="center">Icon</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {user.catagories.map(catagory => (
            <TableRow
              key={catagory._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">{catagory.label}</TableCell>
              <TableCell align="center">{catagory.icon}</TableCell>
              <TableCell align="center">
              <IconButton color="primary" sx={{marginRight:1}} onClick={()=>{props.setEditCatagory(catagory)}} ><EditIcon/></IconButton>
              <IconButton color="warning" sx={{marginLeft:1}} onClick={()=>{removeCatagory(catagory._id)}} ><DeleteIcon/></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  );
}

export default CatagoryTable;