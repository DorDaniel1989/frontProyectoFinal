import React, { useEffect, useState } from "react";

import imagen from "../imagenes/Eventum_golden.png";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";
import GitHubIcon from '@mui/icons-material/GitHub';
import '../styles/footer.css';


function Footer(props) {

    const navigate = useNavigate();


    return (
        <footer class="footer-distributed mt-5">

        <div class="footer-left">

        <Link to='/'><img alt="Evencum" width={150} className="logo-eventum" src={imagen}/></Link>

            <p class="footer-links">
                <a href="/" class="link-1">Home</a>
                
            
            
            </p>

            <p class="footer-company-name">Eventum © 2022</p>
        </div>

        <div class="footer-center">

            <div>
                <i class="fa fa-map-marker"></i>
                <p><span>Plaiaundi, s/n, </span> 20301 Irun, Gipuzkoa</p>
            </div>

            <div>
                <i class="fa fa-phone"></i>
                <p>+34 943 89 92 14</p>
            </div>

            <div>
                <i class="fa fa-envelope"></i>
                <p><a href="mailto:support@company.com">support@eventum.com</a></p>
            </div>

        </div>

        <div class="footer-right">

            <p class="footer-company-about">
                <span>Sobre la empresa</span>
                Somos una plataforma donde combinamos las ventajas de una red social con la participacion de nuestros usuarios en eventos presenciales
            </p>

            <div class="footer-icons">
        
                <a href="https://github.com/DorDaniel1989/frontProyectoFinal"> <GitHubIcon/></a>
             
            </div>

        </div>

    </footer>
    );
}

export default Footer;