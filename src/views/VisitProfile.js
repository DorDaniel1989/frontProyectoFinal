
import React from "react";
import Menu from '../components/Menu';
import FormularioLogin from '../components/FormularioLogin';
import CuerpoVisitProfile from "../components/CuerpoVisitProfile"
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import { Navigate } from 'react-router-dom'


function VisitProfile() {


const { usuarioId } = useParams();
const ruta ="/profile/"+usuarioId;
console.log(ruta)

  if ((localStorage.getItem('user') === null ) || JSON.parse(localStorage.getItem('user')).usuarioId != usuarioId) {
  return (
    <>
    <Menu/>
    <FormularioLogin />
    <CuerpoVisitProfile/>
    <Footer/>
    </>
  )}else{
    return (<Navigate to={ruta} />);
  }

}

export default VisitProfile;
