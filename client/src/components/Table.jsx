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
import dayjs from 'dayjs'
import Cookies from "js-cookie";

function BasicTable(props) {
    const token = Cookies.get('token');

    async function remove(id){
        if(!window.confirm('Are you sure?')){
            return;
        }
        await fetch(`${process.env.REACT_APP_API_URL}/transactions/${id}`,{
            method:'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
            },
        });
        props.fetchTransaction();
    }

  return (
    <Container maxWidth='lg' className="input-form">
    <Typography variant="h6">Transaction List</Typography>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Amount</TableCell>
            <TableCell align="center">Discription</TableCell>
            <TableCell align="center">Catagory</TableCell>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {props.transactions.map((trx) => (
            <TableRow
              key={trx._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
              <TableCell align="center" component="th" scope="row">{trx.amount}</TableCell>
              <TableCell align="center">{trx.discription}</TableCell>
              <TableCell align="center">{trx.catagory.label}</TableCell>
              <TableCell align="center">{dayjs(trx.date).format('DD-MMM YYYY')}</TableCell>
              <TableCell align="center">
              <IconButton color="primary" sx={{marginRight:1}} onClick={()=>{props.setEditTransaction(trx)}}><EditIcon/></IconButton>
              <IconButton color="warning" sx={{marginLeft:1}} onClick={()=>{remove(trx._id)}}><DeleteIcon/></IconButton>
              </TableCell>
            </TableRow>
          ))
        }
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  );
}

export default BasicTable;