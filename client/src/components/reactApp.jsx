import React, { useState } from "react";

function App(){

    const [formData,setFormData] = useState({
        amount: 0,
        disc: '',
        date: ''
    })

    function handleChange(event){
        const {name, value} = event.target;
        setFormData(prev =>{
            return {...prev,
                [name]: value
            }
        })
    }

    async function handleSubmit(e){
        const res = await fetch('http://localhost:4000/transaction',{
            method: 'post',
            body: formData
        });
        console.log(res);
        e.preventDefault();
    }

    return(
        <form onSubmit={handleSubmit}>
            <input
            value={formData.number}
            onChange={handleChange}
            type='number'
            name="amount"
            placeholder="Amount"
            required
            />
            <input
            value={formData.disc}
            onChange={handleChange}
            type='text'
            name="disc"
            placeholder="description"
            />
            <input
            value={formData.date}
            onChange={handleChange}
            type='date'
            name="date"
            placeholder="description"
            />
            <button type="submit">Submit</button>
        </form>
    )
}

export default App;