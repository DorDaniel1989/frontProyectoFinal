
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
            <div className="container-fluid d-flex flex-column mw-100 min-vh-100 p-0">
                <Menu/>

                <Login/>
            </div>
        );
    }
}


export default Admin;
