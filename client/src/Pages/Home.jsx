import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import InputCard from "../components/Card";
import { Outlet } from "react-router-dom";
import Cookies from 'js-cookie';
import TransactionChart from "../components/TransactionChart";
import Footer from "../components/Footer";

function Home(){

    const [transactions,setTransactions] = useState({data: [], transactionsTable:[]});
    useEffect(() => {
        fetchTransaction();
    },[]);

    const [editTransaction,setEditTransaction] = useState({});

    async function fetchTransaction(){
        const token = Cookies.get('token');
        const transaction = await fetch(`${process.env.REACT_APP_API_URL}/transactions`,{
            headers: {
                Authorization: 'Bearer '+token,
            }
        });
        if(transaction.status===401){
            console.log('Unauthorized access!');
        } else{
        const res = await transaction.json();
        setTransactions(res);
        }
    }


    return(
        <>
        <TransactionChart data={transactions.data} />
        <InputCard setEditTransaction={setEditTransaction} editTransaction={editTransaction} fetchTransaction={fetchTransaction}/>
        <Table transactions={transactions.transactionsTable} fetchTransaction={fetchTransaction} setEditTransaction={setEditTransaction}/>
        <Footer />
        <Outlet />
        </>
    )
}

export default Home;