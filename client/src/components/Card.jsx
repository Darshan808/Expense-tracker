import React, {useEffect, useState} from "react";
import dayjs from 'dayjs';
import { Autocomplete } from "@mui/material";
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { format } from "date-fns";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Cookies from "js-cookie";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";

function InputCard(props){
  const token = Cookies.get('token');
  
  const initialForm = {
    amount: '',
    discription: '',
    date:dayjs(format(new Date(),'yyyy-MM-dd')),
    catagory:''
  }

  const [formData,setFormData] = useState(initialForm);
  useEffect(()=>{
    if(props.editTransaction.amount!==undefined){
      setFormData(props.editTransaction);
      setValue(props.editTransaction.catagory);
    }
  },[props.editTransaction]);

  async function handleSubmit(e){
    e.preventDefault();
    if(props.editTransaction.amount===undefined){
      await create();
    } else{
      await update();
    }
    setFormData(initialForm);
    setValue(null);
    props.fetchTransaction();
}

  async function create(){
    await fetch(`${process.env.REACT_APP_API_URL}/transactions`,{
        method: 'POST',
        body: JSON.stringify(formData),
        headers:{
          'content-type':'application/json',
          Authorization: `Bearer ${token}`
        }
      });
  }
  async function update(){
    await fetch(`${process.env.REACT_APP_API_URL}/transactions/`+props.editTransaction._id,{
        method: 'PATCH',
        body: JSON.stringify(formData),
        headers:{
          'content-type':'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      props.setEditTransaction({});
  }

  function handleChange(event){
    const {name, value} = event.target;
    setFormData(prev =>{
        return {...prev,
            [name]: value
        }
    });
  }

  function handleDateChange(newValue){
    setFormData(prev=>{
        return {
            ...prev,date:newValue
        }
      })
  }
  const options =useSelector((state)=>state.auth.user.catagories);
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');

  

  return (
    
    <Container maxWidth="lg" className="input-form">

    <Card>
    <Typography variant="h6">
    Add new transaction
    </Typography>
    <CardContent>

    <Box component={'form'} onSubmit={handleSubmit} sx={{display: "flex", justifyContent:'space-between'}}>

      <TextField
      value={formData.amount}
      name="amount"
      onChange={handleChange}
      required
      sx={{marginRight:5, width: 200}}
      size="small"
      id="outlined-number"
      label="Amount"
      type="number"
      />

      <TextField
      value={formData.discription}
      name="discription"
      onChange={handleChange}
      required
      sx={{marginRight:5,width: 200}}
      size="small"
      id="outlined-required"
      label="Discription"
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
      defaultValue={dayjs(format(new Date(),'yyyy-MM-dd'))}
      onChange={handleDateChange}
      size='small'
      sx={{marginRight:5, width:200}}
      />
      </LocalizationProvider>
      
      <Autocomplete
        isOptionEqualToValue={(options, value) => options.label === value.label}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          formData.catagory=newValue;
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={options}
        size='small'
        sx={{marginRight:5, width:200}}
        renderInput={(params) => <TextField {...params} required={true} label="Catagory" />}
      />

      <Button type="submit" variant="contained" color={props.editTransaction.amount===undefined?'primary':'secondary'}>{
        props.editTransaction.amount===undefined?'Submit':'Update'
      }</Button>

    </Box>
    </CardContent>
  </Card> 
  </Container>
  )
}

export default InputCard;