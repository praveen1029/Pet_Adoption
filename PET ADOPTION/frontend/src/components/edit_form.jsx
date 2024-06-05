import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const EditForm = () =>{

    const location = useLocation()
    const userId = location.state.id;

    return(
        <>
        <div>{userId}</div>
        </>
    );

};

export default EditForm;