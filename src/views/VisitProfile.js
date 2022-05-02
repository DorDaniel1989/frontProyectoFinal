
import React, {Component, useEffect, useState } from "react";
import Menu from '../components/Menu';
import CuerpoVisitProfile from "../components/CuerpoVisitProfile"
import '../styles/miCss.css';
import { render } from "@testing-library/react";


function VisitProfile() {

  return (
    <>
    <Menu/>
    <CuerpoVisitProfile/>
    </>
  );}


export default VisitProfile;
