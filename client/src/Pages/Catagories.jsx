import React, { useEffect, useState } from "react";
import CatagoryTable from "../components/CatagoryTable";
import CatagoryCard from "../components/CatagoryCard";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

function Catagories(){
    const [editCatagory,setEditCatagory] = useState({});

    return(
        <div>
        <CatagoryCard setEditCatagory={setEditCatagory} editCatagory={editCatagory} />
        <CatagoryTable setEditCatagory={setEditCatagory} />
        <Footer />
        <Outlet />
        </div>
    )
}

export default Catagories;