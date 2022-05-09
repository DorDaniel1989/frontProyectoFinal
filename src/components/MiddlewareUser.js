
import React, {Component, useEffect, useState } from "react";
import  { Navigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import Menu from '../components/MenuLoginAdmin';
import Login from '../components/AdminLogin';
import '../styles/admin.sass';

function MiddlewareUser() {
    const { Id } = useParams();
    ruta = '/visitProfile/'+Id;

    if(localStorage.getItem('user') != null){
        if(JSON.parse(localStorage.getItem('user')).usuarioId!=Id){
            return (<Navigate to='/'  />);
        }else{
            return (<Navigate to={ruta}  />);
        }
        
    }else{
        return (
            <>
                <Menu/>

                <Login/>
            </>
        );
    }
}


export default MiddlewareUser;
