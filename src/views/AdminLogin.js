
import React, {Component, useEffect, useState } from "react";
import  { Navigate } from 'react-router-dom'
import Menu from '../components/MenuLoginAdmin';
import Login from '../components/AdminLogin';
import '../styles/admin.sass';

function Admin() {

    if(localStorage.getItem('user') != null){
        if(JSON.parse(localStorage.getItem('user')).admin){
            return (<Navigate to='/adminCMS'  />);
        }else{
            return (<Navigate to='/'  />);
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


export default Admin;
