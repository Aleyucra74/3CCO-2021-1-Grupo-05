import React from 'react';

import NavBar from '../components/NavBar';
import vector from '../images/vector-barra.png';
import bandtec from '../images/logo-bandtec.png';
import deloitte from '../images/logo-deloitte.png';
import c6 from '../images/logo-c6.png';
import accenture from '../images/logo-accenture.png';
import '../styles/empresas.css';


function Empresas() {
    return(
        <>
            <NavBar/>
            <div className="container-empresas">
                <div className="empresas">
                <section className="section-title-empresas">
                    <h2>CONHEÇA ALGUMAS<br/> 
                    <span id="empresas">EMPRESAS</span></h2>
                </section>
                <section className="section-empresas-left">
                    <img id="img-bandtec" src={bandtec} alt=""/>
                    <h1>392 contratações</h1>
                    <img id="img-deloitte" src={deloitte} alt=""/>
                    <h1>292 contratações</h1>
                </section>
                <img className="empresas-barra1" src={vector} alt=""/>
                <section className="section-empresas-right">
                    <img id="img-c6" src={c6} alt=""/>
                    <h1>392 contratações</h1>
                    <img id="img-accenture" src={accenture} alt=""/>
                    <h1>292 contratações</h1>
                </section>
                </div>
            </div>



        </>
    )
}

export default Empresas;