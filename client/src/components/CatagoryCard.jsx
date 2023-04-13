import React, {useEffect, useState} from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Cookies from "js-cookie";
import { Box } from "@mui/system";
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../store/authSlice';

function CatagoryCard(props){
  const token = Cookies.get('token');
  const dispatch = useDispatch();
  const user = useSelector((state)=>state.auth.user);
  
  const initialForm = {
    label: '',
    icon: '',
  }

  const [formData,setFormData] = useState(initialForm);
  useEffect(()=>{
    if(props.editCatagory.label!==undefined){
      setFormData(props.editCatagory);
    }
  },[props.editCatagory]);

  async function handleSubmit(e){
    e.preventDefault();
    if(props.editCatagory.label===undefined){
      await create();
    } else{
      await update();
    }
    setFormData(initialForm);
    // props.fetchTransaction();
}

  async function create(){
    const res = await fetch(`${process.env.REACT_APP_API_URL}/catagories`,{
        method: 'POST',
        body: JSON.stringify(formData),
        headers:{
          'content-type':'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      const { newCatagories } = await res.json();
      dispatch(getUser({...user,catagories:newCatagories}));
  }
  async function update(){
    const res = await fetch(`${process.env.REACT_APP_API_URL}/catagories/`+props.editCatagory._id,{
        method: 'PATCH',
        body: JSON.stringify(formData),
        headers:{
          'content-type':'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      props.setEditCatagory({});
      const { newCatagories } = await res.json();
      dispatch(getUser({...user,catagories:newCatagories}));
  }

  function handleChange(event){
    const {name, value} = event.target;
    setFormData(prev =>{
        return {...prev,
            [name]: value
        }
    });
  }


  

  return (
    
    <Container maxWidth="lg">

    <Card  className="input-form">
    <Typography variant="h6">
    Add new catagory
    </Typography>
    <CardContent>

    <Box component={'form'} onSubmit={handleSubmit} sx={{display: "flex"}}>

      <TextField
      value={formData.label}
      name="label"
      onChange={handleChange}
      required
      sx={{marginRight:5, width: 200}}
      size="small"
      id="outlined-required"
      label="Catagory"
      />

      <TextField
      value={formData.icon}
      name="icon"
      onChange={handleChange}
      required
      sx={{marginRight:5,width: 200}}
      size="small"
      id="outlined-required"
      label="Icon"
      />

      <Button type="submit" variant="contained" color={props.editCatagory.label===undefined?'primary':'secondary'}>{
        props.editCatagory.label===undefined?'Submit':'Update'
      }</Button>

    </Box>
    </CardContent>
  </Card> 
  </Container>
  )
}

export default CatagoryCard;